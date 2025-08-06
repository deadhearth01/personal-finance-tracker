import { format, parseISO, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';
import type { Transaction, FinancialSummary, MonthlyData } from '../types';

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'JPY' ? 0 : 2,
  }).format(amount);
};

export const formatDate = (date: string | Date, formatStr: string = 'MMM dd, yyyy'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const calculateFinancialSummary = (
  transactions: Transaction[]
): FinancialSummary => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    const existing = acc.find(item => item.category === transaction.category);
    
    if (existing) {
      existing.amount += transaction.amount;
    } else {
      acc.push({
        category: transaction.category,
        amount: transaction.amount,
        percentage: 0,
        type: transaction.type,
      });
    }
    
    return acc;
  }, [] as FinancialSummary['categoryBreakdown']);

  // Calculate percentages
  const totalAmount = totalIncome + totalExpense;
  categoryBreakdown.forEach(item => {
    item.percentage = totalAmount > 0 ? (item.amount / totalAmount) * 100 : 0;
  });

  return {
    totalIncome,
    totalExpense,
    netAmount: totalIncome - totalExpense,
    transactionCount: transactions.length,
    categoryBreakdown: categoryBreakdown.sort((a, b) => b.amount - a.amount),
  };
};

export const getMonthlyData = (
  transactions: Transaction[],
  month: number,
  year: number
): MonthlyData => {
  const startDate = startOfMonth(new Date(year, month, 1));
  const endDate = endOfMonth(new Date(year, month, 1));

  const monthlyTransactions = transactions.filter(transaction => {
    const transactionDate = parseISO(transaction.date);
    return isWithinInterval(transactionDate, { start: startDate, end: endDate });
  });

  const summary = calculateFinancialSummary(monthlyTransactions);

  return {
    month: format(startDate, 'MMMM'),
    year,
    totalIncome: summary.totalIncome,
    totalExpense: summary.totalExpense,
    netAmount: summary.netAmount,
    transactions: monthlyTransactions,
  };
};

export const getMonthlyComparison = (transactions: Transaction[], months: number = 6) => {
  const now = new Date();
  const comparison = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthData = getMonthlyData(transactions, date.getMonth(), date.getFullYear());
    comparison.push({
      ...monthData,
      monthYear: format(date, 'MMM yyyy'),
    });
  }

  return comparison;
};
