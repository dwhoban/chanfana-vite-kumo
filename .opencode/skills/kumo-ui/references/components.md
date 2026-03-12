# Kumo Component Reference

Complete component reference with props, variants, and usage examples.

## Action Components

### Button

Clickable action trigger with multiple variants and states.

```tsx
import { Button } from "@cloudflare/kumo";
import { PlusIcon } from "@phosphor-icons/react";

// Basic usage
<Button variant="primary">Save</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost">Edit</Button>
<Button variant="destructive">Delete</Button>
<Button variant="secondary-destructive">Remove</Button>
<Button variant="outline">Options</Button>

// With icon
<Button icon={PlusIcon}>Add Item</Button>

// Loading state
<Button loading>Saving...</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="base">Base</Button>
<Button size="lg">Large</Button>

// Icon-only button
<Button shape="square" icon={PlusIcon} aria-label="Add" />
```

**Props:**

- `variant`: `primary` | `secondary` | `ghost` | `destructive` | `secondary-destructive` | `outline`
- `size`: `sm` | `base` | `lg`
- `shape`: `default` | `square`
- `icon`: Phosphor icon component
- `loading`: boolean - shows spinner and disables interaction

### ClipboardText

Copy-to-clipboard text display with visual feedback.

```tsx
import { ClipboardText } from "@cloudflare/kumo";

<ClipboardText value="npx wrangler deploy" label="Deploy command" />;
```

**Props:**

- `value`: string - text to copy
- `label`: string - accessible label

## Input Components

### Input

Text input field with label and error support.

```tsx
import { Input } from "@cloudflare/kumo";

// Basic with label
<Input label="Email" placeholder="you@example.com" />

// With error
<Input
  label="Email"
  error="Invalid email address"
  variant="error"
/>

// With description
<Input
  label="API Key"
  description="Found in your account settings"
/>

// Sizes
<Input size="xs" label="Extra small" />
<Input size="sm" label="Small" />
<Input size="base" label="Base" />
<Input size="lg" label="Large" />
```

**Props:**

- `label`: string - visible label (auto-wraps in Field)
- `description`: string - help text below input
- `error`: string - error message
- `variant`: `default` | `error`
- `size`: `xs` | `sm` | `base` | `lg`
- Standard input props: `value`, `onChange`, `placeholder`, etc.

### Select

Dropdown select menu with options.

```tsx
import { Select } from "@cloudflare/kumo";

// Basic (label is screen-reader only by default)
<Select value={region} onValueChange={setRegion} label="Region">
  <Select.Option value="us-east">US East</Select.Option>
  <Select.Option value="eu-west">EU West</Select.Option>
  <Select.Option value="apac">Asia Pacific</Select.Option>
</Select>

// With visible label
<Select label="Region" hideLabel={false}>
  <Select.Option value="us">United States</Select.Option>
</Select>

// With error
<Select label="Region" error="Region is required">
  ...
</Select>
```

**Props:**

- `value`: string
- `onValueChange`: (value: string) => void
- `defaultValue`: string
- `label`: string
- `hideLabel`: boolean (default: `true`)
- `error`: string

### Combobox

Autocomplete input with dropdown suggestions.

```tsx
import { Combobox } from "@cloudflare/kumo";

const items = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

// Single select
<Combobox
  label="Framework"
  items={items}
  value={selected}
  onValueChange={setSelected}
/>

// Multiple select
<Combobox
  label="Tags"
  items={items}
  value={selectedTags}
  onValueChange={setSelectedTags}
  multiple
/>
```

**Props:**

- `items`: `{ value: string, label: string }[]`
- `value`: string | string[]
- `onValueChange`: (value) => void
- `multiple`: boolean
- `label`: string

### Checkbox

Toggle or multi-select control.

```tsx
import { Checkbox } from "@cloudflare/kumo";

// Single checkbox
<Checkbox
  label="Accept terms"
  checked={accepted}
  onCheckedChange={setAccepted}
/>

// Indeterminate state
<Checkbox label="Select all" indeterminate />
```

### Checkbox.Group

Group of checkboxes with fieldset.

```tsx
<Checkbox.Group
  legend="Notifications"
  allValues={["email", "sms", "push"]}
  value={notifications}
  onValueChange={setNotifications}
  orientation="vertical"
>
  <Checkbox value="email" label="Email" />
  <Checkbox value="sms" label="SMS" />
  <Checkbox value="push" label="Push" />
</Checkbox.Group>
```

