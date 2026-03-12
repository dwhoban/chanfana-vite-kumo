# Base UI Headless Reference

Use this guide when `@cloudflare/kumo` does not expose a component you need.

## Source of truth

- Base UI component index: https://base-ui.com/llms.txt
- Base UI docs root: https://base-ui.com/react/

Always prefer Kumo first, then compose with existing Kumo primitives, then use Base UI headless primitives.

## Decision flow

1. Check `./components.md` for an existing Kumo component.
2. Check if the need can be composed from Kumo (`Field`, `Label`, `Surface`, `Button`, `Dialog`, etc.).
3. If still missing, use `@base-ui/react` primitive(s) and style with Kumo semantic tokens.

## Kumo to Base UI mapping

Use this mapping when you need lower-level control or parity for behavior.

| Kumo component   | Base UI primitive           |
| ---------------- | --------------------------- |
| `Dialog`         | `Dialog`                    |
| `DropdownMenu`   | `Menu`                      |
| `Popover`        | `Popover`                   |
| `Tooltip`        | `Tooltip`                   |
| `Input`          | `Input` + `Field`           |
| `Select`         | `Select`                    |
| `Combobox`       | `Combobox` / `Autocomplete` |
| `Checkbox`       | `Checkbox`                  |
| `Checkbox.Group` | `Checkbox Group`            |
| `Radio.Group`    | `Radio`                     |
| `Switch`         | `Switch`                    |
| `Tabs`           | `Tabs`                      |
| `Meter`          | `Meter`                     |
| `Toast`          | `Toast`                     |
| `Collapsible`    | `Collapsible`               |

## High-value Base UI primitives not currently represented in Kumo docs

Reach for these first when introducing new UI capabilities:

- `Alert Dialog` for destructive confirmations with stronger semantics than a generic modal.
- `Drawer` for mobile-friendly side sheets and slide-over workflows.
- `Context Menu` for right-click or long-press contextual actions.
- `Navigation Menu` for complex multi-level site/app navigation.
- `Number Field` for accessible numeric input with increment/decrement controls.
- `Progress` for task completion status (distinct from `Meter`).
- `Scroll Area` for custom scroll containers.
- `Separator` for semantic visual divisions.
- `Slider` for ranged value selection.
- `Toggle` and `Toggle Group` for pressed-state and grouped mode controls.
- `Toolbar` for keyboard-navigable command clusters.
- `Accordion` for stacked disclosure sections.
- `Avatar` and `Preview Card` for profile and rich-hover patterns.

## Styling and composition rules when using Base UI

- Use semantic tokens only (`bg-kumo-*`, `text-kumo-*`, `border-kumo-*`, `ring-kumo-*`).
- Do not use `dark:` classes; mode is token-driven.
- Merge classes with `cn()` from `@cloudflare/kumo`.
- Keep compound anatomy (`Root`, `Trigger`, `Content`, etc.) to preserve accessibility and keyboard behavior.
- Use Kumo `Field` and `Label` wrappers for form controls where applicable.

## Minimal integration pattern

```tsx
import { cn, Field, Label } from "@cloudflare/kumo";
import { Separator } from "@base-ui/react/separator";

export function ExampleSection() {
  return (
    <section className={cn("bg-kumo-base text-kumo-default")}>
      <Field>
        <Label>Section title</Label>
      </Field>
      <Separator className={cn("my-3 border-t border-kumo-line")} />
    </section>
  );
}
```

## Notes

- Base UI is headless: behavior and accessibility are provided, visual design is your responsibility.
- Keep visual output aligned to Kumo language so mixed Kumo/Base UI screens remain consistent.
