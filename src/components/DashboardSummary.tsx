import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
import type { FinancialSummary } from '../types';
import { formatCurrency } from '../utils/calculations';

interface DashboardSummaryProps {
  summary: FinancialSummary;
  currency?: string;
}

export const DashboardSummary: React.FC<DashboardSummaryProps> = ({
  summary,
  currency = 'INR'
}) => {
  const summaryCards = [
    {
      title: 'Total Income',
      value: summary.totalIncome,
      icon: TrendingUp,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      iconColor: 'text-success-500',
    },
    {
      title: 'Total Expenses',
      value: summary.totalExpense,
      icon: TrendingDown,
      color: 'text-danger-600',
      bgColor: 'bg-danger-50',
      iconColor: 'text-danger-500',
    },
    {
      title: 'Net Amount',
      value: summary.netAmount,
      icon: DollarSign,
      color: summary.netAmount >= 0 ? 'text-success-600' : 'text-danger-600',
      bgColor: summary.netAmount >= 0 ? 'bg-success-50' : 'bg-danger-50',
      iconColor: summary.netAmount >= 0 ? 'text-success-500' : 'text-danger-500',
    },
    {
      title: 'Total Transactions',
      value: summary.transactionCount,
      icon: Activity,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      iconColor: 'text-primary-500',
      isCount: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryCards.map((card) => {
        const IconComponent = card.icon;
        
        return (
          <div key={card.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className={`text-2xl font-bold ${card.color}`}>
                  {card.isCount 
                    ? card.value.toLocaleString()
                    : formatCurrency(Math.abs(card.value), currency)
                  }
                </p>
                {card.title === 'Net Amount' && (
                  <p className="text-xs text-gray-500 mt-1">
                    {summary.netAmount >= 0 ? 'Surplus' : 'Deficit'}
                  </p>
                )}
              </div>
              <div className={`p-3 rounded-full ${card.bgColor}`}>
                <IconComponent size={24} className={card.iconColor} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
