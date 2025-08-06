import React, { useState } from 'react';
import { User, Sparkles, BarChart3, PieChart, TrendingUp } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: (userName: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [userName, setUserName] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      onComplete(userName.trim());
    }
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Welcome Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Sparkles size={32} className="text-white" />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-6 -left-4 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {' '}Finance Tracker
            </span>
          </h1>
          <p className="text-gray-600">
            Take control of your finances with beautiful insights and easy tracking
          </p>
        </div>

        {currentStep === 1 && (
          <div className="card text-center">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Let's get started! 🚀</h2>
              <p className="text-gray-600">
                Your personal finance journey begins here. Track expenses, analyze spending, and achieve your financial goals.
              </p>
            </div>

            {/* Features showcase */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-blue-50 rounded-lg">
                <BarChart3 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-blue-900">Smart Analytics</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <PieChart className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-900">Visual Reports</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-900">Trend Analysis</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <User className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-sm font-medium text-orange-900">Personalized</p>
              </div>
            </div>

            <button
              onClick={nextStep}
              className="btn-primary w-full"
            >
              Continue
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="card">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={24} className="text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">What should we call you?</h2>
              <p className="text-gray-600">
                Help us personalize your finance tracking experience
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="input-field text-center"
                  placeholder="Enter your name here..."
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!userName.trim()}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {currentStep === 3 && (
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Welcome, {userName}! 
              </h2>
              <p className="text-gray-600">
                You're all set! Ready to start your financial journey with some sample data, or would you prefer to start fresh?
              </p>
            </div>

            {/* Sample data illustration */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Income: ₹45,000</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Expenses: ₹32,000</span>
                </div>
              </div>
              <div className="text-xs text-gray-500">Sample data helps you explore features instantly!</div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => onComplete(userName)}
                className="btn-primary w-full"
              >
                Start with Sample Data 📊
              </button>
              <button
                onClick={() => onComplete(userName)}
                className="btn-secondary w-full"
              >
                Start Fresh 🌟
              </button>
            </div>

            <button
              onClick={prevStep}
              className="text-sm text-gray-500 hover:text-gray-700 mt-4"
            >
              ← Back to edit name
            </button>
          </div>
        )}

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-2 h-2 rounded-full transition-colors ${
                step <= currentStep ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
