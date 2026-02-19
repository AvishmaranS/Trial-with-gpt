# Avishmaran Music Platform

Production-ready Next.js 14 platform for a cinematic personal music experience.

## Stack
- Next.js 14 App Router
- React 18 + Tailwind + Framer Motion
- Supabase Postgres + Storage
- Razorpay payments

## Setup
1. `cp .env.example .env.local`
2. Fill all env vars.
3. Run SQL in `database/schema.sql`.
4. Create Supabase storage bucket named `products`.
5. Install and run:
   - `npm install`
   - `npm run dev`

## Architecture
- `app/` routes and APIs
- `components/` reusable UI
- `lib/` integrations and utilities
- `database/` schema
- `types/` shared TypeScript contracts

## Security
- Admin JWT auth for CRUD actions.
- Razorpay signature verification before purchase persistence.
- Download endpoint checks purchase and returns temporary signed URLs only.
