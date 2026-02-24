# Ecommerce

Full-stack ecommerce starter project with three apps in this repository:
- `frontend` — customer-facing React app (Vite + Tailwind)
- `admin` — admin dashboard React app (Vite + Tailwind)
- `backend` — Node/Express API with MongoDB, Cloudinary and Stripe integrations

---

## Repository structure

- `backend/` — Express API, controllers, routes, MongoDB connection
- `frontend/` — public storefront app
- `admin/` — admin panel app
- `forever-assets/` — shared/static assets

---

## Tech stack

- Frontend / Admin: React, Vite, Tailwind CSS
- Backend: Node.js (ESM), Express, MongoDB (Mongoose)
- File uploads: Cloudinary
- Payments: Stripe (webhooks)

---

## Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- MongoDB instance (local or hosted)
- Cloudinary account (for image uploads)
- Stripe account (for payments & webhook signing)

---

## Environment variables

Create a `.env` file in the `backend` folder with these variables (names used in the code):

- `MONGODB_URI` — MongoDB connection string (the code appends `/e-commerce`)
- `JWT_SCRET` — JWT secret used by auth middleware (note: variable name in code is `JWT_SCRET`)
- `ADMIN_EMAIL` — admin username/email for admin login
- `ADMIN_PASSWORD` — admin password used alongside `ADMIN_EMAIL`
- `CLOUDINARY_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_SECRET_KEY` — Cloudinary API secret
- `STRIPE_SECRET_KEY` — Stripe secret key for API operations
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret (used to verify webhook payloads)
- `PORT` — optional, backend port (defaults to `3000`)

Frontend and admin apps use Vite env variables. Both include an example `.env` with:

- `VITE_BACKEND_URL` — backend base URL (e.g. `http://localhost:3000`)

---

## Install & run (local development)

1. Install dependencies for each app:

```bash
# from repository root
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

2. Start services:

```bash
# Backend (dev with nodemon)
cd backend
npm run server

# Frontend (customer site)
cd ../frontend
npm run dev

# Admin dashboard
cd ../admin
npm run dev
```

3. Visit:
- Frontend: http://localhost:5173 (or Vite dev URL shown in console)
- Admin: http://localhost:5174 (or Vite dev URL shown in console)
- Backend: http://localhost:3000

Note: Vite default ports may differ; check the terminal output.

---

## Stripe webhooks

The backend exposes a webhook endpoint at `/api/order/webhook`. Stripe webhook verification requires the `STRIPE_WEBHOOK_SECRET` environment variable.

When developing locally, use the Stripe CLI to forward webhooks to your local backend and provide the webhook secret.

---

## Deployment

- The `backend` can be deployed to any Node hosting (Heroku, Vercel Serverless functions, DigitalOcean, etc.).
- The `frontend` and `admin` are Vite apps suitable for static hosting (Vercel, Netlify, etc.).
- Ensure environment variables are provided in the hosting environment (MongoDB URI, Cloudinary keys, Stripe keys).

---

## Notes & tips

- The JWT environment variable in the code is named `JWT_SCRET`. If you rename it, update all references in `backend` files.
- Use a secure, random value for `JWT_SCRET` and do not commit `.env` files.
- Keep Stripe webhook secret private and rotate if compromised.

---

## Contributing

1. Open an issue to discuss changes.
2. Create a branch, make changes, and open a pull request.

---

## License

This repository does not include a license file. Add one if you plan to publish.
