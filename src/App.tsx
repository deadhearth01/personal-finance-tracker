import { useState } from 'react';
import { Plus, PieChart, BarChart3 } from 'lucide-react';
import { useTransactions } from './hooks/useTransactions';
import { useSettings } from './hooks/useSettings';
import { useUser } from './hooks/useUser';
import { useSampleData } from './hooks/useSampleData';
import { calculateFinancialSummary } from './utils/calculations';

// Components
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { DashboardSummary } from './components/DashboardSummary';
import { Charts } from './components/Charts';
import { SettingsModal } from './components/SettingsModal';
import { LoadingSpinner } from './components/LoadingSpinner';

import type { Transaction } from './types';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const { 
    user, 
    isLoading: userLoading, 
    saveUser, 
    isNewUser 
  } = useUser();
  
  const { 
    hasSampleData, 
    isLoading: sampleDataLoading, 
    toggleSampleData 
  } = useSampleData();
  
  const { 
    transactions, 
    isLoading: transactionsLoading,
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();
  
  const { 
    settings, 
    isLoading: settingsLoading,
    updateSettings, 
    resetSettings 
  } = useSettings();

  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeView, setActiveView] = useState<'dashboard' | 'charts'>('dashboard');

  const isLoading = userLoading || sampleDataLoading || transactionsLoading || settingsLoading;

  // Calculate financial summary
  const summary = calculateFinancialSummary(transactions);

  // Handle user onboarding completion
  const handleOnboardingComplete = (userName: string) => {
    saveUser({ name: userName });
    updateSettings({ 
      welcomeMessage: `Welcome back, ${userName}! Let's manage your finances together.` 
    });
  };

  const handleTransactionSubmit = (transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, transactionData);
      setEditingTransaction(null);
    } else {
      addTransaction(transactionData);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsTransactionFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseTransactionForm = () => {
    setIsTransactionFormOpen(false);
    setEditingTransaction(null);
  };

  // Show welcome screen for new users
  if (isNewUser && !userLoading) {
    return <WelcomeScreen onComplete={handleOnboardingComplete} />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading your finance tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <Header
        userName={user?.name || 'User'}
        welcomeMessage={settings.welcomeMessage}
        hasSampleData={hasSampleData}
        onToggleSampleData={toggleSampleData}
        onSettingsClick={() => setIsSettingsModalOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Summary */}
        <DashboardSummary summary={summary} currency={settings.currency} />

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          {/* View Toggle */}
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'dashboard'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <BarChart3 size={16} />
              Dashboard
            </button>
            <button
              onClick={() => setActiveView('charts')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeView === 'charts'
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <PieChart size={16} />
              Analytics
            </button>
          </div>

          {/* Add Transaction Button */}
          <button
            onClick={() => setIsTransactionFormOpen(true)}
            className="btn-primary flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Transaction</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {/* Content based on active view */}
        {activeView === 'dashboard' ? (
          <div className="space-y-6">
            <TransactionList
              transactions={transactions}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
              currency={settings.currency}
            />
          </div>
        ) : (
          <Charts
            summary={summary}
            transactions={transactions}
            currency={settings.currency}
          />
        )}

        {/* Sample Data Info Banner */}
        {hasSampleData && (
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-900">
                  📊 Sample Data Mode Active
                </h3>
                <p className="text-xs text-blue-700 mt-1">
                  You're viewing sample data to explore features. Toggle off to start with your own data.
                </p>
              </div>
              <button
                onClick={toggleSampleData}
                className="text-xs font-medium text-blue-600 hover:text-blue-800 underline"
              >
                Switch to Real Data
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isTransactionFormOpen}
        onClose={handleCloseTransactionForm}
        onSubmit={handleTransactionSubmit}
        editTransaction={editingTransaction}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        settings={settings}
        onUpdateSettings={updateSettings}
        onResetSettings={resetSettings}
      />
      
      {/* Vercel Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
