# TinkerHub SNGCET

A modern Next.js website for TinkerHub SNGCET that showcases the chapter, its leadership, upcoming events, and open core-team roles. The app uses the App Router, Tailwind CSS, Firebase authentication, and a simple content-driven setup with JSON data files.

## What the site includes

- A public landing page with the chapter mission and highlights
- A leadership page for the current lead profile
- An events page for upcoming and past community activities
- A recruitment section where visitors can browse open roles and apply
- A simple login/signup experience backed by Firebase Auth
- A protected dashboard area for authenticated users

## Current stack

- Next.js 16
- React 18
- Tailwind CSS
- Firebase Authentication + Firestore
- TypeScript

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create a local environment file from the example:

```bash
cp .env.local.example .env.local
```

3. Fill in your Firebase configuration values in [.env.local](.env.local.example).

4. Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Firebase setup

To make authentication and application submission work locally:

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com).
2. Add a web app and copy the config values into [.env.local](.env.local.example).
3. Enable Email/Password authentication in Firebase Authentication.
4. Create a Firestore database if you plan to use application storage.

The app reads Firebase settings from environment variables, so the same code can be used for development, staging, and production with different env files.

## Email validation

The auth form now accepts any properly formatted email address that contains an @ symbol. This is intentionally simple and does not enforce a college-specific domain.

## Main project structure

- [app](app) — route-level pages such as the home page, roles, events, login, signup, and dashboard
- [components](components) — reusable UI pieces including the navbar, hero, auth form, event cards, and role application sections
- [context](context) — authentication state for the app
- [hooks](hooks) — small client-side helpers such as the email validation hook
- [lib](lib) — Firebase setup, validators, and content/data helpers
- [public](public) — static assets
- [styles](styles) — global styles and shared design tokens

## Content updates

Most of the visible site content is driven by JSON data files in [lib/data](lib/data):

- [lib/data/lead.json](lib/data/lead.json) for leadership information
- [lib/data/events.json](lib/data/events.json) for events
- [lib/data/roles.json](lib/data/roles.json) for open roles and application questions

## Build and verify

Run:

```bash
npm run build
```

This verifies that the project compiles successfully with the current Next.js setup.

## Deployment

The app is ready for deployment on platforms like Vercel. Add the same Firebase environment variables to your deployment environment and deploy the repository.
