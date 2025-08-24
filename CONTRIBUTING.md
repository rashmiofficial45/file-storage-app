# Contributing to File Storage App

Thank you for your interest in contributing to File Storage App! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Basic knowledge of React, Next.js, and TypeScript

### Development Setup

1. Fork and clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables (see README.md)
4. Start the development server: `npm run dev`

## 📋 Contribution Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code formatting (Prettier is configured)
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Commit Messages

Follow conventional commits format:

```
type(scope): description

feat(auth): add OAuth login support
fix(ui): resolve button alignment issue
docs(readme): update installation steps
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Pull Request Process

1. Create a feature branch from `main`
2. Make your changes
3. Add tests if applicable
4. Update documentation
5. Ensure all tests pass
6. Submit a PR with a clear description

### Testing

- Write tests for new features
- Ensure existing tests pass
- Test on different browsers/devices
- Test edge cases and error scenarios

## 🐛 Bug Reports

When reporting bugs, please include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser/device information
- Screenshots if applicable

## 💡 Feature Requests

For feature requests:

- Describe the feature clearly
- Explain the use case
- Consider implementation complexity
- Check if it aligns with project goals

## 📚 Documentation

Help improve documentation by:

- Fixing typos and grammar
- Adding code examples
- Updating outdated information
- Adding missing sections

## 🏗️ Architecture

### Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `convex/` - Backend functions and schema
- `public/` - Static assets

### Key Technologies

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Convex (BaaS)
- **Auth**: Clerk
- **Styling**: Tailwind CSS, Radix UI

## 🤝 Community

- Be respectful and inclusive
- Help other contributors
- Share knowledge and best practices
- Participate in discussions

## 📝 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🆘 Need Help?

- Check existing issues and discussions
- Ask questions in discussions
- Reach out to maintainers
- Join our community channels

Thank you for contributing! 🎉
