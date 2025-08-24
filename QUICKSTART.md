# Quick Start Guide

Get File Storage App running on your local machine in under 5 minutes!

## ⚡ Quick Setup

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/file-storage-app.git
cd file-storage-app
npm install
```

### 2. Environment Setup

Create `.env.local` with your keys:

```bash
# Clerk (get from https://dashboard.clerk.com/)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Convex (run 'convex dev --init' first)
NEXT_PUBLIC_CONVEX_URL=https://...
```

### 3. Start Development

```bash
# Terminal 1: Start Convex backend
npx convex dev

# Terminal 2: Start Next.js frontend
npm run dev
```

### 4. Open Browser

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

## 🔑 Getting Your API Keys

### Clerk Authentication

1. Visit [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create new application
3. Copy keys from API Keys section
4. Set up webhook endpoint: `https://your-domain.com/api/webhooks/clerk`

### Convex Backend

1. Install CLI: `npm install -g convex`
2. Login: `convex login`
3. Initialize: `convex dev --init`
4. Copy deployment URL from output

## 🚨 Common Issues

**"Convex URL not found"**

- Run `convex dev --init` first
- Check `.env.local` has correct URL

**"Clerk keys invalid"**

- Verify keys from Clerk dashboard
- Check environment variable names

**"Build errors"**

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 📱 Test the App

1. Sign up with Clerk
2. Upload a test file
3. Check file appears in dashboard
4. Try favorites and trash features

## 🆘 Need Help?

- Check [README.md](README.md) for detailed setup
- Review [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines
- Open an issue for bugs
- Join discussions for questions

Happy coding! 🚀
