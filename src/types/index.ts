export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  icon: string;
}

export interface MonthlyData {
  month: string;
  year: number;
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  transactions: Transaction[];
}

export interface UserSettings {
  welcomeMessage: string;
  currency: string;
  dateFormat: string;
  theme: 'light' | 'dark';
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
  transactionCount: number;
  categoryBreakdown: {
    category: string;
    amount: number;
    percentage: number;
    type: 'income' | 'expense';
  }[];
}
