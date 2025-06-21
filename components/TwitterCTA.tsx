"use client";

import Link from "next/link";

interface TwitterCTAProps {
  className?: string;
}

export function TwitterCTA({ className = "" }: TwitterCTAProps) {
  const tweetText = encodeURIComponent(
    "Just tried @maliksidk19's BannerPeek tool! 🔥 Perfect for previewing LinkedIn/X banners before going live. Free & works offline! #SocialMedia #Design"
  );

  const feedbackText = encodeURIComponent(
    "Hey @maliksidk19! Just used BannerPeek and wanted to share some feedback:"
  );

  return (
    <div className={`w-full ${className}`} data-component="twitter-cta">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border border-blue-300 p-6 my-8 rounded-lg text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-3">
          💝 Love BannerPeek? Support the creator! 🌟
        </h2>
        <p className="text-lg mb-4 opacity-90">
          Share your experience and Share with your network to help others
          discover this tool!
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors text-lg"
            href={`https://x.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            🐦 Share on X
          </Link>
          <Link
            href={`https://x.com/intent/tweet?text=${feedbackText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            💬 Send Feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
