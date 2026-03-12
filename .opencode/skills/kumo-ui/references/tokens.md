# Kumo Semantic Tokens

CRITICAL: Always use semantic tokens. Never use raw Tailwind colors like `bg-blue-500` or `text-gray-900`.

## Text Colors

| Token               | Purpose                | Usage                             |
| ------------------- | ---------------------- | --------------------------------- |
| `text-kumo-default` | Primary text           | Main content, headings, labels    |
| `text-kumo-inverse` | Inverse text           | Text on dark backgrounds          |
| `text-kumo-strong`  | Secondary/muted-strong | Emphasized secondary text         |
| `text-kumo-subtle`  | Muted/placeholder      | Help text, placeholders, disabled |
| `text-kumo-link`    | Link text              | Clickable links                   |
| `text-kumo-danger`  | Error/destructive      | Error messages, delete actions    |
| `text-kumo-success` | Success                | Success messages, confirmations   |
| `text-kumo-warning` | Warning                | Warning messages, cautions        |
| `text-kumo-brand`   | Brand-colored          | Accent text, brand highlights     |

### Examples

```tsx
// Primary content
<p className="text-kumo-default">Main paragraph text</p>

// Help text
<span className="text-kumo-subtle">Optional field</span>

// Error message
<span className="text-kumo-danger">Email is required</span>

// Success message
<span className="text-kumo-success">Changes saved</span>

// Link
<a href="/docs" className="text-kumo-link hover:underline">Documentation</a>
```

## Background Colors

| Token                 | Purpose              | Usage                                  |
| --------------------- | -------------------- | -------------------------------------- |
| `bg-kumo-base`        | Page/card background | Main page background, card backgrounds |
| `bg-kumo-elevated`    | Elevated surface     | Modals, dropdowns, popovers            |
| `bg-kumo-overlay`     | Overlay/hover        | Hover states, overlays                 |
| `bg-kumo-contrast`    | High-contrast        | Inverted sections, hero areas          |
| `bg-kumo-control`     | Form control         | Input backgrounds, select backgrounds  |
| `bg-kumo-fill`        | Muted fill           | Badge backgrounds, subtle fills        |
| `bg-kumo-fill-hover`  | Hover fill           | Hover state for filled elements        |
| `bg-kumo-tint`        | Subtle tint          | Light accent backgrounds               |
| `bg-kumo-interact`    | Interactive          | Clickable element backgrounds          |
| `bg-kumo-brand`       | Brand primary        | Primary buttons, brand elements        |
| `bg-kumo-brand-hover` | Brand hover          | Hover state for brand elements         |
| `bg-kumo-danger`      | Error/destructive    | Error badges, delete buttons           |
| `bg-kumo-success`     | Success              | Success badges, confirmations          |
| `bg-kumo-warning`     | Warning              | Warning badges, caution areas          |

### Examples

```tsx
// Page layout
<div className="bg-kumo-base min-h-screen">
  <header className="bg-kumo-elevated border-b border-kumo-line">
    Header
  </header>
  <main className="p-4">
    Content
  </main>
</div>

// Card
<div className="bg-kumo-elevated rounded-lg p-4 shadow-sm">
  Card content
</div>

// Interactive element
<button className="bg-kumo-interact hover:bg-kumo-fill-hover px-3 py-2 rounded">
  Click me
</button>

// Status indicators
<span className="bg-kumo-success text-kumo-inverse px-2 py-1 rounded">Active</span>
<span className="bg-kumo-danger text-kumo-inverse px-2 py-1 rounded">Error</span>
<span className="bg-kumo-warning text-kumo-default px-2 py-1 rounded">Pending</span>
```

## Border/Ring Colors

| Token              | Purpose          | Usage                      |
| ------------------ | ---------------- | -------------------------- |
| `border-kumo-fill` | Default border   | Card borders, dividers     |
| `border-kumo-line` | Subtle separator | Light dividers, table rows |
| `ring-kumo-line`   | Input border     | Default input ring/border  |
| `ring-kumo-ring`   | Focus ring       | Focus state outline        |

### Examples

```tsx
// Card with border
<div className="border border-kumo-fill rounded-lg p-4">
  Card content
</div>

// Divider
<hr className="border-kumo-line" />

// Custom input with focus ring
<input className="ring-1 ring-kumo-line focus:ring-2 focus:ring-kumo-ring rounded px-3 py-2" />

// Table row borders
<tr className="border-b border-kumo-line">
  <td>Cell content</td>
</tr>
```

## Dark Mode

**NEVER use `dark:` variants.** Kumo handles dark mode automatically via CSS `light-dark()` function.

```tsx
// WRONG - Don't do this
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// CORRECT - Semantic tokens adapt automatically
<div className="bg-kumo-base text-kumo-default">
```

## Common Patterns

### Page Layout

```tsx
<div className="bg-kumo-base min-h-screen text-kumo-default">
  <nav className="bg-kumo-elevated border-b border-kumo-line px-4 py-3">
    <span className="text-kumo-brand font-semibold">Logo</span>
  </nav>
  <main className="max-w-4xl mx-auto p-6">
    <h1 className="text-kumo-default text-2xl font-bold mb-4">Title</h1>
    <p className="text-kumo-subtle mb-6">Description text</p>
    <div className="bg-kumo-elevated rounded-lg border border-kumo-fill p-4">Content card</div>
  </main>
</div>
```

### Form Section

```tsx
<div className="bg-kumo-elevated rounded-lg p-6 border border-kumo-fill">
  <h2 className="text-kumo-default font-semibold mb-4">Settings</h2>
  <div className="space-y-4">
    <Input label="Name" />
    <Input label="Email" />
    <div className="text-kumo-subtle text-sm">Your email will never be shared.</div>
  </div>
  <div className="mt-6 pt-4 border-t border-kumo-line flex gap-2 justify-end">
    <Button variant="secondary">Cancel</Button>
    <Button variant="primary">Save</Button>
  </div>
</div>
```

### Status Badge

```tsx
function StatusBadge({ status }: { status: "active" | "error" | "pending" }) {
  const styles = {
    active: "bg-kumo-success text-kumo-inverse",
    error: "bg-kumo-danger text-kumo-inverse",
    pending: "bg-kumo-warning text-kumo-default",
  };

  return <span className={cn("px-2 py-1 rounded text-sm", styles[status])}>{status}</span>;
}
```

### Hover States

```tsx
// Use semantic hover tokens
<button className="bg-kumo-fill hover:bg-kumo-fill-hover">
  Hoverable
</button>

<button className="bg-kumo-brand hover:bg-kumo-brand-hover">
  Brand button
</button>

// Interactive list item
<li className="px-3 py-2 hover:bg-kumo-overlay rounded cursor-pointer">
  List item
</li>
```
