# Barber Management System — Super Admin UI (Phase 3)

React + Vite, plain CSS Modules. This is your platform-operator panel —
not something shop owners or workers ever see.

## Setup

```bash
cp .env.example .env    # point VITE_API_BASE_URL at your backend
npm install
npm run dev
```

## What's built

- **Login** — email + password against the `SuperAdmin` collection
  (seed one directly in Mongo or add a small bootstrap script — there's
  no public sign-up route for this role, intentionally).
- **Create Shop** — name, owner name, owner phone → generates and
  displays a unique **barber code**, shown in a stamped/brass-bordered
  box so it's easy to copy and hand to the shop.
- **Shop list** — every shop with active/inactive status.
- **Deactivate** — disables a shop's barber code (workers/admins can no
  longer log in with it) without deleting its historical data.
- **Create Admin Login** — an inline form per shop to provision that
  shop's first Admin account (name + password), since admin accounts
  don't self-register — see the Phase 1 README for why.

## Design

Same "ledger" system as the Worker and Admin apps, with **brass** as the
accent here specifically — the barber code is the thing this app exists
to issue, so it's presented like a stamped seal: a dashed brass border
around the code itself.

## Not yet built

- Editing a shop's own details (name/owner) after creation
- Regenerating a barber code
- Super admin self-service password reset
