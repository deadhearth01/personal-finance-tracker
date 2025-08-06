import React from 'react';
import { ToggleLeft, ToggleRight, User, Sparkles } from 'lucide-react';

interface HeaderProps {
  userName: string;
  welcomeMessage: string;
  hasSampleData: boolean;
  onToggleSampleData: () => void;
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName,
  welcomeMessage,
  hasSampleData,
  onToggleSampleData,
  onSettingsClick
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Title and welcome */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Finance Tracker
              </h1>
              <p className="text-sm text-gray-600">
                Hello, {userName}! {welcomeMessage}
              </p>
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-4">
            {/* Sample Data Toggle */}
            <div className="hidden sm:flex items-center gap-3 px-3 py-2 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-700">
                Sample Data
              </span>
              <button
                onClick={onToggleSampleData}
                className={`flex items-center transition-colors ${
                  hasSampleData 
                    ? 'text-blue-500 hover:text-blue-600' 
                    : 'text-gray-400 hover:text-gray-500'
                }`}
                title={hasSampleData ? 'Disable sample data' : 'Enable sample data'}
              >
                {hasSampleData ? (
                  <ToggleRight size={20} />
                ) : (
                  <ToggleLeft size={20} />
                )}
              </button>
            </div>

            {/* User Profile */}
            <button
              onClick={onSettingsClick}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <span className="hidden sm:inline text-sm font-medium">
                {userName}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Sample Data Toggle */}
        <div className="sm:hidden pb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">
            Sample Data Mode
          </span>
          <button
            onClick={onToggleSampleData}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              hasSampleData 
                ? 'bg-blue-50 text-blue-600' 
                : 'bg-gray-50 text-gray-600'
            }`}
          >
            {hasSampleData ? (
              <>
                <ToggleRight size={16} />
                Enabled
              </>
            ) : (
              <>
                <ToggleLeft size={16} />
                Disabled
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
