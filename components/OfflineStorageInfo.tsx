"use client";

import { useState, useEffect } from "react";
import { useOnlineStatus } from "./ServiceWorker";
import { offlineStorage } from "@/lib/offline-storage";

export function OfflineStorageInfo() {
  // Disable offline storage info in development environment
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    updateStats();

    // Listen for storage updates
    const handleUpdate = () => updateStats();
    window.addEventListener("bannerpeek:storage-update", handleUpdate);
    window.addEventListener("bannerpeek:storage-clear", handleUpdate);
    window.addEventListener("bannerpeek:storage-import", handleUpdate);

    return () => {
      window.removeEventListener("bannerpeek:storage-update", handleUpdate);
      window.removeEventListener("bannerpeek:storage-clear", handleUpdate);
      window.removeEventListener("bannerpeek:storage-import", handleUpdate);
    };
  }, []);

  const updateStats = () => {
    const storageStats = offlineStorage.getStorageStats();
    setStats(storageStats);
  };

  const handleExport = () => {
    const data = offlineStorage.exportData();
    if (data) {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `bannerpeek-backup-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (offlineStorage.importData(data)) {
            alert("Data imported successfully!");
          } else {
            alert("Failed to import data. Please check the file format.");
          }
        } catch (error) {
          alert("Invalid file format. Please select a valid backup file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleClearData = () => {
    if (
      confirm(
        "Are you sure you want to clear all stored data? This action cannot be undone."
      )
    ) {
      offlineStorage.clearAll();
      alert("All data cleared successfully!");
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (!stats) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title={`${isOnline ? "Online" : "Offline"} - ${
          stats.totalItems
        } items stored`}
      >
        <div className="relative">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 0h14v10H3V5z"
              clipRule="evenodd"
            />
          </svg>
          <div
            className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
              isOnline ? "bg-green-400" : "bg-orange-400"
            }`}
          >
            <div
              className={`w-full h-full rounded-full ${
                isOnline ? "animate-pulse bg-green-500" : "bg-orange-500"
              }`}
            ></div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-lg shadow-xl p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">Storage Info</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-orange-500"
                }`}
              ></div>
              <span className="text-sm text-gray-600">
                {isOnline ? "Online" : "Offline"}
              </span>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Items:</span>
                  <div className="font-medium">{stats.totalItems}</div>
                </div>
                <div>
                  <span className="text-gray-500">Size:</span>
                  <div className="font-medium">
                    {formatBytes(stats.totalSize)}
                  </div>
                </div>
              </div>
              {stats.lastModified && (
                <div className="mt-2 text-xs text-gray-500">
                  Last updated: {new Date(stats.lastModified).toLocaleString()}
                </div>
              )}
            </div>

            <div className="pt-2 border-t border-gray-200 space-y-2">
              <button
                onClick={handleExport}
                className="w-full bg-blue-50 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-100 transition-colors"
              >
                Export Data
              </button>

              <label className="block">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <div className="w-full bg-green-50 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-100 transition-colors cursor-pointer text-center">
                  Import Data
                </div>
              </label>

              <button
                onClick={handleClearData}
                className="w-full bg-red-50 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-100 transition-colors"
              >
                Clear All Data
              </button>
            </div>

            <div className="pt-2 border-t border-gray-200 text-xs text-gray-500">
              💾 Your images and settings are stored locally and work offline!
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
