
# 🗂️ File Store App (Next.js + Convex + Clerk)

A real-time, multi-tenant file storage platform built with **Next.js**, **Convex**, and **Clerk**. Authenticated users can securely upload, access, organize, and share files within their organization with support for RBAC, favorites, search, trash recovery, and more.

> ✅ Supports real-time syncing
> ✅ Role-based access via Clerk
> ✅ Secure file uploads via Convex Blob Storage
> ✅ Scheduled deletion via Convex Cron Jobs

---

## 🖥️ Tech Stack

- ⚡ **Next.js** (App Router)
- 🧠 **Convex** (Serverless backend + DB + Realtime sync)
- 🔐 **Clerk** (Authentication and organization management)
- 🗄️ **Convex Blob Storage** (File uploads)
- 🛠️ **TypeScript** + Modular Convex Functions (mutations, queries, actions, schema)

---

## 📦 Features

- ✅ Multi-tenant organization support
- 🔐 Auth with Clerk (Sign in, Sign up, Org invite, RBAC)
- 📁 File upload using Convex storage with secure upload URLs
- 🔄 Real-time sync across sessions using Convex subscriptions
- 🌙 Trash + Restore + Auto-delete (via Cron)
- ⭐ Favorite/unfavorite files
- 🔎 Search and filter by file type
- 🧰 Clean modular codebase (Convex: mutations, queries, internalMutations, cron, http)

---

## 🛠️ Local Setup Instructions

> This project requires **Node.js ≥ 18**, and uses **Convex CLI** + **Clerk**.

---

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/file-store-app.git
cd file-store-app
```

### 2️⃣ Install Dependencies
Option A: Using pnpm
```bash
pnpm install
```
Option B: Using npm
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a .env.local file in the root and add the following:

```bash
NEXT_PUBLIC_CONVEX_URL=https://<your-convex-deployment>.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_XXXXXXX
CLERK_SECRET_KEY=sk_test_XXXXXXX
CLERK_WEBHOOK_SECRET=whsec_XXXXXXX
CLERK_HOSTNAME=your-app.clerk.accounts.dev
📝 You can get these keys from your Clerk dashboard and Convex dashboard.
```

### 4️⃣ Link Convex Project
If not linked:
```bash
npx convex init
## Follow the CLI to log in and link to your Convex project.
```

### 5️⃣ Push Convex Schema
This will sync your schema to Convex:
```bash
npx convex push
```

### 6️⃣ Start the Dev Server
For pnpm:
```bash
pnpm dev
```
For npm:
```bash
npm run dev
```

### 🔁 Webhooks Setup (Clerk → Convex)
In your Clerk dashboard, go to Webhooks.

Set the destination URL to:
```bash

https://<your-app-url>/api/clerk
```
Add events:
```bash
user.created
user.updated
organizationMembership.created
organizationMembership.updated
```

📁 Folder Structure
```bash
file-store-app/
│
├── convex/
│   ├── schema.ts              # Convex DB schema
│   ├── files.ts               # File queries and mutations
│   ├── users.ts               # User & org syncing
│   ├── clerk.ts               # Webhook verification
│   ├── cron.ts                # Scheduled deletions
│   ├── http.ts                # HTTP router for Clerk webhooks
│   └── _generated/            # Auto-generated Convex types
│
├── app/ or pages/             # Next.js routes
├── components/                # Reusable UI
├── lib/                       # Clerk/Auth utils
├── .env.local                 # Environment variables
├── README.md
└── package.json
```
=======
# File Storage App

A modern, full-stack file storage application built with Next.js, Convex, and Clerk authentication. Organize, manage, and share your files with a beautiful, responsive interface.

## ✨ Features

- **File Management**: Upload, organize, and manage various file types (PDF, CSV, Images)
- **User Authentication**: Secure authentication powered by Clerk
- **Organization Support**: Multi-tenant architecture with role-based access
- **Favorites System**: Mark and quickly access your favorite files
- **Trash Management**: Safe file deletion with recovery options
- **Responsive Design**: Beautiful UI built with Tailwind CSS and Radix UI
- **Real-time Updates**: Live file synchronization using Convex
- **Search & Filter**: Find files quickly with advanced search capabilities

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Backend**: Convex (Backend-as-a-Service)
- **Authentication**: Clerk
- **Styling**: Tailwind CSS, Radix UI Components
- **Database**: Convex (Built on top of PostgreSQL)
- **File Storage**: Convex File Storage
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🛠️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/file-storage-app.git
cd file-storage-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Convex Configuration
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
```

### 4. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable key and secret key
4. Set up webhooks for user management

### 5. Set Up Convex

1. Install Convex CLI globally:

   ```bash
   npm install -g convex
   ```

2. Login to Convex:

   ```bash
   convex login
   ```

3. Initialize your Convex project:

   ```bash
   convex dev --init
   ```

4. Start the Convex development server:
   ```bash
   convex dev
   ```

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
file-storage-app/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── dashboard/         # Dashboard pages and components
│   │   ├── ConvexClientProvider.tsx
│   │   └── layout.tsx
│   ├── components/            # Reusable UI components
│   │   ├── global/           # Global components
│   │   └── ui/               # UI component library
│   └── lib/                  # Utility functions
├── convex/                   # Convex backend
│   ├── schema.ts            # Database schema
│   ├── files.ts             # File management functions
│   ├── users.ts             # User management functions
│   └── clerk.ts             # Clerk integration
├── public/                   # Static assets
└── package.json
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com/)
3. Set environment variables in Vercel dashboard
4. Deploy!

### Deploy Convex

```bash
convex deploy
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/file-storage-app/issues) page
2. Create a new issue with detailed information
3. Join our [Discussions](https://github.com/yourusername/file-storage-app/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Convex](https://convex.dev/) for the backend infrastructure
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Radix UI](https://www.radix-ui.com/) for accessible components

## 📊 Project Status

- ✅ Core file management functionality
- ✅ User authentication and authorization
- ✅ Organization and role management
- ✅ Favorites and trash system
- 🔄 Search and filtering improvements
- 🔄 File sharing capabilities
- 🔄 Advanced file preview

---

**Made with ❤️ by the File Storage App team**
>>>>>>> 4414b46 (feat: add CONTRIBUTING.md and QUICKSTART.md for improved onboarding and guidelines; update .env.example and LICENSE files)
