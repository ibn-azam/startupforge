# StartupForge

**Where great startup ideas forge unstoppable teams.**

StartupForge connects startup founders with the developers, designers, and marketers who can help build their vision — through role-based dashboards, opportunity listings, applications, startup management, and integrated payments.

🔗 **Live demo:** [startupforge-blush.vercel.app](https://startupforge-blush.vercel.app)
📦 **Repository:** [github.com/ibn-azam/startupforge](https://github.com/ibn-azam/startupforge)


## Overview

StartupForge is the **client** application: a Next.js app providing role-based dashboards for Founders, Collaborators, and Admins. Founders post startups and opportunities; collaborators browse and apply; admins moderate the platform. Authentication, data storage, and payments are wired up via Better Auth, MongoDB, and Stripe, with a separate API server handling non-auth backend logic.

## Features

- **Role-based dashboards** for Founders, Collaborators, and Admins
- **Browse startups & opportunities**, with search and filtering
- **Applications workflow** — collaborators apply, founders decide
- **Startup management** (creation, editing, team/role tracking)
- **Profile editing** with image uploads
- **Stripe premium subscriptions** and transaction history
- **Admin moderation** and platform-wide statistics
- **Google OAuth** sign-in via Better Auth

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS v4 |
| UI Components | HeroUI v3 (`@heroui/react`, `@heroui/styles`) |
| Icons | `react-icons`, `@gravity-ui/icons` |
| Animation | Framer Motion |
| Charts | Recharts |
| Auth | Better Auth (`better-auth`, `@better-auth/mongo-adapter`) with Google OAuth |
| Database | MongoDB (`mongodb` driver) |
| Payments | Stripe (`stripe`, `@stripe/stripe-js`) |
| Image Hosting | ImgBB |
| Notifications | `react-toastify` |
| Linting | ESLint 9 (`eslint-config-next`) |



## Getting Started

### Prerequisites

- Node.js **20** or newer
- A MongoDB database (Atlas or self-hosted)
- A Google Cloud OAuth client (for Google sign-in)
- A Stripe account (test mode for local development)
- An ImgBB API key / image upload endpoint
- The companion API server running and reachable


## Authentication

- Better Auth handles session management with a MongoDB adapter and Google OAuth.
- Client-side: `authClient` / `useSession`.
- Server-side: `auth.api.getSession` with headers extracted manually — `authClient.token()` is browser-only and cannot be called from server components or server actions.
- Session-derived fields (e.g. an email seeded from the session) should be synced via `useEffect` after mount rather than relied on from a `useState` initializer, due to async session resolution.
- If using `cookieCache` with the JWT strategy, pass `disableCookieCache: true` when fresh database fields (e.g. `isPremium`) are required instead of stale cached values.

## Payments

Stripe powers premium subscriptions:
- Checkout sessions use `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` on the client and `STRIPE_SECRET_KEY` on the server.
- Use Stripe **test mode** credentials and test accounts during development — never commit production credentials to documentation or version control; manage them via your deployment provider's environment settings.

## Image Uploads

Profile and startup images are uploaded via ImgBB, configured through `NEXT_PUBLIC_IMAGE_UPLOAD_API`. HeroUI v3's compound input components can break on file inputs, so native `<input type="file">` elements are used for image fields.

## Deployment

The client is deployed on **Vercel** ([startupforge-blush.vercel.app](https://startupforge-blush.vercel.app)).



## Brand & Design

| Token | Value |
|---|---|
| Deep Navy | `#131B3A` |
| Forge Orange | `#FF6B35` |
| Off-White | `#F8F7F4` / `#FAFAFA` |
| Slate | `#6B7280` |

- **Typography:** Inter font.
- **Motion:** Framer Motion for scroll-triggered entrances (`whileInView` + `viewport={{ once: true }}`), staggered grid reveals (`staggerChildren`), and interactive hover lift (`whileHover` with spring physics).
- **Styling:** Tailwind CSS utilities only — no `<style jsx>` blocks.

Built for founders and the collaborators who help bring their ideas to life.