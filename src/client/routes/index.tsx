import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useGlobalPageHeader } from "../pageHeaderSlots.ts";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { setPageHeaderSlots, clearPageHeaderSlots } = useGlobalPageHeader();

  useEffect(() => {
    setPageHeaderSlots({
      eyebrow: "Template UI",
      title: "Starter Home",
      description:
        "Use this template to scaffold form and table experiences with TanStack Router and Query.",
      status: "Ready",
    });

    return clearPageHeaderSlots;
  }, [clearPageHeaderSlots, setPageHeaderSlots]);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      <Link
        to="/forms"
        className="rounded-xl border border-kumo-line bg-kumo-elevated p-5 transition-colors hover:bg-kumo-fill"
      >
        <h2 className="text-lg font-semibold text-kumo-default">Form Template</h2>
        <p className="mt-2 text-sm text-kumo-subtle">
          Validation, async submission, and query-backed defaults.
        </p>
      </Link>
      <Link
        to="/tables"
        className="rounded-xl border border-kumo-line bg-kumo-elevated p-5 transition-colors hover:bg-kumo-fill"
      >
        <h2 className="text-lg font-semibold text-kumo-default">Table Template</h2>
        <p className="mt-2 text-sm text-kumo-subtle">
          Sorting, filtering, pagination, and query-managed rows.
        </p>
      </Link>
    </section>
  );
}
