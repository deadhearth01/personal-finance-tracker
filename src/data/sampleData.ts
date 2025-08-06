import type { Transaction } from '../types';
import { generateId } from '../utils/calculations';
import { DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from './categories';

// Sample transaction descriptions for different categories
const SAMPLE_DESCRIPTIONS = {
  'Food & Dining': [
    'Lunch at McDonald\'s', 'Groceries from BigBasket', 'Coffee at Starbucks', 'Dinner at local restaurant',
    'Pizza delivery', 'Breakfast at café', 'Vegetables from market', 'Online food order'
  ],
  'Transportation': [
    'Uber ride to office', 'Metro card recharge', 'Petrol for bike', 'Auto rickshaw fare',
    'Bus ticket', 'Ola cab booking', 'Parking fees', 'Vehicle maintenance'
  ],
  'Shopping': [
    'Clothes from Myntra', 'Books from Amazon', 'Electronics purchase', 'Shoes shopping',
    'Home essentials', 'Gift for friend', 'Online shopping', 'Pharmacy items'
  ],
  'Entertainment': [
    'Movie tickets', 'Netflix subscription', 'Gaming purchase', 'Concert tickets',
    'Spotify premium', 'YouTube premium', 'Sports event', 'Weekend outing'
  ],
  'Bills & Utilities': [
    'Electricity bill', 'Internet bill', 'Mobile recharge', 'Gas cylinder',
    'Water bill', 'DTH recharge', 'Maintenance charges', 'Insurance premium'
  ],
  'Healthcare': [
    'Doctor consultation', 'Medicine purchase', 'Health checkup', 'Dental treatment',
    'Gym membership', 'Vitamin supplements', 'Lab tests', 'Physiotherapy'
  ],
  'Education': [
    'Course enrollment', 'Books purchase', 'Online certification', 'Tuition fees',
    'Workshop registration', 'Educational software', 'Training materials', 'Language classes'
  ],
  'Travel': [
    'Flight booking', 'Hotel stay', 'Travel insurance', 'Vacation expenses',
    'Train tickets', 'Travel gear', 'Foreign exchange', 'Tour package'
  ],
  'Home & Garden': [
    'Furniture purchase', 'Home decoration', 'Garden plants', 'Cleaning supplies',
    'Kitchen utensils', 'Repair work', 'Interior design', 'Home security'
  ],
  'Other': [
    'Miscellaneous expense', 'Cash withdrawal', 'Bank charges', 'Donation',
    'Emergency expense', 'Unexpected cost', 'Service charges', 'Other payments'
  ],
  'Salary': [
    'Monthly salary credit', 'Bonus payment', 'Overtime payment', 'Performance bonus',
    'Salary advance', 'Variable pay', 'Annual increment', 'Festival bonus'
  ],
  'Freelance': [
    'Web design project', 'Content writing', 'Consulting work', 'Graphic design',
    'Photography gig', 'Online tutoring', 'App development', 'Digital marketing'
  ],
  'Investment': [
    'Dividend received', 'Mutual fund returns', 'Stock profit', 'Fixed deposit maturity',
    'Gold investment return', 'Rental income', 'Interest earned', 'Capital gains'
  ],
  'Business': [
    'Product sales', 'Service revenue', 'Client payment', 'Business profit',
    'Commission earned', 'Partnership income', 'Royalty payment', 'License fees'
  ],
  'Gift': [
    'Birthday gift money', 'Wedding gift', 'Festival money', 'Achievement reward',
    'Cash gift from family', 'Surprise money', 'Celebration bonus', 'Gift voucher'
  ]
};

const getRandomAmount = (category: string, type: 'income' | 'expense'): number => {
  if (type === 'income') {
    if (category === 'Salary') return Math.floor(Math.random() * 50000) + 30000; // 30k-80k
    if (category === 'Business') return Math.floor(Math.random() * 25000) + 15000; // 15k-40k
    if (category === 'Investment') return Math.floor(Math.random() * 15000) + 5000; // 5k-20k
    if (category === 'Freelance') return Math.floor(Math.random() * 20000) + 8000; // 8k-28k
    return Math.floor(Math.random() * 10000) + 2000; // 2k-12k
  } else {
    // Expenses
    if (category === 'Food & Dining') return Math.floor(Math.random() * 2000) + 200; // 200-2200
    if (category === 'Transportation') return Math.floor(Math.random() * 3000) + 500; // 500-3500
    if (category === 'Shopping') return Math.floor(Math.random() * 5000) + 1000; // 1k-6k
    if (category === 'Bills & Utilities') return Math.floor(Math.random() * 4000) + 1500; // 1.5k-5.5k
    if (category === 'Entertainment') return Math.floor(Math.random() * 2500) + 300; // 300-2800
    if (category === 'Healthcare') return Math.floor(Math.random() * 3000) + 800; // 800-3800
    if (category === 'Education') return Math.floor(Math.random() * 8000) + 2000; // 2k-10k
    if (category === 'Travel') return Math.floor(Math.random() * 15000) + 5000; // 5k-20k
    if (category === 'Home & Garden') return Math.floor(Math.random() * 6000) + 1000; // 1k-7k
    return Math.floor(Math.random() * 2000) + 500; // 500-2500
  }
};

const getRandomDescription = (category: string): string => {
  const descriptions = SAMPLE_DESCRIPTIONS[category as keyof typeof SAMPLE_DESCRIPTIONS] || ['Sample transaction'];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const getRandomDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
};

export const generateSampleData = (): Transaction[] => {
  const transactions: Transaction[] = [];

  // Generate income transactions (fewer but higher amounts)
  DEFAULT_INCOME_CATEGORIES.forEach((category) => {
    const transactionCount = category.name === 'Salary' ? 3 : Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < transactionCount; i++) {
      transactions.push({
        id: generateId(),
        type: 'income',
        amount: getRandomAmount(category.name, 'income'),
        category: category.name,
        description: getRandomDescription(category.name),
        date: getRandomDate(90), // Within last 3 months
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  // Generate expense transactions (more frequent, varied amounts)
  DEFAULT_EXPENSE_CATEGORIES.forEach((category) => {
    const transactionCount = Math.floor(Math.random() * 8) + 3; // 3-10 transactions per category
    
    for (let i = 0; i < transactionCount; i++) {
      transactions.push({
        id: generateId(),
        type: 'expense',
        amount: getRandomAmount(category.name, 'expense'),
        category: category.name,
        description: getRandomDescription(category.name),
        date: getRandomDate(60), // Within last 2 months
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  });

  // Sort by date (newest first)
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getSampleStats = () => {
  const sampleData = generateSampleData();
  const totalIncome = sampleData
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = sampleData
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  return {
    transactions: sampleData.length,
    totalIncome: Math.floor(totalIncome),
    totalExpenses: Math.floor(totalExpenses),
    netAmount: Math.floor(totalIncome - totalExpenses),
  };
};
