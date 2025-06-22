"use client";

import Link from "next/link";
import { Button } from "./ui/button";

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
        <h2 className="text-md md:text-xl font-semibold mb-2">
          💝 Love BannerPeek? Support the creator! 🌟
        </h2>
        <p className="mb-4 opacity-90 text-sm md:text-base">
          Share your experience and Share with your network to help others
          discover this tool!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={`https://x.com/intent/tweet?text=${tweetText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" data-umami-event="share-on-x">
              🐦 Share on X
            </Button>
          </Link>
          <Link
            href={`https://x.com/intent/tweet?text=${feedbackText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="bg-transparent"
              data-umami-event="send-feedback"
            >
              💬 Send Feedback
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
