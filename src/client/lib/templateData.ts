export type TemplateFormValues = {
  fullName: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  notifications: boolean;
  bio: string;
};

export type TemplateTableRow = {
  id: string;
  name: string;
  owner: string;
  status: "active" | "paused" | "draft";
  region: string;
  updatedAt: string;
  requests: number;
};

const templateFormDefaults: TemplateFormValues = {
  fullName: "Alex Johnson",
  email: "alex@example.com",
  role: "editor",
  notifications: true,
  bio: "Building reusable templates with TanStack tooling.",
};

const templateTableRows: TemplateTableRow[] = [
  {
    id: "svc-001",
    name: "Edge API",
    owner: "Platform Team",
    status: "active",
    region: "Global",
    updatedAt: "2026-03-10",
    requests: 128430,
  },
  {
    id: "svc-002",
    name: "Billing Worker",
    owner: "Finance Systems",
    status: "paused",
    region: "US East",
    updatedAt: "2026-03-08",
    requests: 25691,
  },
  {
    id: "svc-003",
    name: "Notification Hub",
    owner: "Growth",
    status: "active",
    region: "APAC",
    updatedAt: "2026-03-09",
    requests: 77823,
  },
  {
    id: "svc-004",
    name: "Customer Import",
    owner: "Data Ops",
    status: "draft",
    region: "EU",
    updatedAt: "2026-03-07",
    requests: 9123,
  },
  {
    id: "svc-005",
    name: "Analytics Feed",
    owner: "Insights",
    status: "active",
    region: "US West",
    updatedAt: "2026-03-11",
    requests: 190204,
  },
];

function sleep(durationMs: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, durationMs);
  });
}

export async function fetchTemplateFormDefaults() {
  await sleep(250);
  return templateFormDefaults;
}

export async function submitTemplateForm(values: TemplateFormValues) {
  await sleep(400);
  return {
    message: `Saved template values for ${values.fullName}`,
    savedAt: new Date().toISOString(),
  };
}

export async function fetchTemplateTableRows() {
  await sleep(300);
  return templateTableRows;
}