**Props:**

- `legend`: string
- `orientation`: `horizontal` | `vertical`
- `allValues`: string[]
- `value`: string[]
- `onValueChange`: (value: string[]) => void

### Radio.Group

Single-select radio group.

```tsx
import { Radio } from "@cloudflare/kumo";

<Radio.Group legend="Plan" value={plan} onValueChange={setPlan}>
  <Radio.Item value="free" label="Free" />
  <Radio.Item value="pro" label="Pro - $20/mo" />
  <Radio.Item value="enterprise" label="Enterprise" />
</Radio.Group>;
```

### Switch

Toggle switch control.

```tsx
import { Switch } from "@cloudflare/kumo";

<Switch label="Enable notifications" checked={enabled} onCheckedChange={setEnabled} size="sm" />;
```

**Props:**

- `checked`: boolean
- `onCheckedChange`: (checked: boolean) => void
- `label`: string
- `size`: `sm` | `base`

### SensitiveInput

Input with show/hide toggle for passwords/secrets.

```tsx
import { SensitiveInput } from "@cloudflare/kumo";

<SensitiveInput label="API Key" value={apiKey} onChange={setApiKey} />;
```

### DateRangePicker

Dual-calendar date range selector.

```tsx
import { DateRangePicker } from "@cloudflare/kumo";

<DateRangePicker
  onStartDateChange={setStartDate}
  onEndDateChange={setEndDate}
  timezone="America/Los_Angeles"
  size="base"
/>;
```

## Display Components

### Text

Themed text with semantic variants.

```tsx
import { Text } from "@cloudflare/kumo";

<Text variant="heading1">Page Title</Text>
<Text variant="heading2">Section Title</Text>
<Text variant="heading3">Subsection</Text>
<Text variant="body">Regular paragraph text</Text>
<Text variant="secondary">Muted secondary text</Text>
<Text variant="success">Operation successful</Text>
<Text variant="error">Something went wrong</Text>
<Text variant="mono">console.log("code")</Text>

// Custom element
<Text variant="heading1" as="h2">Custom heading level</Text>

// Sizes
<Text size="xs">Extra small</Text>
<Text size="sm">Small</Text>
<Text size="base">Base</Text>
<Text size="lg">Large</Text>
```

**Props:**

- `variant`: `heading1` | `heading2` | `heading3` | `body` | `secondary` | `success` | `error` | `mono` | `mono-secondary`
- `size`: `xs` | `sm` | `base` | `lg`
- `as`: string | component - polymorphic rendering

### Badge

Status/label indicator.

```tsx
import { Badge } from "@cloudflare/kumo";

<Badge variant="primary">Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
<Badge variant="beta">Beta</Badge>
```

### Code

Inline code or code block.

```tsx
import { Code, CodeBlock } from "@cloudflare/kumo";

// Inline code
<p>Run <Code>npm install</Code> to begin</p>

// Code block with copy button
<CodeBlock>
{`export default {
  fetch(request) {
    return new Response("Hello World");
  }
}`}
</CodeBlock>
```

### Table

Data table with selection support.

```tsx
import { Table } from "@cloudflare/kumo";

<Table layout="auto">
  <Table.Header>
    <Table.Head>Name</Table.Head>
    <Table.Head>Status</Table.Head>
    <Table.Head>Actions</Table.Head>
  </Table.Header>
  <Table.Body>
    {items.map((item) => (
      <Table.Row key={item.id}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell><Badge>{item.status}</Badge></Table.Cell>
        <Table.Cell>
          <Button variant="ghost" size="sm">Edit</Button>
        </Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
  <Table.Footer>
    <Table.Cell colSpan={3}>Total: {items.length}</Table.Cell>
  </Table.Footer>
</Table>

// With row selection
<Table>
  <Table.Header>
    <Table.CheckHead checked={allSelected} onCheckedChange={toggleAll} />
    <Table.Head>Name</Table.Head>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.CheckCell checked={selected} onCheckedChange={toggle} />
      <Table.Cell>Item 1</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
```

**Props:**

- `layout`: `auto` | `fixed`

### Empty

Empty state placeholder.

