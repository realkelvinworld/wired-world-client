# WiredWorld Client

The official storefront for WiredWorld — a curated electronics and tech products retailer. Customers can browse products, manage a wishlist and compare list, place orders as a guest or authenticated user, and track their order history from a personal dashboard.

---

## Tech Stack

| Layer         | Tool                                   |
| ------------- | -------------------------------------- |
| Framework     | Next.js (App Router)                   |
| Styling       | Tailwind CSS v4 + shadcn/ui (new-york) |
| State         | Zustand (auth, cart, user)             |
| Data Fetching | TanStack Query v5                      |
| Forms         | React Hook Form + Zod                  |
| HTTP          | Axios (wrapped in `lib/http.ts`)       |
| Icons         | Phosphor Icons                         |
| Fonts         | Geist Sans & Geist Mono                |
| Payments      | Paystack                               |

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
pnpm build   # production build
pnpm start   # start production server
pnpm lint    # run eslint
```

---

## Application Flows

### Authentication

All auth routes live under `/auth/`.

1. **Sign Up** — User enters details on `/auth/sign-up` → OTP sent to their contact → verified on `/auth/sign-up/otp-input` → account confirmed on `/auth/sign-up/verify`.
2. **Login** — User submits credentials on `/auth/login` → if OTP-gated, redirected to `/auth/login/otp-input` to complete sign-in.
3. **Forgot Password** — User requests a reset on `/auth/forgot-password` → receives a reset link/OTP → completes reset on `/auth/forgot-password/reset`.
4. **Logout** — Hits the `/api/logout` route handler which clears the session cookie, then redirects to login.

Authenticated state is persisted via an `access_token` cookie. The `AuthWrapper` provider checks this on mount and gates dashboard/checkout pages accordingly.

---

### Browsing & Discovery

| Route        | Description                                                                             |
| ------------ | --------------------------------------------------------------------------------------- |
| `/`          | Homepage — hero, featured products, announcements                                       |
| `/shop`      | Full product catalogue with filtering (category, brand, price range) and sorting        |
| `/shop/[id]` | Product detail page — images, specs, pricing, reviews, add to cart / wishlist / compare |
| `/brands`    | Brand directory                                                                         |
| `/showrooms` | Physical showroom listings                                                              |
| `/about`     | About WiredWorld                                                                        |
| `/contact`   | Contact form (name, email, phone, message)                                              |
| `/privacy`   | Privacy policy                                                                          |
| `/terms`     | Terms & conditions                                                                      |
| `/compare`   | Public compare landing (redirects authenticated users to the full compare page)         |

---

### Cart

The cart exists in two modes:

- **Local cart** (guest) — stored in Zustand + `localStorage`. Items are a list of `{ item: Product, quantity }` objects. Cleared after a guest order is placed or after syncing on login.
- **Online cart** (authenticated) — managed server-side via `POST /user/cart/`. Operations: `get`, `add`, `remove`, `clear`. On login the local cart is synced to the server via `add_full_cart`, then the local store is cleared.

**Promo codes** (authenticated only):

- Apply: `POST /user/cart/` `{ type: "apply_promo", promo_code }` — shows the applied discount string in the cart footer.
- Remove: `POST /user/cart/` `{ type: "remove_promo" }` — removes it with a bin icon.
- The `promo_applied` field is returned on every cart `get` response and reflected live in both the cart sheet and checkout order summary.

---

### Checkout

#### Guest Checkout (`/checkout` — unauthenticated)

1. Cart items come from the local Zustand store.
2. User fills in personal + delivery details (name, email, phone, country, address).
3. On submit → `POST /user/guest_order/` → returns Paystack `authorization_url`.
4. User is redirected to Paystack to complete payment.

#### Authenticated Checkout (`/checkout` — logged in)

1. Cart items come from the server cart.
2. User selects or adds a delivery address from their saved addresses.
3. On submit → `POST /user/order/` `{ type: "create_order", address_id }` → returns Paystack `authorization_url`.
4. User is redirected to Paystack to complete payment.

The **Order Summary** panel (right column) shows all cart items, subtotal, and the promo code section for authenticated users.

---

### User Dashboard (`/user/*`)

All dashboard routes are wrapped in `AuthWrapper` — unauthenticated users are redirected to login.

| Route                 | Description                                                                                                                                                                   |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/user`               | Profile overview — name, email, phone, avatar. Edit profile via inline form.                                                                                                  |
| `/user/order-history` | Paginated order history with status filters (pending, processing, shipped, delivered, cancelled).                                                                             |
| `/user/addresses`     | Saved delivery addresses — add, edit, delete with confirmation dialog.                                                                                                        |
| `/user/compare`       | Side-by-side product comparison grid — shows image, brand, price, specs, features, and actions. Products are added from the shop via the compare toggle on each product card. |

---

### Wishlist

- Accessible via the heart icon in the navbar (authenticated users only).
- Opens as a sheet panel listing saved products.
- Actions: add/remove individual items, clear all.
- Managed server-side via `POST /user/wish_list/`.

---

### Product Reviews

- On any product detail page (`/shop/[id]`), authenticated users see a **Write a Review** button.
- Opens a dialog with a 1–5 star rating and a review text field.
- Submitted via `POST /user/review/` and the reviews list is refreshed on success.

---

### Contact

- `/contact` — form with full name, email, phone, and message fields.
- Submitted to `POST /base/contact_us/`.
- On success, the form resets and a confirmation toast is shown.

---

## Project Structure

```
app/               # Next.js App Router pages
  (main)/          # Public-facing routes (shop, checkout, etc.)
  auth/            # Authentication pages
  user/            # Authenticated dashboard pages
  api/             # Route handlers
components/
  ui/              # shadcn/ui primitives — barrel-exported as Ui*
  shared/          # Cross-feature components (ProductCard, ListProducts, etc.)
  forms/           # Form components grouped by feature
  ux/              # Navigation, cart sheet, wishlist sheet, footer
hooks/             # TanStack Query hooks (useCart, useWishlist, useCompare, etc.)
models/            # TypeScript interfaces for API objects
services/          # API call functions (base.ts, auth.ts, user.ts, inventory.ts)
schemas/           # Zod form validation schemas
store/             # Zustand stores (auth, cart, user)
routes/            # Centralised internal route definitions
lib/               # Utilities (http client, formatPrice, auth-check, logout)
```

---

## Development Conventions

### Component Section Comments

Inside every functional component or page, group and label code blocks in this order (skip any section that doesn't apply):

```tsx
// state
// variables
// api
// permissions
// hooks
// routes or navigation
// effect
// functions
```

---

### Import Conventions

Imports are divided into **two sections** separated by a blank line:

1. **Package imports** — third-party / node_modules
2. **Local imports** — anything from within the project (`@/` aliases or relative paths)

Within each section, sort imports from **longest to shortest**.

```tsx
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getOrderHistoryService } from "@/services/user";
import { FiltersInterface } from "@/interfaces";
import { routes } from "@/routes";

import OrderCard from "./order-card";
```

> Use relative imports (`./`, `../`) for files within the same feature folder; use `@/` aliases for cross-feature imports.

---

### UI Components — Barrel Export Pattern

All UI components are accessed through the barrel export at `@/components/ui`. Each namespace is prefixed with `Ui`.

```tsx
import { UiButton, UiCard, UiSeparator } from "@/components/ui";

<UiButton.Button variant="outline">Click me</UiButton.Button>
<UiCard.Card>
  <UiCard.CardHeader>...</UiCard.CardHeader>
</UiCard.Card>
```

**Do NOT** import directly from individual component files:

```tsx
// ❌ Bad
import { Button } from "@/components/ui/button";

// ✅ Good
import { UiButton } from "@/components/ui";
```

---

### Services

All API call functions live in `services/` and always use the `Service` postfix.

```ts
// services/auth.ts
export const loginService = () => ...
export const createAccountService = () => ...
```

Use **then-catch-finally** over try-catch in client components.

---

### Schemas

All Zod schemas live in `schemas/` — never define them inline inside a component.

```ts
// schemas/auth.ts
export const loginFormSchema = z.object({ ... })
```

---

### Routes

Always use the central `routes` object for internal navigation. Add new routes there first.

```tsx
import { routes } from "@/routes";
<Link href={routes.home}>Home</Link>;
```

---

### Models

TypeScript interfaces for database/API objects live in `models/` and may be shared across multiple services.

```ts
// models/user.ts
export interface UserModel { ... }
```

---

### File Naming

All files inside `app/` are **dash-cased**, not camelCased.

- ✅ `my-component.tsx`
- ❌ `myComponent.tsx`

---

### General Rules

- Remove all `console.log`s before committing.
- Clean up outdated comments — don't leave stale or misleading comments.
- No inline schemas — all Zod schemas live in `schemas/`, imported into forms.
