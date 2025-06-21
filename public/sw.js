// BannerPeek Service Worker - Offline Functionality
// Cache version for managing cache updates
const CACHE_NAME = 'bannerpeek-v1';
const STATIC_CACHE = 'bannerpeek-static-v1';
const DYNAMIC_CACHE = 'bannerpeek-dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/logo.svg',
  '/linkedin.svg',
  '/twitter.svg',
  '/upload.svg',
  '/monitor.svg',
  '/smartphone.svg',
  '/og-image.png'
];

// Install event - Cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting(); // Activate immediately
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches that don't match current version
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim(); // Take control immediately
      })
  );
});

// Fetch event - Handle network requests with caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(url)) {
    // Static assets: Cache First strategy
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(url)) {
    // API requests: Network First strategy (though we don't have external APIs)
    event.respondWith(networkFirst(request));
  } else if (isNavigationRequest(request)) {
    // Navigation requests: Network First with offline fallback
    event.respondWith(handleNavigation(request));
  } else {
    // Other requests: Stale While Revalidate
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Check if request is for static assets
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext)) || 
         STATIC_ASSETS.includes(url.pathname);
}

// Check if request is for API
function isAPIRequest(url) {
  return url.pathname.startsWith('/api/');
}

// Check if request is navigation
function isNavigationRequest(request) {
  return request.mode === 'navigate';
}

// Cache First Strategy - Good for static assets
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Cache first failed:', error);
    return new Response('Offline - Asset not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Network First Strategy - Good for dynamic content
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network first failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Offline - Content not available', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });

  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || await fetchPromise;
}

// Handle Navigation Requests
async function handleNavigation(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
  } catch (error) {
    console.log('[SW] Navigation network failed:', error);
  }

  // Fallback to cached version or offline page
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // Return cached root page as fallback for navigation
  const rootPage = await caches.match('/');
  if (rootPage) {
    return rootPage;
  }

  // Ultimate fallback - create a basic offline page
  return new Response(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BannerPeek - Offline</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 2rem;
          background: #f5f5f5;
        }
        .offline-message {
          max-width: 400px;
          margin: 0 auto;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .logo {
          font-size: 2rem;
          font-weight: bold;
          color: #3b82f6;
          margin-bottom: 1rem;
        }
        button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
      </style>
    </head>
    <body>
      <div class="offline-message">
        <div class="logo">👁️ BannerPeek</div>
        <h2>You're Offline</h2>
        <p>It looks like you're not connected to the internet. BannerPeek works offline with your previously uploaded images and saved data!</p>
        <p>Your images and settings are stored locally and will be available when you reconnect.</p>
        <button onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Background Sync for future enhancements
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered');
    // Could be used for syncing user data when back online
  }
});

// Handle push notifications (for future features)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1',
      },
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification click received.');
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Message handling for communication with the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker script loaded');
