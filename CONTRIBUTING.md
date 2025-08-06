# Contributing to Personal Finance Tracker 🤝

Thank you for your interest in contributing to Personal Finance Tracker! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher (or yarn 1.22.0+)
- Git
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Setting Up Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/personal-finance-tracker.git
   cd personal-finance-tracker
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/personal-finance-tracker.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

## 🛠️ Development Workflow

### Branch Strategy

- **main**: Production-ready code
- **develop**: Integration branch for features
- **feature/**: New features (`feature/add-budget-planning`)
- **fix/**: Bug fixes (`fix/mobile-chart-display`)
- **docs/**: Documentation updates (`docs/api-reference`)

### Making Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards

3. **Test your changes**:
   ```bash
   npm run lint        # Check code style
   npm run type-check  # TypeScript validation
   npm run build      # Ensure build works
   ```

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add your descriptive commit message"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request** on GitHub

### Commit Message Convention

We follow the [Conventional Commits](https://conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding missing tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat: add budget planning functionality
fix: resolve mobile chart rendering issue
docs: update installation instructions
style: improve button hover animations
refactor: simplify transaction calculation logic
```

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type - use specific types
- Use type-only imports when possible:
  ```typescript
  import type { Transaction } from '../types';
  ```

### React Components

- Use functional components with hooks
- Follow the component structure pattern:
  ```typescript
  import type { ComponentProps } from 'react';
  
  interface ExampleComponentProps {
    // Props definition
  }
  
  export function ExampleComponent({ ...props }: ExampleComponentProps) {
    // Hooks
    // Event handlers
    // Render logic
  }
  ```

- Use descriptive component and prop names
- Keep components focused and single-responsibility
- Use custom hooks for complex state logic

### Styling with Tailwind CSS

- Use Tailwind utility classes
- Follow mobile-first responsive design
- Use custom CSS classes for repeated patterns
- Maintain consistent spacing and color schemes
- Test on both desktop and mobile

### File Naming Conventions

- **Components**: PascalCase (`TransactionForm.tsx`)
- **Hooks**: camelCase starting with `use` (`useTransactions.ts`)
- **Utilities**: camelCase (`calculations.ts`)
- **Types**: PascalCase (`index.ts` with PascalCase interfaces)
- **Constants**: UPPER_CASE (`SAMPLE_DATA`)

## 🧪 Testing Guidelines

### Before Submitting

1. **Test Locally**:
   ```bash
   npm run dev      # Development server
   npm run build    # Production build
   npm run preview  # Test production build
   ```

2. **Test Responsive Design**:
   - Desktop (1920x1080, 1366x768)
   - Tablet (768px width)
   - Mobile (375px width, 320px width)

3. **Test Core Functionality**:
   - Adding/editing transactions
   - Category filtering
   - Chart interactions
   - Sample data toggle
   - Local storage persistence

4. **Browser Compatibility**:
   - Chrome (latest)
   - Safari (latest)
   - Firefox (latest)
   - Mobile browsers

### Performance Checklist

- Components should not cause unnecessary re-renders
- Bundle size should remain reasonable
- Loading states should be implemented for async operations
- Images should be optimized

## 🎯 Areas for Contribution

### 🐛 Bug Fixes
- Mobile responsiveness issues
- Chart display problems
- Currency formatting bugs
- Local storage edge cases

### ✨ Feature Enhancements
- New chart types or visualizations
- Additional transaction categories
- Export/import functionality
- Improved mobile UX

### 📚 Documentation
- Code comments and documentation
- API documentation
- User guides and tutorials
- Translation support

### 🎨 UI/UX Improvements
- Design system enhancements
- Animation improvements
- Accessibility features
- Color scheme refinements

### 🔧 Technical Improvements
- Performance optimizations
- Code refactoring
- TypeScript improvements
- Build process enhancements

## 📋 Pull Request Guidelines

### Before Creating a PR

1. Ensure your branch is up to date:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Run all checks:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

3. Test your changes thoroughly

### PR Description Template

```markdown
## 🎯 Purpose
Brief description of what this PR does

## 🔄 Changes Made
- List of specific changes
- New features added
- Bug fixes applied

## 📸 Screenshots
Include screenshots for UI changes

## ✅ Testing
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Tested core functionality
- [ ] No TypeScript errors
- [ ] Build passes successfully

## 📝 Additional Notes
Any additional context or considerations
```

### Review Process

1. **Automated Checks**: Linting, type checking, and build verification
2. **Code Review**: Manual review by maintainers
3. **Testing**: Feature and compatibility testing
4. **Approval**: Final approval and merge

## 🤔 Questions or Issues?

### Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: your-email@example.com for private concerns

### Reporting Bugs

Use the bug report template and include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and device information
- Screenshots or recordings if applicable

### Suggesting Features

Use the feature request template and include:

- Clear description of the feature
- Use case and benefits
- Potential implementation approach
- Any relevant examples or mockups

## 🎉 Recognition

Contributors will be recognized in:

- README.md contributors section
- Release notes for significant contributions
- Special mentions for exceptional contributions

## 📄 Code of Conduct

Please note that this project follows a Code of Conduct. By participating, you agree to abide by its terms:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the issue, not the person
- Help create a positive environment for everyone

Thank you for contributing to Personal Finance Tracker! 🙏
