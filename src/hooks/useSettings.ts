import { useState, useEffect, useCallback } from 'react';
import type { UserSettings } from '../types';
import { loadSettings, saveSettings, DEFAULT_SETTINGS } from '../utils/storage';

export const useSettings = () => {
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedSettings = loadSettings();
    setSettings(loadedSettings);
    setIsLoading(false);
  }, []);

  const updateSettings = useCallback((newSettings: Partial<UserSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    saveSettings(DEFAULT_SETTINGS);
  }, []);

  return {
    settings,
    isLoading,
    updateSettings,
    resetSettings,
  };
};
