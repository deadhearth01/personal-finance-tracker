import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import type { FinancialSummary } from '../types';
import { formatCurrency, getMonthlyComparison } from '../utils/calculations';
import type { Transaction } from '../types';

interface ChartsProps {
  summary: FinancialSummary;
  transactions: Transaction[];
  currency?: string;
}

export const Charts: React.FC<ChartsProps> = ({
  summary,
  transactions,
  currency = 'INR'
}) => {
  // Prepare data for category breakdown (pie chart)
  const categoryData = summary.categoryBreakdown
    .filter(item => item.amount > 0)
    .slice(0, 8) // Show top 8 categories
    .map((item, index) => ({
      name: item.category,
      value: item.amount,
      percentage: item.percentage,
      fill: `hsl(${(index * 45) % 360}, 70%, 50%)`,
    }));

  // Prepare data for monthly comparison
  const monthlyData = getMonthlyComparison(transactions, 6);

  // Custom tooltip for pie chart
  const renderPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm text-gray-600">
            {formatCurrency(data.value, currency)} ({data.payload.percentage.toFixed(1)}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for bar and line charts
  const renderTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Category Breakdown Pie Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Spending by Category</h3>
        {categoryData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} (${percentage.toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={renderPieTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      {/* Monthly Income vs Expenses */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Income vs Expenses (Last 6 Months)</h3>
        {monthlyData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip content={renderTooltip} />
                <Legend />
                <Bar dataKey="totalIncome" fill="#22c55e" name="Income" />
                <Bar dataKey="totalExpense" fill="#ef4444" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>

      {/* Net Amount Trend */}
      <div className="card lg:col-span-2">
        <h3 className="text-lg font-semibold mb-4">Net Amount Trend</h3>
        {monthlyData.length > 0 ? (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="monthYear" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip content={renderTooltip} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="netAmount"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                  name="Net Amount"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-80 flex items-center justify-center text-gray-500">
            No data available
          </div>
        )}
      </div>
    </div>
  );
};