```tsx
import { Empty } from "@cloudflare/kumo";
import { FolderIcon } from "@phosphor-icons/react";

<Empty
  icon={FolderIcon}
  title="No workers yet"
  description="Create your first Worker to get started"
  contents={<Button icon={PlusIcon}>Create Worker</Button>}
/>

// With command line
<Empty
  title="Quick start"
  commandLine="npm create cloudflare@latest"
/>
```

### Meter

Progress/usage meter bar.

```tsx
import { Meter } from "@cloudflare/kumo";

<Meter value={75} max={100} label="Storage used" size="base" />;
```

### Breadcrumbs

Navigation breadcrumb trail.

```tsx
import { Breadcrumbs } from "@cloudflare/kumo";

<Breadcrumbs size="base">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Link href="/workers">Workers</Breadcrumbs.Link>
  <Breadcrumbs.Separator />
  <Breadcrumbs.Current>my-worker</Breadcrumbs.Current>
</Breadcrumbs>;
```

## Overlay Components

### Dialog

Modal dialog with backdrop.

```tsx
import { Dialog, Button } from "@cloudflare/kumo";

<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger render={(p) => <Button {...p}>Open Dialog</Button>} />
  <Dialog size="lg" className="p-8">
    <Dialog.Title>Confirm Action</Dialog.Title>
    <Dialog.Description>Are you sure you want to proceed?</Dialog.Description>
    <div className="flex gap-2 justify-end mt-4">
      <Dialog.Close
        render={(p) => (
          <Button {...p} variant="secondary">
            Cancel
          </Button>
        )}
      />
      <Button variant="primary" onClick={confirm}>
        Confirm
      </Button>
    </div>
  </Dialog>
</Dialog.Root>;
```

**Props:**

- `Dialog`: `size`: `sm` | `base` | `lg` | `xl`
- `Dialog.Root`: `open`, `onOpenChange`
- `Dialog.Trigger`: `render` - render prop for trigger element
- `Dialog.Close`: `render` - render prop for close element

### DropdownMenu

Context/action menu.

```tsx
import { DropdownMenu, Button } from "@cloudflare/kumo";
import { DotsThreeIcon, PencilIcon, TrashIcon } from "@phosphor-icons/react";

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    render={(p) => (
      <Button {...p} variant="ghost" shape="square" icon={DotsThreeIcon} aria-label="Actions" />
    )}
  />
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={PencilIcon}>Edit</DropdownMenu.Item>
    <DropdownMenu.Item icon={TrashIcon} variant="danger">
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>;
```

### Popover

Popup content anchored to trigger.

```tsx
import { Popover, Button } from "@cloudflare/kumo";

<Popover.Root>
  <Popover.Trigger render={(p) => <Button {...p}>Show Info</Button>} />
  <Popover.Content side="bottom" align="start">
    <Popover.Title>Details</Popover.Title>
    <Popover.Description>Additional information here.</Popover.Description>
    <Popover.Close
      render={(p) => (
        <Button {...p} size="sm">
          Got it
        </Button>
      )}
    />
  </Popover.Content>
</Popover.Root>;
```

### Tooltip

Hover/focus tooltip.

```tsx
import { Tooltip, Button } from "@cloudflare/kumo";

<Tooltip content="Copy to clipboard" side="top">
  <Button variant="ghost" icon={CopyIcon} aria-label="Copy" />
</Tooltip>

// With asChild for custom trigger
<Tooltip content="Learn more" asChild>
  <a href="/docs">Documentation</a>
</Tooltip>
```

## Layout Components

### Surface

Themed container panel.

```tsx
import { Surface } from "@cloudflare/kumo";

<Surface variant="flat" className="p-4">
  Flat surface content
</Surface>

<Surface variant="raised" className="p-4 rounded-lg">
  Raised surface with shadow
</Surface>

// Polymorphic rendering
<Surface as="section" variant="raised">
  Section content
</Surface>
```

### Grid

Responsive CSS grid.

```tsx
import { Grid } from "@cloudflare/kumo";

<Grid variant="2up" gap="base">
  <div>Column 1</div>
  <div>Column 2</div>
</Grid>

<Grid variant="side-by-side" gap="lg">
  <div>Sidebar</div>
  <div>Main content</div>
</Grid>
```

**Props:**

