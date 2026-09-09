# StartupForge client

StartupForge is a Next.js application that connects startup founders with collaborators and startup opportunities.

## Stack

- Next.js 16, React 19, Tailwind CSS
- Better Auth with Google OAuth and MongoDB
- Stripe Checkout
- HeroUI, Framer Motion, Recharts
- ImgBB for profile and startup images

## Local setup

1. Install Node.js 20 or newer.
2. Install dependencies: `npm install`
3. Create `.env.local` with the required values:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
MONGODB_URI=
MONGO_DB_COLLECTION=startupforge
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_BASE_URL=http://localhost:5000
NEXT_PUBLIC_IMAGE_UPLOAD_API=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

4. Start the client: `npm run dev`
5. Open `http://localhost:3000`.

The API server must be running at `NEXT_PUBLIC_BASE_URL`. Never commit `.env` or `.env.local`.

## Features

- Founder, collaborator, and admin dashboards
- Startup and opportunity browsing
- Applications and founder decisions
- Profile editing with image uploads
- Stripe premium subscriptions and transaction history
- Admin moderation and platform statistics

## Validation

```bash
npm run lint
npm run build
```

Use non-production test accounts and Stripe test-mode credentials during development. Production credentials and test credentials should be managed in the deployment provider rather than committed to documentation.
