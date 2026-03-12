# Kumo Common Patterns

## Field Wrapper Pattern

Most input components accept `label`, `description`, and `error` props that automatically wrap the input in a `<Field>`:

```tsx
// Input with label, description, and error
<Input
  label="Email"
  description="We'll never share your email"
  error="Invalid email address"
  variant="error"
/>

// Select with visible label (hideLabel=false since default is true)
<Select label="Region" hideLabel={false} error="Please select a region">
  <Select.Option value="us">US East</Select.Option>
  <Select.Option value="eu">EU West</Select.Option>
</Select>

// Combobox with label
<Combobox label="Tags" items={tags} multiple />
```

### Manual Field Usage

For custom inputs, wrap them in `<Field>`:

```tsx
import { Field, Label } from "@cloudflare/kumo";

<Field>
  <Label tooltip="Your unique identifier">User ID</Label>
  <CustomInput />
  <Field.Description>Auto-generated on save</Field.Description>
  <Field.Error>ID already exists</Field.Error>
</Field>;
```

## Compound Components Pattern

Many components use dot-notation API via `Object.assign`:

### Dialog

```tsx
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger render={(p) => <Button {...p}>Open</Button>} />
  <Dialog size="lg" className="p-8">
    <Dialog.Title>Confirm Action</Dialog.Title>
    <Dialog.Description>This action cannot be undone.</Dialog.Description>
    <div className="flex gap-2 justify-end mt-4">
      <Dialog.Close
        render={(p) => (
          <Button {...p} variant="secondary">
            Cancel
          </Button>
        )}
      />
      <Button variant="destructive" onClick={onConfirm}>
        Delete
      </Button>
    </div>
  </Dialog>
</Dialog.Root>
```

### DropdownMenu

```tsx
<DropdownMenu.Root>
  <DropdownMenu.Trigger
    render={(p) => <Button {...p} variant="ghost" icon={DotsThreeIcon} aria-label="Options" />}
  />
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={PencilIcon} onClick={onEdit}>
      Edit
    </DropdownMenu.Item>
    <DropdownMenu.Item icon={CopyIcon} onClick={onDuplicate}>
      Duplicate
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={TrashIcon} variant="danger" onClick={onDelete}>
      Delete
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Popover

```tsx
<Popover.Root>
  <Popover.Trigger
    render={(p) => (
      <Button {...p} variant="ghost">
        Info
      </Button>
    )}
  />
  <Popover.Content side="bottom" align="start" className="p-4 w-64">
    <Popover.Title>Worker Details</Popover.Title>
    <Popover.Description>This worker handles API requests for the dashboard.</Popover.Description>
    <Popover.Close
      render={(p) => (
        <Button {...p} size="sm" variant="secondary" className="mt-2">
          Close
        </Button>
      )}
    />
  </Popover.Content>
</Popover.Root>
```

## render Prop Pattern

Use `render` prop for Trigger and Close components to enable proper event handling:

```tsx
// CORRECT - Uses render prop
<Dialog.Trigger render={(p) => <Button {...p}>Open</Button>} />

// WRONG - Missing render prop
<Dialog.Trigger>
  <Button>Open</Button>
</Dialog.Trigger>
```

The `render` prop passes necessary props (`onClick`, `aria-*`, refs) to your component.

## Loading States Pattern

Buttons support a `loading` prop that shows a spinner and disables interaction:

```tsx
function SaveButton() {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await save();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button onClick={handleSave} loading={saving}>
      {saving ? "Saving..." : "Save"}
    </Button>
  );
}
```

## Polymorphic Rendering Pattern

Some components accept an `as` prop for custom element types:

```tsx
// Surface as a section
<Surface as="section" variant="raised" className="p-4">
  Section content
</Surface>

// Text with custom heading level
<Text variant="heading1" as="h2">
  Looks like h1, semantically h2
</Text>

// Link as router component
import { Link as RouterLink } from "react-router-dom";

<Link as={RouterLink} to="/dashboard">
  Dashboard
</Link>
```

## Class Merging Pattern

Always use `cn()` from `@cloudflare/kumo` to merge class names:

```tsx
import { cn, Button } from "@cloudflare/kumo";

// Merging conditional classes
<div className={cn(
  "p-4 rounded-lg",
  isActive && "bg-kumo-tint",
  hasError && "border-2 border-kumo-danger"
)}>
  Content
</div>

// Extending component styles
<Button className={cn("w-full", className)}>
  Full width button
