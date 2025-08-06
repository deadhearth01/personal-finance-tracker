import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw } from 'lucide-react';
import type { UserSettings } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: UserSettings;
  onUpdateSettings: (settings: Partial<UserSettings>) => void;
  onResetSettings: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
}) => {
  const [formData, setFormData] = useState<UserSettings>(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(formData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      onResetSettings();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Welcome Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Welcome Message
            </label>
            <textarea
              value={formData.welcomeMessage}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, welcomeMessage: e.target.value }))
              }
              className="input-field resize-none"
              rows={3}
              placeholder="Enter your custom welcome message..."
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, currency: e.target.value }))
              }
              className="select-field"
            >
              <option value="INR">INR - Indian Rupee (₹)</option>
              <option value="USD">USD - US Dollar ($)</option>
              <option value="EUR">EUR - Euro (€)</option>
              <option value="GBP">GBP - British Pound (£)</option>
              <option value="CAD">CAD - Canadian Dollar (C$)</option>
              <option value="AUD">AUD - Australian Dollar (A$)</option>
              <option value="JPY">JPY - Japanese Yen (¥)</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date Format
            </label>
            <select
              value={formData.dateFormat}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, dateFormat: e.target.value }))
              }
              className="select-field"
            >
              <option value="dd MMM yyyy">15 Jan 2024</option>
              <option value="dd/MM/yyyy">15/01/2024</option>
              <option value="MMM dd, yyyy">Jan 15, 2024</option>
              <option value="MM/dd/yyyy">01/15/2024</option>
              <option value="yyyy-MM-dd">2024-01-15</option>
            </select>
          </div>

          {/* Theme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Theme
            </label>
            <select
              value={formData.theme}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, theme: e.target.value as 'light' | 'dark' }))
              }
              className="select-field"
            >
              <option value="light">Light</option>
              <option value="dark">Dark (Coming Soon)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <div className="flex-1" />
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
