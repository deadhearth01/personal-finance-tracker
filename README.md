# Personal Finance Tracker 🚀

A modern, beautiful React-based web application for tracking personal finances with a focus on Indian users. Built with TypeScript, Vite, and Tailwind CSS, featuring interactive charts, smart categorization, and an intuitive user experience.

![Personal Finance Tracker](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss)

## 🌟 Features

### ✨ Enhanced User Experience
- **🎉 Beautiful Onboarding**: Multi-step welcome screen for new users
- **👤 Personalized Experience**: Custom user names and welcome messages
- **📱 Mobile-First Design**: Fully responsive design optimized for mobile and desktop
- **🎨 Modern UI**: Gradient backgrounds, smooth animations, and beautiful illustrations
- **🔄 Sample Data Toggle**: Switch between sample data and real data with one click
- **💰 Indian Rupee Focus**: Default currency set to INR with proper formatting

### 💼 Core Functionality
- **📝 Smart Transaction Management**: Add, edit, and delete income and expense transactions
- **🏷️ Intelligent Categorization**: Pre-defined categories with custom icons and colors
- **📊 Real-time Calculations**: Automatic calculation of totals, net amount, and financial summaries
- **💾 Local Storage**: Secure data persistence using browser's local storage
- **🔍 Advanced Filtering**: Filter and sort transactions by type, date, or amount

### 📈 Data Visualization & Analytics
- **🥧 Interactive Pie Charts**: Category-wise spending breakdown with percentages
- **📊 Monthly Bar Charts**: Income vs expenses comparison over time
- **📈 Trend Analysis**: Net amount trend visualization with line charts
- **🎯 Financial Dashboard**: Key metrics cards with color-coded indicators
- **📅 Historical Data**: 6-month historical analysis and insights

### 🎨 Design & Accessibility
- **🌈 Beautiful Gradients**: Modern gradient designs throughout the app
- **🎭 Animated Elements**: Smooth transitions and micro-interactions
- **📱 Touch-Friendly**: Optimized for mobile touch interactions
- **🎯 Intuitive Navigation**: Clear visual hierarchy and navigation patterns
- **🔧 Customizable Settings**: Personal preferences for currency, date formats, and themes

## 🏦 Indian Rupee Features
- **₹ Native INR Support**: Properly formatted Indian Rupee display
- **🇮🇳 Indian Date Formats**: DD/MM/YYYY and DD MMM YYYY formats
- **💡 Sample Data in Rupees**: Realistic Indian transaction amounts and scenarios
- **🏪 Local Categories**: Categories relevant to Indian spending patterns

## 📱 Mobile Experience
- **📞 Mobile-First UI**: Designed primarily for mobile users
- **👆 Touch Optimized**: Large buttons and touch-friendly interactions
- **🔄 Swipe Gestures**: Intuitive mobile navigation patterns
- **📱 Progressive Web App**: Install-able on mobile devices
- **⚡ Fast Loading**: Optimized for mobile network conditions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd personal-finance-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5174`

## 🎮 User Journey

### First-Time Users
1. **Welcome Screen**: Beautiful onboarding with feature showcase
2. **Name Collection**: Personalized setup asking for user's name
3. **Sample Data Option**: Choose between sample data or starting fresh
4. **Dashboard Access**: Immediate access to full-featured dashboard

### Sample Data Experience
- **📊 Instant Insights**: Pre-loaded with realistic Indian financial data
- **� Feature Exploration**: Explore all features without manual data entry
- **🔄 Easy Toggle**: Switch between sample and real data anytime
- **💡 Learning Mode**: Perfect for understanding the app's capabilities

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5 for lightning-fast development
- **Styling**: Tailwind CSS 4 with custom utility classes
- **Charts**: Recharts for beautiful, interactive data visualizations
- **Icons**: Lucide React for consistent, beautiful icons
- **Date Handling**: date-fns for robust date manipulation
- **State Management**: Custom React hooks with local storage
- **Mobile Support**: Touch-friendly responsive design

## 📊 Categories

### 💸 Expense Categories (with Indian context)
- **🍽️ Food & Dining**: Restaurants, groceries, food delivery
- **🚗 Transportation**: Uber, metro, petrol, auto-rickshaw
- **🛍️ Shopping**: Clothes, electronics, essentials
- **🎬 Entertainment**: Movies, subscriptions, outings
- **💡 Bills & Utilities**: Electricity, internet, mobile recharge
- **🏥 Healthcare**: Doctor visits, medicines, checkups
- **📚 Education**: Courses, books, certifications
- **✈️ Travel**: Flights, hotels, vacation expenses
- **🏠 Home & Garden**: Furniture, repairs, decoration
- **📦 Other**: Miscellaneous expenses

### 💰 Income Categories
- **💼 Salary**: Monthly salary, bonuses, increments
- **💻 Freelance**: Project work, consulting, gigs
- **📈 Investment**: Dividends, returns, interest
- **🏢 Business**: Sales, revenue, profits
- **🎁 Gift**: Festival money, gifts, rewards
- **➕ Other**: Additional income sources

## 🚀 Deployment

This application is optimized for deployment on Vercel and other static hosting platforms.

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **GitHub Integration**
   - Push to GitHub
   - Connect repository to Vercel
   - Automatic deployments on every push

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder**
   - Drag and drop to Netlify
   - Or use Netlify CLI/GitHub integration

## 🎨 Customization

### Adding New Categories
Edit `src/data/categories.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Category Name',
  type: 'income' | 'expense',
  color: '#hex-color',
  icon: 'LucideIconName'
}
```

### Styling Customization
The app uses Tailwind CSS with custom utility classes in `src/index.css`:

- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.card` - Card containers
- `.input-field` - Form input fields
- `.select-field` - Select dropdown fields

### Sample Data Modification
Edit `src/data/sampleData.ts` to customize sample transactions and amounts.

## 📱 Browser Support
- Chrome 90+ (Recommended)
- Safari 14+
- Firefox 90+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security
- **🔐 Local Storage Only**: All data stays in your browser
- **🚫 No Server Required**: No external data transmission
- **👤 No User Accounts**: No registration or login required
- **🗑️ Data Control**: Complete control over your financial data
- **🔄 Export Ready**: Easy data backup and migration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling Framework
- [Recharts](https://recharts.org/) - Chart Library
- [Lucide](https://lucide.dev/) - Icon Library
- [date-fns](https://date-fns.org/) - Date Utilities

---

Made with ❤️ for better financial management in India 🇮🇳
