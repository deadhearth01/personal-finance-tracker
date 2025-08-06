import type { Category } from '../types';

export const DEFAULT_EXPENSE_CATEGORIES: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense', color: '#ef4444', icon: 'UtensilsCrossed' },
  { id: '2', name: 'Transportation', type: 'expense', color: '#f97316', icon: 'Car' },
  { id: '3', name: 'Shopping', type: 'expense', color: '#f59e0b', icon: 'ShoppingBag' },
  { id: '4', name: 'Entertainment', type: 'expense', color: '#eab308', icon: 'Gamepad2' },
  { id: '5', name: 'Bills & Utilities', type: 'expense', color: '#84cc16', icon: 'Receipt' },
  { id: '6', name: 'Healthcare', type: 'expense', color: '#22c55e', icon: 'Heart' },
  { id: '7', name: 'Education', type: 'expense', color: '#06b6d4', icon: 'GraduationCap' },
  { id: '8', name: 'Travel', type: 'expense', color: '#3b82f6', icon: 'Plane' },
  { id: '9', name: 'Home & Garden', type: 'expense', color: '#6366f1', icon: 'Home' },
  { id: '10', name: 'Other', type: 'expense', color: '#8b5cf6', icon: 'MoreHorizontal' },
];

export const DEFAULT_INCOME_CATEGORIES: Category[] = [
  { id: '11', name: 'Salary', type: 'income', color: '#10b981', icon: 'Briefcase' },
  { id: '12', name: 'Freelance', type: 'income', color: '#059669', icon: 'Laptop' },
  { id: '13', name: 'Investment', type: 'income', color: '#047857', icon: 'TrendingUp' },
  { id: '14', name: 'Business', type: 'income', color: '#065f46', icon: 'Building' },
  { id: '15', name: 'Gift', type: 'income', color: '#064e3b', icon: 'Gift' },
  { id: '16', name: 'Other', type: 'income', color: '#14b8a6', icon: 'Plus' },
];

export const ALL_CATEGORIES = [...DEFAULT_EXPENSE_CATEGORIES, ...DEFAULT_INCOME_CATEGORIES];
