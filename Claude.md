# WiredWorld Client

## Import Conventions

Imports must be ordered in three groups, separated by blank lines:

1. **Package imports** — third-party/node_modules, sorted longest to shortest
2. **Alias imports** — `@/` prefixed paths (components, lib, routes, etc.), sorted longest to shortest
3. **Relative imports** — `./` or `../` prefixed paths, sorted longest to shortest

### Barrel Export Pattern

UI components are accessed through the barrel export at `@/components/ui`. Each component namespace is prefixed with `Ui` (e.g., `UiButton`, `UiCard`, `UiItem`).

**Usage:**
```tsx
import { UiButton, UiCard, UiSeparator } from "@/components/ui";

// Then use as:
<UiButton.Button variant="outline">Click me</UiButton.Button>
<UiCard.Card>
  <UiCard.CardHeader>...</UiCard.CardHeader>
</UiCard.Card>
```

**Do NOT** import directly from individual component files:
```tsx
// Bad
import { Button } from "@/components/ui/button";

// Good
import { UiButton } from "@/components/ui";
```

## Routes

All internal navigation links must use the `routes` object from `@/routes`. When adding a new page or link, add the route to the `routes` object first.

```tsx
import { routes } from "@/routes";

<Link href={routes.home}>Home</Link>
```

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4 with shadcn/ui (new-york style)
- **UI Components:** Barrel-exported from `@/components/ui`
- **Icons:** Phosphor Icons (`@phosphor-icons/react`) preferred, Lucide React as fallback. Use the `*Icon` suffix variants (e.g., `XLogoIcon` not `XLogo`) to avoid deprecation warnings.
- **Fonts:** Geist Sans & Geist Mono
