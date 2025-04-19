
# E-Commerce Project Documentation

This document provides a comprehensive overview of the project structure, how to edit different components, and guides for setting up authentication and database functionality.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Components](#key-components)
3. [How to Edit Components](#how-to-edit-components)
4. [Authentication Options](#authentication-options)
5. [Database Solutions](#database-solutions)
6. [Payment Integration](#payment-integration)
7. [Deployment](#deployment)

## Project Structure

The project follows a standard React/Vite structure with TypeScript and is organized as follows:

```
src/
├── components/        # Reusable UI components
├── contexts/          # React Context providers
├── data/              # Mock data and data utilities
├── hooks/             # Custom React hooks
├── layouts/           # Layout components
├── lib/               # Utility functions
├── pages/             # Page components
│   ├── admin/         # Admin dashboard pages
│   └── api/           # API route handlers
└── types/             # TypeScript type definitions
```

## Key Components

### Layouts

- `RootLayout.tsx`: The main layout component that wraps all pages. Contains header, footer, and placeholders for custom navigation.
- `AdminLayout.tsx`: Layout specifically for admin pages with authentication protection.

### Pages

- `/pages/Index.tsx`: Homepage with hero slider and product categories
- `/pages/Men.tsx`: Men's products page
- `/pages/Women.tsx`: Women's products page
- `/pages/Collectibles.tsx`: Collectibles page
- `/pages/Contact.tsx`: Contact page
- `/pages/admin/Login.tsx`: Admin login page
- `/pages/admin/Dashboard.tsx`: Admin dashboard for product management

### Components

- `ProductCard.tsx`: Displays individual product information
- `Cart.tsx`: Shopping cart component with slide-out drawer
- `WhatsAppSupport.tsx`: WhatsApp support button
- `Loader.tsx`: Loading screen component
- `Footer.tsx`: Site footer component
- `HeroSlider.tsx`: Hero image slider for the homepage
- `ProductCategoryTabs.tsx`: Category tabs for product filtering

### Contexts

- `CartContext.tsx`: Manages shopping cart state globally
- `AdminSessionContext.tsx`: Handles admin authentication state

## How to Edit Components

### Customizing Navigation

In `RootLayout.tsx`, find the following comment blocks to insert your custom navigation code:

```tsx
{/* NAVBAR START – DESKTOP */}
{/* ← INSERT CUSTOM DESKTOP NAVBAR HERE → */}
{/* NAVBAR END – DESKTOP */}

{/* NAVBAR START – TABLET */}
{/* ← INSERT CUSTOM TABLET NAVBAR HERE → */}
{/* NAVBAR END – TABLET */}

{/* NAVBAR START – MOBILE */}
{/* ← INSERT CUSTOM MOBILE NAVBAR HERE → */}
{/* NAVBAR END – MOBILE */}
```

### Adding New Products

Products are currently stored in `data/products.ts`. You can modify this file to add, remove, or edit products.

To add a new product through the admin interface:

1. Login to the admin dashboard at `/admin/login`
2. Navigate to the appropriate category tab
3. Use the "Add New Product" form at the bottom of the page

### Modifying Styles

The project uses Tailwind CSS for styling. Most components are styled with Tailwind utility classes which can be modified directly in the component files.

For shadcn/ui components, you can customize them by modifying their theme configuration.

## Authentication Options

### Option 1: Supabase (Recommended)

[Supabase](https://supabase.com/) offers a complete backend solution including authentication, database, and storage.

To integrate Supabase:

1. Create a Supabase account and a new project
2. Install the Supabase client library:
   ```bash
   npm install @supabase/supabase-js
   ```
3. Create a client configuration file:

```tsx
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

4. Create authentication components (for admin login):

```tsx
// src/components/Auth.tsx
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) {
      console.error('Error logging in:', error.message)
    }
  }

  return (
    // ... login form implementation
  )
}
```

5. Update the admin context to use Supabase authentication

### Option 2: Clerk

[Clerk](https://clerk.dev/) is a complete authentication and user management solution that's easy to implement.

To integrate Clerk:

1. Create a Clerk account and set up your application
2. Install the Clerk React library:
   ```bash
   npm install @clerk/clerk-react
   ```
3. Add your Clerk publishable key to your environment variables
4. Wrap your application with the Clerk provider:

```tsx
// src/main.tsx
import { ClerkProvider } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <App />
    </ClerkProvider>
  </React.StrictMode>
)
```

5. Use Clerk components for authentication in your admin pages

## Database Solutions

### Option 1: Supabase (Recommended)

If you choose Supabase for authentication, you get PostgreSQL database included. To use it:

1. Define your database schema in the Supabase dashboard or using SQL migrations
2. Create tables for products, orders, etc.
3. Set up Row Level Security (RLS) policies to secure your data
4. Use the Supabase client to query data:

```tsx
// Example: Fetching products
const { data: products, error } = await supabase
  .from('products')
  .select('*')
  .eq('category', 'men')
```

### Option 2: Firebase

[Firebase](https://firebase.google.com/) provides a NoSQL database with real-time updates.

To integrate Firebase:

1. Create a Firebase account and project
2. Install the Firebase SDK:
   ```bash
   npm install firebase
   ```
3. Initialize Firebase in your application:

```tsx
// src/lib/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
```

4. Use Firestore to store and retrieve data:

```tsx
// Example: Fetching products
import { collection, query, where, getDocs } from 'firebase/firestore'

const fetchProducts = async (category) => {
  const q = query(collection(db, "products"), where("category", "==", category))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}
```

## Payment Integration

The project includes stub API endpoints for different payment methods:

- `/api/stripe/create-session.ts`: For Stripe checkout integration
- `/api/paystack/initiate.ts`: For Paystack payment integration
- `/api/crypto/create-transaction.ts`: For cryptocurrency payments

To fully implement these payment methods, you'll need to:

1. Create accounts with the respective payment providers
2. Add your API keys to environment variables
3. Complete the implementation of the API endpoints

### Stripe Example Implementation

```tsx
// Updated implementation for stripe checkout
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

export const createStripeSession = async (items: CartItem[]) => {
  const lineItems = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product.title,
        images: [item.product.image]
      },
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }))

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_URL}/cart`,
  })

  return session
}
```

## Deployment

This project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Set up environment variables in the Vercel dashboard
3. Deploy your application

For other hosting options:

- **Netlify**: Similar workflow to Vercel
- **AWS Amplify**: Provides hosting along with backend services
- **GitHub Pages**: For static site hosting

## Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
