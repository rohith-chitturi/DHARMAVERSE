"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "en" | "hi" | "te";
export type ReadabilityMode = "Simple" | "Detailed" | "Scholar";
export type KnowledgeLevel = "Newcomer" | "Familiar";

interface AccessibilitySettings {
  language: LanguageCode;
  readability: ReadabilityMode;
  knowledgeLevel: KnowledgeLevel;
  simplifiedMode: boolean; // "Explain Like I Am New"
}

interface SettingsContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
  t: (key: string) => string;
}

const defaultSettings: AccessibilitySettings = {
  language: "en",
  readability: "Detailed",
  knowledgeLevel: "Familiar",
  simplifiedMode: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Static Dictionary for Core UI
import { uiDictionary } from "@/data/i18n";

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dharmaverse_settings");
    if (saved) {
      setSettings(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem("dharmaverse_settings", JSON.stringify(updated));
      return updated;
    });
  };

  // Translation hook function
  const t = (key: string): string => {
    const translation = uiDictionary[key];
    if (!translation) return key;
    return translation[settings.language] || translation["en"] || key;
  };

  // Avoid hydration mismatch by waiting for client load
  if (!isLoaded) return null;

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
}
