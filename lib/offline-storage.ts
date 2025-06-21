"use client";

// Type definitions for offline storage
interface StorageItem {
  value: any;
  timestamp: number;
  id: string;
}

interface StorageData {
  version: string;
  data: Record<string, StorageItem>;
  lastModified: number;
  syncStatus: string;
}

// Enhanced localStorage utility for offline functionality
export class OfflineStorage {
  private static instance: OfflineStorage;
  private storageKey = "bannerpeek-data";
  private version = "1.0";

  constructor() {
    if (typeof window !== "undefined") {
      this.migrateOldData();
    }
  }

  static getInstance(): OfflineStorage {
    if (!OfflineStorage.instance) {
      OfflineStorage.instance = new OfflineStorage();
    }
    return OfflineStorage.instance;
  }

  // Get all stored data with metadata
  getAllData(): StorageData | null {
    if (typeof window === "undefined") return null;

    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return null;

      const parsed = JSON.parse(data) as StorageData;

      // Validate data structure
      if (!parsed.version || !parsed.data) {
        return null;
      }

      return parsed;
    } catch (error) {
      console.error("[Storage] Error reading data:", error);
      return null;
    }
  }
  // Save data with metadata
  saveData(key: string, value: any): boolean {
    if (typeof window === "undefined") return false;

    try {
      const existingData = this.getAllData() || {
        version: this.version,
        data: {} as Record<string, StorageItem>,
        lastModified: Date.now(),
        syncStatus: "local",
      };

      existingData.data[key] = {
        value,
        timestamp: Date.now(),
        id: this.generateId(),
      };
      existingData.lastModified = Date.now();

      localStorage.setItem(this.storageKey, JSON.stringify(existingData));

      // Dispatch custom event for other components to listen
      window.dispatchEvent(
        new CustomEvent("bannerpeek:storage-update", {
          detail: { key, value },
        })
      );

      return true;
    } catch (error) {
      console.error("[Storage] Error saving data:", error);
      return false;
    }
  }

  // Get specific data
  getData(key: string) {
    const allData = this.getAllData();
    return allData?.data[key]?.value || null;
  }

  // Remove specific data
  removeData(key: string) {
    if (typeof window === "undefined") return false;

    try {
      const allData = this.getAllData();
      if (!allData || !allData.data[key]) return false;

      delete allData.data[key];
      allData.lastModified = Date.now();

      localStorage.setItem(this.storageKey, JSON.stringify(allData));

      window.dispatchEvent(
        new CustomEvent("bannerpeek:storage-update", {
          detail: { key, value: null },
        })
      );

      return true;
    } catch (error) {
      console.error("[Storage] Error removing data:", error);
      return false;
    }
  }

  // Clear all data
  clearAll() {
    if (typeof window === "undefined") return false;

    try {
      localStorage.removeItem(this.storageKey);
      window.dispatchEvent(new CustomEvent("bannerpeek:storage-clear"));
      return true;
    } catch (error) {
      console.error("[Storage] Error clearing data:", error);
      return false;
    }
  }

  // Get storage usage stats
  getStorageStats() {
    if (typeof window === "undefined") return null;

    try {
      const allData = this.getAllData();
      if (!allData) return { totalItems: 0, totalSize: 0, lastModified: null };

      const dataString = JSON.stringify(allData);
      const totalSize = new Blob([dataString]).size;

      return {
        totalItems: Object.keys(allData.data).length,
        totalSize,
        lastModified: allData.lastModified,
        version: allData.version,
      };
    } catch (error) {
      console.error("[Storage] Error getting stats:", error);
      return null;
    }
  }

  // Check if storage is available
  isStorageAvailable(): boolean {
    if (typeof window === "undefined") return false;

    try {
      const test = "__bannerpeek_test__";
      localStorage.setItem(test, "test");
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Export data for backup
  exportData() {
    const allData = this.getAllData();
    if (!allData) return null;

    return {
      ...allData,
      exportedAt: Date.now(),
      appVersion: this.version,
    };
  }
  // Import data from backup
  importData(data: any): boolean {
    if (typeof window === "undefined") return false;

    try {
      // Validate imported data structure
      if (!data.version || !data.data) {
        throw new Error("Invalid data format");
      }

      // Merge with existing data
      const existingData = this.getAllData();
      const mergedData: StorageData = {
        version: this.version,
        data: {
          ...(existingData?.data || {}),
          ...data.data,
        } as Record<string, StorageItem>,
        lastModified: Date.now(),
        syncStatus: "imported",
      };

      localStorage.setItem(this.storageKey, JSON.stringify(mergedData));

      window.dispatchEvent(
        new CustomEvent("bannerpeek:storage-import", {
          detail: { importedItems: Object.keys(data.data).length },
        })
      );

      return true;
    } catch (error) {
      console.error("[Storage] Error importing data:", error);
      return false;
    }
  }
  // Migrate old localStorage format if needed
  private migrateOldData(): void {
    try {
      const oldKeys = ["bannerImage", "profileImage", "userSettings"];
      let hasMigration = false;

      const newData: StorageData = {
        version: this.version,
        data: {} as Record<string, StorageItem>,
        lastModified: Date.now(),
        syncStatus: "migrated",
      };

      oldKeys.forEach((key) => {
        const oldValue = localStorage.getItem(key);
        if (oldValue) {
          try {
            newData.data[key] = {
              value: JSON.parse(oldValue),
              timestamp: Date.now(),
              id: this.generateId(),
            };
            localStorage.removeItem(key); // Remove old format
            hasMigration = true;
          } catch {
            // If JSON parse fails, store as string
            newData.data[key] = {
              value: oldValue,
              timestamp: Date.now(),
              id: this.generateId(),
            };
            localStorage.removeItem(key);
            hasMigration = true;
          }
        }
      });

      if (hasMigration) {
        localStorage.setItem(this.storageKey, JSON.stringify(newData));
        console.log("[Storage] Migrated old data to new format");
      }
    } catch (error) {
      console.error("[Storage] Error during migration:", error);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}

// Export singleton instance
export const offlineStorage = OfflineStorage.getInstance();

// React hook for using offline storage
import { useEffect, useState } from "react";

export function useOfflineStorage<T>(key: string, defaultValue: T = null as T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const storedValue = offlineStorage.getData(key);
    setValue(storedValue !== null ? storedValue : defaultValue);
    setIsLoading(false);

    // Listen for storage updates
    const handleStorageUpdate = (event: CustomEvent) => {
      if (event.detail.key === key) {
        setValue(
          event.detail.value !== null ? event.detail.value : defaultValue
        );
      }
    };

    const handleStorageClear = () => {
      setValue(defaultValue);
    };

    window.addEventListener(
      "bannerpeek:storage-update",
      handleStorageUpdate as EventListener
    );
    window.addEventListener("bannerpeek:storage-clear", handleStorageClear);

    return () => {
      window.removeEventListener(
        "bannerpeek:storage-update",
        handleStorageUpdate as EventListener
      );
      window.removeEventListener(
        "bannerpeek:storage-clear",
        handleStorageClear
      );
    };
  }, [key, defaultValue]);

  const updateValue = (newValue: T) => {
    offlineStorage.saveData(key, newValue);
  };

  const removeValue = () => {
    offlineStorage.removeData(key);
  };

  return {
    value,
    updateValue,
    removeValue,
    isLoading,
  };
}
