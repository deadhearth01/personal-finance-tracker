import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types';
import { loadTransactions, saveTransactions } from '../utils/storage';
import { generateId } from '../utils/calculations';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedTransactions = loadTransactions();
    setTransactions(loadedTransactions);
    setIsLoading(false);
  }, []);

  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTransactions(prev => {
      const updated = [...prev, newTransaction];
      saveTransactions(updated);
      return updated;
    });

    return newTransaction;
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => {
      const updated = prev.map(transaction => 
        transaction.id === id 
          ? { ...transaction, ...updates, updatedAt: new Date().toISOString() }
          : transaction
      );
      saveTransactions(updated);
      return updated;
    });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => {
      const updated = prev.filter(transaction => transaction.id !== id);
      saveTransactions(updated);
      return updated;
    });
  }, []);

  const getTransactionsByType = useCallback((type: 'income' | 'expense') => {
    return transactions.filter(transaction => transaction.type === type);
  }, [transactions]);

  const getTransactionsByCategory = useCallback((category: string) => {
    return transactions.filter(transaction => transaction.category === category);
  }, [transactions]);

  return {
    transactions,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransactionsByType,
    getTransactionsByCategory,
  };
};