- `variant`: `2up` | `side-by-side` | `2-1` | `1-2` | `1-3up` | `3up` | `4up` | `1-2-4up`
- `gap`: `none` | `sm` | `base` | `lg`

### Collapsible

Expandable/collapsible section.

```tsx
import { Collapsible } from "@cloudflare/kumo";

<Collapsible title="Advanced Settings" defaultOpen={false}>
  <Input label="Custom Header" />
  <Input label="Timeout (ms)" type="number" />
</Collapsible>;
```

### LayerCard

Card with header and collapsible body.

```tsx
import { LayerCard, Button } from "@cloudflare/kumo";
import { GearIcon } from "@phosphor-icons/react";

<LayerCard
  title="Environment Variables"
  tag="3 variables"
  icon={GearIcon}
  actions={
    <Button variant="ghost" size="sm">
      Edit
    </Button>
  }
>
  <Table>...</Table>
</LayerCard>;
```

## Feedback Components

### Banner

Page-level alert message.

```tsx
import { Banner } from "@cloudflare/kumo";
import { WarningIcon } from "@phosphor-icons/react";

<Banner variant="default" icon={InfoIcon}>
  New features are available.
</Banner>

<Banner variant="alert" icon={WarningIcon} onDismiss={() => {}}>
  Your plan will expire soon.
</Banner>

<Banner variant="error">
  Failed to save changes.
</Banner>
```

### Loader

Animated loading spinner.

```tsx
import { Loader } from "@cloudflare/kumo";

<Loader size={16} />
<Loader size={24} />
<Loader size={32} />
```

### Toast / Toasty

Toast notification system.

```tsx
import { Toasty, Toast } from "@cloudflare/kumo";

// Wrap app with Toasty provider
function App() {
  return (
    <Toasty>
      <YourApp />
    </Toasty>
  );
}

// Use toast manager in components
function SaveButton() {
  const toastManager = Toast.useToastManager();

  const handleSave = async () => {
    try {
      await save();
      toastManager.notify({ title: "Saved successfully", variant: "success" });
    } catch {
      toastManager.notify({ title: "Failed to save", variant: "error" });
    }
  };

  return <Button onClick={handleSave}>Save</Button>;
}
```

## Navigation Components

### Tabs

Tabbed navigation.

```tsx
import { Tabs } from "@cloudflare/kumo";

const tabs = [
  { value: "overview", label: "Overview", render: () => <Overview /> },
  { value: "settings", label: "Settings", render: () => <Settings /> },
  { value: "logs", label: "Logs", render: () => <Logs /> },
];

<Tabs
  tabs={tabs}
  value={activeTab}
  onValueChange={setActiveTab}
  variant="underline"
/>

// Segmented variant (pill-style)
<Tabs tabs={tabs} variant="segmented" />
```

### Pagination

Page navigation controls.

```tsx
import { Pagination } from "@cloudflare/kumo";

<Pagination
  page={currentPage}
  setPage={setCurrentPage}
  perPage={20}
  totalCount={500}
  controls="full"
/>

// Simple controls (prev/next only)
<Pagination
  page={page}
  setPage={setPage}
  perPage={10}
  totalCount={100}
  controls="simple"
/>
```

### MenuBar

Horizontal icon toolbar.

```tsx
import { MenuBar } from "@cloudflare/kumo";
import { ListIcon, GridFourIcon, SortAscendingIcon } from "@phosphor-icons/react";

<MenuBar
  isActive={view === "list"}
  options={[
    { icon: ListIcon, tooltip: "List view", onClick: () => setView("list") },
    { icon: GridFourIcon, tooltip: "Grid view", onClick: () => setView("grid") },
    { icon: SortAscendingIcon, tooltip: "Sort", onClick: openSortMenu },
  ]}
/>;
```

### CommandPalette

Spotlight-style search overlay.

```tsx
import { CommandPalette } from "@cloudflare/kumo";

<CommandPalette.Root open={open} onOpenChange={setOpen}>
  <CommandPalette.Input placeholder="Search commands..." />
  <CommandPalette.List>
    <CommandPalette.Item value="create-worker" onSelect={() => {}}>
      Create Worker
    </CommandPalette.Item>
    <CommandPalette.ResultItem value="my-worker" description="Last deployed 2 hours ago">
      my-worker
    </CommandPalette.ResultItem>
  </CommandPalette.List>
</CommandPalette.Root>;
```
