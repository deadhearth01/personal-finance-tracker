import type { Transaction, UserSettings } from '../types';
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from '../data/categories';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-tracker-transactions',
  SETTINGS: 'finance-tracker-settings',
  CATEGORIES: 'finance-tracker-categories',
} as const;

export const DEFAULT_SETTINGS: UserSettings = {
  welcomeMessage: 'Welcome to your Personal Finance Tracker!',
  currency: 'INR',
  dateFormat: 'dd MMM yyyy',
  theme: 'light',
};

export const loadTransactions = (): Transaction[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions: Transaction[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};

export const loadSettings = (): UserSettings => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error loading settings:', error);
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: UserSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
};

export const loadCategories = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored 
      ? JSON.parse(stored) 
      : [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES];
  } catch (error) {
    console.error('Error loading categories:', error);
    return [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES];
  }
};

export const saveCategories = (categories: any[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (error) {
    console.error('Error saving categories:', error);
  }
};

export const clearAllData = (): void => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
