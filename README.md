# 🩸 RoktoNeer - Frontend Client

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue?style=for-the-badge&logo=tailwindcss)
![better-auth](https://img.shields.io/badge/Auth-better--auth-green?style=for-the-badge)

Frontend client for RoktoNeer Blood Donation Platform. Built with Next.js 16, React 19, and modern web technologies.

## 🔗 Links

| Item | URL |
|------|-----|
| **Live Website** | https://roktoneer.vercel.app |
| **Frontend Repository** | https://github.com/syntaxadil/roktoneer-client |
| **Backend API** | https://roktoneer-backend.vercel.app |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16.2.9 |
| **Runtime** | React 19.2.4 |
| **Authentication** | better-auth v1.6.20 |
| **Styling** | Tailwind CSS v4 + PostCSS |
| **Components** | shadcn/ui + Radix UI |
| **Forms** | react-hook-form v7.80.0 |
| **HTTP Client** | Fetch API (native) |
| **Payments** | Stripe v22.3.0 |
| **Charts** | Recharts v3.9.0 |
| **Icons** | Lucide React v1.21.0 |
| **Animations** | Framer Motion + Custom CSS |
| **Theme** | next-themes v0.4.6 |
| **Image Upload** | ImgBB API |
| **PDF Export** | jsPDF + jspdf-autotable |

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication route group
│   │   ├── login/                # Login page
│   │   └── register/             # Registration page
│   ├── (main)/                   # Public route group
│   │   ├── page.jsx              # Landing page
│   │   ├── donation-requests/    # Browse requests
│   │   ├── donors/               # Donor search
│   │   └── funding/              # Donation funding
│   ├── (dashboard)/              # Protected route group
│   │   └── dashboard/            # Dashboard layouts
│   │       ├── page.jsx          # Dashboard home
│   │       ├── profile/          # User profile
│   │       ├── my-requests/      # My donation requests
│   │       ├── create-request/   # Create request form
│   │       ├── all-users/        # Admin user management
│   │       └── donation-requests/# All requests (admin/volunteer)
│   ├── api/                      # API routes
│   │   ├── auth/[...all]/        # better-auth endpoint
│   │   └── checkout_sessions/    # Stripe sessions
│   ├── layout.jsx                # Root layout
│   ├── error.jsx                 # Error boundary
│   └── loading.jsx               # Loading state
│
├── components/
│   ├── dashboard/                # Dashboard components (8+)
│   ├── donor/                    # Donor/request cards
│   ├── funds/                    # Funding components
│   ├── home/                     # Landing page sections
│   ├── shared/                   # Navbar, Footer, Layout
│   └── ui/                       # 24 shadcn/Radix primitives
│
├── lib/
│   ├── auth/
│   │   ├── auth.js               # Server-side auth config
│   │   └── auth-client.js        # Client-side auth hooks
│   ├── stripe.js                 # Stripe initialization
│   └── utils.js                  # Utility functions
│
├── hooks/
│   └── use-mobile.js             # Responsive detection
│
├── assets/
│   └── staticDatas.js            # Blood groups, districts, upazilas
│
├── proxy.js                      # Middleware (auth & routing)
└── globals.css                   # Tailwind + CSS variables
```

## ✨ Features

| Feature | Status | Details |
|---------|--------|---------|
| **User Authentication** | ✅ | Email/password with better-auth |
| **Social Login** | ✅ | Google OAuth 2.0 |
| **Role-Based Access** | ✅ | Donor, Volunteer, Admin |
| **Donation Requests** | ✅ | Create, edit, delete, filter |
| **Donor Search** | ✅ | Filter by blood group, district |
| **Admin Dashboard** | ✅ | User management, analytics |
| **Volunteer Dashboard** | ✅ | Request status updates |
| **Donor Dashboard** | ✅ | Personalized requests view |
| **Stripe Payments** | ✅ | Donation funding |
| **Analytics Charts** | ✅ | Daily/weekly/monthly trends |
| **Dark Mode** | ✅ | System + manual toggle |
| **Responsive Design** | ✅ | Mobile, tablet, desktop |
| **PDF Export** | ✅ | Search results download |

## 🔐 Authentication (better-auth)

**Architecture:**
- Server-side session management with JWT
- HTTP-only cookies (XSS protected)
- MongoDB adapter for user persistence
- EdDSA token signing + JWKS verification

**Flows:**
```
Registration → Image Upload (ImgBB) → Create User → JWT Cookie
Login → Verify Credentials → JWT Cookie
Protected Route → Verify Session → Allow Access
```

**Token Duration:** 7 days (604,800 seconds)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/syntaxadil/roktoneer-client.git
cd roktoneer-client

# Install dependencies
npm install

# Create .env.local file
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=https://roktoneer-backend.vercel.app/api
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imagebb_api_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key
EOF

# Start development server
npm run dev
```

**Open browser:** http://localhost:3000

### Build & Deploy

```bash
# Production build
npm run build

# Start production server
npm start

# Deploy to Vercel
npx vercel deploy
```

## 🔧 Environment Variables

**`.env.local`** (create this file):

```env
# Backend API
NEXT_PUBLIC_API_URL=https://roktoneer-backend.vercel.app/api

# Image Upload Service
NEXT_PUBLIC_IMAGEBB_API_KEY=your_imagebb_api_key_here

# Stripe Payment
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your_stripe_key_here

# Optional: Development URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** Never commit `.env.local` to Git!

## 📚 Available Scripts

```bash
# Development
npm run dev                    # Start dev server with hot reload

# Production
npm run build                  # Build for production
npm start                      # Start production server

# Code Quality
npm run lint                   # Run ESLint
npm run format                 # Format with Prettier (if configured)

# Deployment
npx vercel deploy             # Deploy to Vercel
```

## 📋 Routes Overview

### Public Routes (No Auth)
| Route | Purpose |
|-------|---------|
| `/` | Landing page with stats |
| `/login` | Email/password authentication |
| `/register` | User registration |
| `/donation-requests` | Browse all pending requests |
| `/donors` | Search donors by blood group |
| `/funding` | View donations & contribute |

### Protected Routes (Auth Required)
| Route | Role | Purpose |
|-------|------|---------|
| `/dashboard` | All | Dashboard home |
| `/dashboard/profile` | All | User profile |
| `/dashboard/create-request` | Donor | Create donation request |
| `/dashboard/my-requests` | Donor | View own requests |
| `/dashboard/donation-requests` | Volunteer, Admin | Manage requests |
| `/dashboard/all-users` | Admin | User management |

## 🔌 API Integration

### Base URL
```
https://roktoneer-backend.vercel.app/api
```

### Request Pattern
```javascript
// With authentication
const token = await authClient.token()
const response = await fetch(
  `${API_URL}/donation-request`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${token?.token}`
    },
    body: JSON.stringify(payload)
  }
)
```

### Key Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/active-donors-count` | Total donors |
| GET | `/api/donation-requests/public-pending` | Pending requests |
| GET | `/api/users/donors?page=1&limit=6` | Search donors |
| GET | `/api/funds/total-funds` | Total funds |
| POST | `/api/donation-request` | Create request |
| POST | `/api/auth/sign-in` | Login |
| POST | `/api/auth/sign-up` | Register |
| POST | `/api/auth/sign-out` | Logout |

## 🎨 Component System

**24 UI Primitives** from shadcn/ui:
- Button (6 variants × 7 sizes)
- Input, Select, Textarea
- Dialog, Sheet, Sidebar
- Table, Pagination
- Dropdown, Avatar, Tooltip
- Skeleton, Badge, Card
- Checkbox, Label
- + Custom animations

**Usage Example:**
```jsx
<Button 
  variant="default"     // default | outline | ghost | destructive | link
  size="default"        // default | xs | sm | lg | icon
>
  Click me
</Button>
```

## 🌙 Dark Mode

**Implementation:** next-themes with "class" strategy

**Toggle:**
```javascript
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle Theme
    </button>
  )
}
```

**Styling:** CSS variables automatically update

## 📊 Form Handling

**Pattern:** react-hook-form + shadcn fields

```javascript
import { useForm } from "react-hook-form"

export function MyForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data) => {
    // Submit form
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: true })} />
      {errors.email && <span>Email required</span>}
    </form>
  )
}
```

**Validation:** HTML5 attributes + server validation

## 💳 Payment Integration (Stripe)

**Checkout Flow:**
```javascript
// Create session
const response = await fetch("/api/checkout_sessions", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ amount: 5000 })
})

const { sessionId } = await response.json()

// Redirect to Stripe
const { error } = await stripe.redirectToCheckout({ sessionId })
```

**Webhook:** Backend handles post-payment verification

## 📈 Performance Optimizations

| Optimization | Implementation |
|-------------|-----------------|
| **Next.js Image** | Responsive images + lazy loading |
| **Code Splitting** | Route-based splitting |
| **Tailwind** | Tree-shaking (unused styles removed) |
| **Pagination** | 6 items per page (reduced DOM) |
| **Server Components** | RSC for data fetching |
| **Cache Strategy** | `cache: "no-store"` for fresh data |

**Bundle Size (estimated):**
- Core: ~200KB
- Tailwind: ~60KB
- Components: ~150KB
- Total: ~610KB (gzipped: ~150KB)

## 🔒 Security

| Measure | Implementation |
|---------|-----------------|
| **XSS Protection** | HTTP-only cookies |
| **CSRF** | Server validates requests |
| **Secrets** | Environment variables only |
| **Image Upload** | ImgBB validation |
| **Auth** | JWT + session verification |
| **Middleware** | Route protection on every request |

## 📝 Commits

**Total Client-Side Commits:** 20+ ✅

**Commit Pattern:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code restructuring
- `style:` Code style
- `perf:` Performance improvements

## 🚨 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **API calls failing** | Check `NEXT_PUBLIC_API_URL` in `.env.local` |
| **Images not loading** | Verify ImgBB API key in environment |
| **Auth not persisting** | Clear cookies, restart dev server |
| **Stripe error** | Verify `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` |
| **Build failing** | Run `npm install`, delete `.next` folder |

## 📚 Documentation

- **Tailwind CSS**: https://tailwindcss.com
- **Next.js**: https://nextjs.org
- **shadcn/ui**: https://ui.shadcn.com
- **better-auth**: https://better-auth.vercel.app
- **React Hook Form**: https://react-hook-form.com

## 🎯 Future Improvements

- [ ] TypeScript migration
- [ ] Client-side validation (Zod/Yup)
- [ ] CSRF protection
- [ ] Request caching (SWR/React Query)
- [ ] Unit tests (Vitest)
- [ ] Component Storybook
- [ ] Internationalization (i18n)

## 👨‍💻 Developer

**Abdur Rahman** | Full Stack Developer | Dhaka, Bangladesh  
GitHub: [syntaxadil](https://github.com/syntaxadil)

## 📄 License

MIT License - see LICENSE file

## 🤝 Contributing

Contributions welcome! Follow these steps:
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'feat: Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/syntaxadil)


---

**Made with ❤️ for blood donation community** 🩸

Live: [roktoneer.vercel.app](https://roktoneer.vercel.app)