</Button>
```

## Controlled vs Uncontrolled Pattern

| Component | Controlled                    | Uncontrolled      |
| --------- | ----------------------------- | ----------------- |
| Input     | `value` + `onChange`          | `defaultValue`    |
| Select    | `value` + `onValueChange`     | `defaultValue`    |
| Checkbox  | `checked` + `onCheckedChange` | `defaultChecked`  |
| Switch    | `checked` + `onCheckedChange` | `defaultChecked`  |
| Dialog    | `open` + `onOpenChange`       | (no uncontrolled) |

### Controlled Example

```tsx
function ControlledForm() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("free");
  const [notifications, setNotifications] = useState(false);

  return (
    <form>
      <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Select label="Plan" value={plan} onValueChange={setPlan}>
        <Select.Option value="free">Free</Select.Option>
        <Select.Option value="pro">Pro</Select.Option>
      </Select>
      <Switch
        label="Email notifications"
        checked={notifications}
        onCheckedChange={setNotifications}
      />
    </form>
  );
}
```

### Uncontrolled Example

```tsx
function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef}>
      <Input label="Name" defaultValue="John" name="name" />
      <Select label="Plan" defaultValue="free" name="plan">
        <Select.Option value="free">Free</Select.Option>
        <Select.Option value="pro">Pro</Select.Option>
      </Select>
    </form>
  );
}
```

## Toast Notification Pattern

```tsx
import { Toasty, Toast, Button } from "@cloudflare/kumo";

// 1. Wrap app with Toasty provider
function App() {
  return (
    <Toasty>
      <Dashboard />
    </Toasty>
  );
}

// 2. Use toast manager in components
function Dashboard() {
  const toastManager = Toast.useToastManager();

  const handleDelete = async () => {
    try {
      await deleteItem();
      toastManager.notify({
        title: "Item deleted",
        description: "The item has been permanently removed.",
        variant: "success",
      });
    } catch (error) {
      toastManager.notify({
        title: "Failed to delete",
        description: error.message,
        variant: "error",
      });
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete
    </Button>
  );
}
```

## Form Validation Pattern

```tsx
import { Input, Button, cn } from "@cloudflare/kumo";

function ValidatedForm() {
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && !isValid;

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={() => setTouched(true)}
        error={showError ? "Please enter a valid email" : undefined}
        variant={showError ? "error" : "default"}
      />
      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
}
```

## Table with Actions Pattern

```tsx
import { Table, Button, DropdownMenu, Badge } from "@cloudflare/kumo";
import { DotsThreeIcon } from "@phosphor-icons/react";

function WorkersTable({ workers }) {
  return (
    <Table>
      <Table.Header>
        <Table.Head>Name</Table.Head>
        <Table.Head>Status</Table.Head>
        <Table.Head>Last Deployed</Table.Head>
        <Table.Head className="w-12" />
      </Table.Header>
      <Table.Body>
        {workers.map((worker) => (
          <Table.Row key={worker.id}>
            <Table.Cell className="font-medium">{worker.name}</Table.Cell>
            <Table.Cell>
              <Badge variant={worker.active ? "primary" : "secondary"}>
                {worker.active ? "Active" : "Inactive"}
              </Badge>
            </Table.Cell>
            <Table.Cell className="text-kumo-subtle">{worker.lastDeployed}</Table.Cell>
            <Table.Cell>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger
                  render={(p) => (
                    <Button
                      {...p}
                      variant="ghost"
                      shape="square"
                      icon={DotsThreeIcon}
                      aria-label="Actions"
                    />
                  )}
                />
                <DropdownMenu.Content>
                  <DropdownMenu.Item>View Logs</DropdownMenu.Item>
                  <DropdownMenu.Item>Edit</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item variant="danger">Delete</DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
```

## Empty State Pattern

```tsx
import { Empty, Button } from "@cloudflare/kumo";
import { FolderIcon, PlusIcon } from "@phosphor-icons/react";

function EmptyWorkers() {
  return (
    <Empty
      icon={FolderIcon}
      title="No Workers yet"
      description="Workers let you run serverless code at the edge. Create your first Worker to get started."
      contents={
        <Button icon={PlusIcon} onClick={openCreateDialog}>
          Create Worker
        </Button>
      }
    />
  );
}

// With command line
function EmptyWithCommand() {
  return (
    <Empty
      title="Quick start"
      description="Run this command to create a new Worker project:"
      commandLine="npm create cloudflare@latest my-worker"
    />
  );
}
```
