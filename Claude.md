<!--
  These are the agreed-upon patterns and conventions for this project.
  All development on the WiredWorld client should follow these guidelines.
  If you're touching this codebase — these are the rules, no exceptions.
-->

# WiredWorld Client

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 with shadcn/ui (new-york style)
- **UI Components:** Barrel-exported from `@/components/ui`
- **Icons:** Phosphor Icons (`@phosphor-icons/react`) preferred, Lucide React as fallback. Use the `*Icon` suffix variants (e.g., `XLogoIcon` not `XLogo`) to avoid deprecation warnings.
- **Fonts:** Geist Sans & Geist Mono

---

## Project Structure

### `models/`

Defined interfaces for database/API objects that may appear across multiple API calls.

```ts
// models/user.ts
export interface UserModel { ... }
```

### `services/`

Houses files that handle API calls. Always append the `Service` postfix to service functions.

```ts
// services/auth.ts
export const loginService = () => ...
export const createAccountService = () => ...
```

> In almost all cases (except server-side code), use **then-catch-finally** over try-catch.

### `routes/`

Contains a single `index.ts` that defines all internal routes used in the application.

```ts
import { routes } from "@/routes";
<Link href={routes.home}>Home</Link>
```

### `hooks/`

Contains reusable hooks used across the codebase. Exports all hooks through a central `index.ts`.

### `schemas/`

Contains all Zod schemas used in forms. Do not define schemas inline inside form components — import them from here.

```ts
// schemas/auth.ts
export const loginFormSchema = z.object({ ... })
```

### `app/`

All files inside `app/` are **dash-cased**, not camelCased.

- ✅ `my-component.tsx`
- ❌ `myComponent.tsx`

---

## Component Section Comments

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

## Import Conventions

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

## UI Components — Barrel Export Pattern

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

## Other Conventions

- **Remove all `console.log`s** before committing.
- **Clean up outdated comments** — don't leave stale or misleading comments in the code.
- **No inline schemas** — all Zod schemas live in `schemas/`, imported into forms.
- **Routes** — always use the `routes` object for internal navigation; add new routes there first.
