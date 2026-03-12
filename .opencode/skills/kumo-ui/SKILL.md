---
name: kumo-ui
description: Build UIs with Cloudflare Kumo React components using semantic tokens, compound patterns, and Tailwind v4 compatible conventions.
---

# @cloudflare/kumo

Cloudflare's React component library built on Base UI + Tailwind CSS v4.

## CRITICAL RULES

1. **Semantic tokens only** - Use `bg-kumo-base`, `text-kumo-default`, etc. NEVER use raw Tailwind colors (`bg-blue-500`).
2. **No `dark:` variant** - Light/dark mode is handled automatically via CSS `light-dark()`. NEVER add `dark:` prefixes.
3. **Merge classes with `cn()`** - Import from `@cloudflare/kumo` and use it to combine class names.
4. **Compound components** - Many components use dot-notation API: `<Dialog.Root>`, `<Dialog.Trigger>`, etc.

## Reference Documentation

- `./references/components.md` - Full component reference with props, variants, and usage
- `./references/tokens.md` - Semantic color tokens for text, background, border
- `./references/patterns.md` - Common patterns: Field wrapper, compound components, loading states
- `./references/base-ui-headless.md` - Base UI headless primitives to use when Kumo does not yet expose a component

## When Kumo Lacks a Component

Use this order of operations:

1. **Check existing Kumo exports first** in `./references/components.md`.
2. **Compose with existing Kumo primitives** (`Field`, `Label`, `Surface`, `Button`, semantic tokens).
3. **Then reach for Base UI headless primitives** using `./references/base-ui-headless.md` as the source of truth.

When building on Base UI, keep Kumo conventions:

- Preserve Kumo theming (`bg-kumo-*`, `text-kumo-*`, `border-kumo-*`)
- Keep accessibility wiring from the headless primitive (trigger/content/label relationships, keyboard behavior)
- Prefer Kumo composition patterns (`.Root`, `.Trigger`, `.Content`) for consistency

## CSS Setup (Required)

In your main CSS file (e.g. `global.css`), add **all three lines in this order**:

```css
@source "path/to/node_modules/@cloudflare/kumo/dist/**/*.{js,jsx,ts,tsx}";
@import "@cloudflare/kumo/styles";
@import "tailwindcss";
```

- **`@source`** - Tells Tailwind to scan kumo's compiled JS for class names
- **Import order matters** - `@cloudflare/kumo/styles` must come **before** `@import "tailwindcss"`

## Quick Start

```tsx
import { Button, Input, Dialog, cn } from "@cloudflare/kumo";
import { PlusIcon } from "@phosphor-icons/react";

function CreateDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        render={(p) => (
          <Button {...p} icon={PlusIcon}>
            Create
          </Button>
        )}
      />
      <Dialog size="base" className="p-6">
        <Dialog.Title>Create New Item</Dialog.Title>
        <Input
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={name.length < 3 ? "Name must be at least 3 characters" : undefined}
          variant={name.length < 3 ? "error" : "default"}
        />
        <div className={cn("flex gap-2 mt-4", "justify-end")}>
          <Dialog.Close
            render={(p) => (
              <Button {...p} variant="secondary">
                Cancel
              </Button>
            )}
          />
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
        </div>
      </Dialog>
    </Dialog.Root>
  );
}
```

## Component Categories

### Action Components

| Component       | Key Props                                                                             |
| --------------- | ------------------------------------------------------------------------------------- |
| `Button`        | `variant`: primary, secondary, ghost, destructive, outline; `size`, `icon`, `loading` |
| `ClipboardText` | `value`, `label`                                                                      |

### Input Components

| Component         | Key Props                                                             |
| ----------------- | --------------------------------------------------------------------- |
| `Input`           | `size`: xs, sm, base, lg; `variant`: default, error; `label`, `error` |
| `Select`          | `value`, `onValueChange`, `label`, `hideLabel` (default: true)        |
| `Combobox`        | `items`, `value`, `onValueChange`, `multiple`, `label`                |
| `Checkbox`        | `checked`, `onCheckedChange`, `label`, `indeterminate`                |
| `Checkbox.Group`  | `legend`, `orientation`, `allValues`, `value`, `onValueChange`        |
| `Radio.Group`     | `legend`; `.Item` with `label`, `value`                               |
| `Switch`          | `checked`, `onCheckedChange`, `label`, `size`                         |
| `SensitiveInput`  | `label`, `size`, `variant`                                            |
| `DateRangePicker` | `onStartDateChange`, `onEndDateChange`, `size`, `timezone`            |

### Display Components

| Component     | Key Props                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------- |
| `Text`        | `variant`: heading1, heading2, heading3, body, secondary, success, error, mono; `size`, `as` |
| `Badge`       | `variant`: primary, secondary, destructive, outline, beta                                    |
| `Code`        | `children`; use `CodeBlock` for multi-line with copy                                         |
| `Table`       | `.Header`, `.Head`, `.Body`, `.Row`, `.Cell`, `.Footer`; `layout`: auto, fixed               |
| `Empty`       | `icon`, `title`, `description`, `commandLine`, `contents`                                    |
| `Meter`       | `value`, `max`, `label`, `size`                                                              |
| `Breadcrumbs` | `.Link` (with `href`), `.Separator`, `.Current`; `size`: sm, base                            |

### Overlay Components

| Component      | Key Props                                                                   |
| -------------- | --------------------------------------------------------------------------- |
| `Dialog`       | `size`: sm, base, lg, xl; `.Root`, `.Trigger`, `.Title`, `.Close`           |
| `DropdownMenu` | `.Trigger`, `.Content`, `.Item`; item `variant`: default, danger            |
| `Popover`      | `.Trigger`, `.Content`, `.Title`, `.Description`, `.Close`; `side`, `align` |
| `Tooltip`      | `content`, `side`, `align`, `asChild`                                       |

