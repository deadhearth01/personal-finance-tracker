import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/calculations';
import { ALL_CATEGORIES } from '../data/categories';
import { Icon } from './Icon';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  currency?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete,
  currency = 'INR'
}) => {
  const getCategoryIcon = (categoryName: string) => {
    const category = ALL_CATEGORIES.find(cat => cat.name === categoryName);
    return category?.icon || 'MoreHorizontal';
  };

  const getCategoryColor = (categoryName: string) => {
    const category = ALL_CATEGORIES.find(cat => cat.name === categoryName);
    return category?.color || '#6b7280';
  };

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-16">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Icon name="Receipt" size={24} className="text-white" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No transactions yet</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Start your financial journey by adding your first income or expense transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Track income
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              Monitor expenses
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              Analyze trends
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="card">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-3">
        {sortedTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: getCategoryColor(transaction.category) }}
              >
                <Icon name={getCategoryIcon(transaction.category)} size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{transaction.category}</span>
                  <span>•</span>
                  <span>{formatDate(transaction.date)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div
                  className={`font-semibold ${
                    transaction.type === 'income'
                      ? 'text-success-600'
                      : 'text-danger-600'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount, currency)}
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {transaction.type}
                </div>
              </div>
              
              <div className="flex gap-1">
                <button
                  onClick={() => onEdit(transaction)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                  title="Edit transaction"
                >
                  <Edit2 size={16} className="text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-1 hover:bg-danger-100 rounded transition-colors"
                  title="Delete transaction"
                >
                  <Trash2 size={16} className="text-danger-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
