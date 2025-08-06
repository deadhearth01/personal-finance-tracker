import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import type { Transaction } from '../types';
import { ALL_CATEGORIES } from '../data/categories';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transaction: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>) => void;
  editTransaction?: Transaction | null;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editTransaction
}) => {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        type: editTransaction.type,
        amount: editTransaction.amount.toString(),
        category: editTransaction.category,
        description: editTransaction.description,
        date: editTransaction.date.split('T')[0],
      });
    } else {
      setFormData({
        type: 'expense',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
    setErrors({});
  }, [editTransaction, isOpen]);

  const availableCategories = ALL_CATEGORIES.filter(cat => cat.type === formData.type);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    onSubmit({
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description.trim(),
      date: new Date(formData.date).toISOString(),
    });

    onClose();
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '', // Reset category when type changes
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white rounded-t-2xl sm:rounded-xl p-6 w-full max-w-md mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {editTransaction ? 'Edit Transaction' : 'Add New Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'expense'
                    ? 'bg-red-500 text-white shadow-lg scale-105'
                    : 'bg-red-50 text-red-600 hover:bg-red-100 border-2 border-red-200'
                }`}
              >
                <span className="text-lg">💸</span>
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
                  formData.type === 'income'
                    ? 'bg-green-500 text-white shadow-lg scale-105'
                    : 'bg-green-50 text-green-600 hover:bg-green-100 border-2 border-green-200'
                }`}
              >
                <span className="text-lg">💰</span>
                Income
              </button>
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className={`input-field ${errors.amount ? 'border-danger-500' : ''}`}
              placeholder="0.00"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-danger-600">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className={`select-field ${errors.category ? 'border-danger-500' : ''}`}
            >
              <option value="">Select a category</option>
              {availableCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-danger-600">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`input-field ${errors.description ? 'border-danger-500' : ''}`}
              placeholder="Enter description..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-danger-600">{errors.description}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="input-field"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              <Save size={16} />
              {editTransaction ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
