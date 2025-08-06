import { useState, useEffect, useCallback } from 'react';
import type { Transaction } from '../types';
import { generateSampleData } from '../data/sampleData';
import { loadTransactions, saveTransactions } from '../utils/storage';

const SAMPLE_DATA_KEY = 'finance-tracker-sample-mode';

export const useSampleData = () => {
  const [hasSampleData, setHasSampleData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAMPLE_DATA_KEY);
      setHasSampleData(stored === 'true');
    } catch (error) {
      console.error('Error loading sample data preference:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleSampleData = useCallback(() => {
    const newState = !hasSampleData;
    
    try {
      localStorage.setItem(SAMPLE_DATA_KEY, newState.toString());
      setHasSampleData(newState);
      
      if (newState) {
        // Generate and save sample data
        const sampleTransactions = generateSampleData();
        saveTransactions(sampleTransactions);
      } else {
        // Clear all transactions when disabling sample data
        saveTransactions([]);
      }
      
      // Trigger a page reload to update the transaction list
      window.location.reload();
    } catch (error) {
      console.error('Error toggling sample data:', error);
    }
  }, [hasSampleData]);

  const loadTransactionsWithSample = useCallback((): Transaction[] => {
    if (hasSampleData) {
      const existing = loadTransactions();
      if (existing.length === 0) {
        // Generate sample data if none exists
        const sampleTransactions = generateSampleData();
        saveTransactions(sampleTransactions);
        return sampleTransactions;
      }
      return existing;
    }
    return loadTransactions();
  }, [hasSampleData]);

  return {
    hasSampleData,
    isLoading,
    toggleSampleData,
    loadTransactionsWithSample,
  };
};
