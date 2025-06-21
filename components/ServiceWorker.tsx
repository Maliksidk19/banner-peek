"use client";

import { useEffect, useState } from "react";

interface ServiceWorkerState {
  isSupported: boolean;
  isRegistered: boolean;
  isInstalled: boolean;
  updateAvailable: boolean;
}

export function ServiceWorkerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [swState, setSWState] = useState<ServiceWorkerState>({
    isSupported: false,
    isRegistered: false,
    isInstalled: false,
    updateAvailable: false,
  });
  useEffect(() => {
    // Disable service worker in development environment
    if (process.env.NODE_ENV === "development") {
      console.log("[SW] Service worker disabled in development mode");
      return;
    }

    if ("serviceWorker" in navigator) {
      setSWState((prev) => ({ ...prev, isSupported: true }));
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none", // Always check for updates
      });

      console.log("[SW] Service worker registered:", registration);
      setSWState((prev) => ({ ...prev, isRegistered: true }));

      // Check if service worker is already installed
      if (registration.active) {
        setSWState((prev) => ({ ...prev, isInstalled: true }));
      }

      // Listen for service worker updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed") {
              if (navigator.serviceWorker.controller) {
                // New update available
                setSWState((prev) => ({ ...prev, updateAvailable: true }));
                console.log("[SW] New version available");
              } else {
                // First install
                setSWState((prev) => ({ ...prev, isInstalled: true }));
                console.log("[SW] Service worker installed for the first time");
              }
            }
          });
        }
      });

      // Listen for controller changes (when new SW takes control)
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        console.log("[SW] Controller changed - reloading page");
        window.location.reload();
      });
    } catch (error) {
      console.error("[SW] Service worker registration failed:", error);
    }
  };

  const updateServiceWorker = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "SKIP_WAITING" });
    }
  };

  // Provide SW state to children via context if needed
  return (
    <>
      {children}
      {swState.updateAvailable && (
        <UpdateNotification onUpdate={updateServiceWorker} />
      )}
    </>
  );
}

function UpdateNotification({ onUpdate }: { onUpdate: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-96 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium">Update Available</h4>
          <p className="text-sm opacity-90">
            A new version of BannerPeek is ready!
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onUpdate}
            className="bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100"
          >
            Update
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-gray-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

// Hook for checking online/offline status
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    function updateOnlineStatus() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    // Set initial status
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return isOnline;
}

// Offline indicator component
export function OfflineIndicator() {
  // Disable offline indicator in development environment
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-4 py-2 text-center text-sm z-50">
      <span className="inline-flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        You're offline - Your images and data are still available locally
      </span>
    </div>
  );
}