### Layout Components

| Component     | Key Props                                                                   |
| ------------- | --------------------------------------------------------------------------- |
| `Surface`     | `variant`: flat, raised; `as` for polymorphic rendering                     |
| `Grid`        | `variant`: 2up, side-by-side, 2-1, 1-2, 3up, 4up; `gap`: none, sm, base, lg |
| `Collapsible` | `title`, `defaultOpen`                                                      |
| `LayerCard`   | `title`, `tag`, `actions`, `icon`                                           |

### Feedback Components

| Component          | Key Props                                                        |
| ------------------ | ---------------------------------------------------------------- |
| `Banner`           | `variant`: default, alert, error; `icon`, `onDismiss`            |
| `Loader`           | `size`: number (default 16)                                      |
| `Toast` / `Toasty` | Wrap app with `<Toasty>`, use `Toast.useToastManager().notify()` |

### Navigation Components

| Component        | Key Props                                                            |
| ---------------- | -------------------------------------------------------------------- |
| `Tabs`           | `tabs: { value, label, render? }[]`; `variant`: segmented, underline |
| `Pagination`     | `page`, `setPage`, `perPage`, `totalCount`; `controls`: full, simple |
| `MenuBar`        | `isActive`, `options: { icon, tooltip, onClick }[]`                  |
| `CommandPalette` | `.Root`, `.Input`, `.List`, `.Item`, `.ResultItem`                   |

## Icons

Kumo uses **Phosphor Icons** via `@phosphor-icons/react`:

```tsx
import { PlusIcon, TrashIcon, GearIcon } from "@phosphor-icons/react";

<Button icon={PlusIcon}>Add Worker</Button>
<DropdownMenu.Item icon={TrashIcon} variant="danger">Delete</DropdownMenu.Item>
```

## Controlled State Reference

| Component        | Value Prop | Change Callback   | Default Prop     |
| ---------------- | ---------- | ----------------- | ---------------- |
| `Input`          | `value`    | `onChange`        | `defaultValue`   |
| `Select`         | `value`    | `onValueChange`   | `defaultValue`   |
| `Combobox`       | `value`    | `onValueChange`   | `defaultValue`   |
| `Switch`         | `checked`  | `onCheckedChange` | `defaultChecked` |
| `Checkbox`       | `checked`  | `onCheckedChange` | `defaultChecked` |
| `Checkbox.Group` | `value`    | `onValueChange`   | `defaultValue`   |
| `Radio.Group`    | `value`    | `onValueChange`   | `defaultValue`   |
| `Tabs`           | `value`    | `onValueChange`   | `selectedValue`  |

## Semantic Tokens

### Text Colors

| Token               | Purpose                            |
| ------------------- | ---------------------------------- |
| `text-kumo-default` | Primary text                       |
| `text-kumo-inverse` | Inverse text (on dark backgrounds) |
| `text-kumo-strong`  | Secondary/muted-strong text        |
| `text-kumo-subtle`  | Muted/placeholder text             |
| `text-kumo-link`    | Link text                          |
| `text-kumo-danger`  | Error/destructive text             |
| `text-kumo-success` | Success text                       |
| `text-kumo-warning` | Warning text                       |
| `text-kumo-brand`   | Brand-colored text                 |

### Background Colors

| Token                 | Purpose                             |
| --------------------- | ----------------------------------- |
| `bg-kumo-base`        | Page/card background                |
| `bg-kumo-elevated`    | Slightly elevated surface           |
| `bg-kumo-overlay`     | Overlay/hover background            |
| `bg-kumo-contrast`    | High-contrast background (inverted) |
| `bg-kumo-control`     | Form control background             |
| `bg-kumo-fill`        | Muted fill (borders, badges)        |
| `bg-kumo-fill-hover`  | Hover state for fills               |
| `bg-kumo-tint`        | Subtle tinted background            |
| `bg-kumo-interact`    | Interactive element background      |
| `bg-kumo-brand`       | Brand primary background            |
| `bg-kumo-brand-hover` | Brand hover background              |
| `bg-kumo-danger`      | Error/destructive background        |
| `bg-kumo-success`     | Success background                  |
| `bg-kumo-warning`     | Warning background                  |

### Border/Ring Colors

| Token              | Purpose                      |
| ------------------ | ---------------------------- |
| `border-kumo-fill` | Default border               |
| `border-kumo-line` | Subtle separator line        |
| `ring-kumo-line`   | Default ring (input borders) |
| `ring-kumo-ring`   | Focus ring                   |

## Anti-Patterns (NEVER)

| Anti-Pattern                              | Correct Approach                                      |
| ----------------------------------------- | ----------------------------------------------------- |
| `bg-blue-500`, `text-gray-900`            | Use `bg-kumo-brand`, `text-kumo-default`              |
| `dark:bg-gray-800`                        | Remove `dark:` - handled automatically                |
| `className={a + " " + b}`                 | Use `cn(a, b)` from `@cloudflare/kumo`                |
| `<Dialog><Content>...</Content></Dialog>` | Use `<Dialog.Root><Dialog>...</Dialog></Dialog.Root>` |
| Missing `render` on Trigger/Close         | Use `render={(p) => <Button {...p}>...</Button>}`     |

## Principles

1. **Always use semantic tokens** - ensures consistent theming and automatic dark mode
2. **Compound components for overlays** - Dialog, Popover, DropdownMenu require `.Root` wrapper
3. **Use `render` prop for triggers** - enables proper event handling and accessibility
4. **Wrap inputs with Field** - use built-in `label`, `error`, `description` props
5. **Loading states on buttons** - use `loading` prop, not manual spinner insertion
