import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import type { TemplateFormValues } from "../lib/templateData.ts";
import {
  templateFormDefaultsQueryOptions,
  templateFormSubmitMutationOptions,
} from "../lib/templateQueries.ts";
import { useGlobalPageHeader } from "../pageHeaderSlots.ts";

const fallbackValues: TemplateFormValues = {
  fullName: "",
  email: "",
  role: "viewer",
  notifications: false,
  bio: "",
};

export const Route = createLazyFileRoute("/forms")({
  component: FormsTemplatePage,
});

function FormsTemplatePage() {
  const { setPageHeaderSlots, clearPageHeaderSlots } = useGlobalPageHeader();
  const defaultsQuery = useQuery(templateFormDefaultsQueryOptions);
  const submitMutation = useMutation(templateFormSubmitMutationOptions());

  const form = useForm({
    defaultValues: fallbackValues,
    onSubmit: async ({ value }) => {
      await submitMutation.mutateAsync(value);
    },
  });

  useEffect(() => {
    if (defaultsQuery.data) {
      form.reset(defaultsQuery.data);
    }
  }, [defaultsQuery.data, form]);

  useEffect(() => {
    setPageHeaderSlots({
      eyebrow: "Template UI",
      title: "TanStack Form",
      description:
        "A reusable form template with validation, async submit, and TanStack Query mutation wiring.",
      metadata: (
        <>
          <span>Feature: form state</span>
          <span>Data: TanStack Query</span>
        </>
      ),
      status: defaultsQuery.isFetching
        ? "Loading defaults..."
        : submitMutation.isPending
          ? "Saving changes..."
          : submitMutation.isSuccess
            ? submitMutation.data.message
            : "Ready",
    });

    return clearPageHeaderSlots;
  }, [
    clearPageHeaderSlots,
    defaultsQuery.isFetching,
    setPageHeaderSlots,
    submitMutation.data,
    submitMutation.isPending,
    submitMutation.isSuccess,
  ]);

  return (
    <section className="mx-auto w-full max-w-3xl rounded-xl border border-kumo-line bg-kumo-elevated p-5 md:p-6">
      <form
        className="space-y-5"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="fullName"
          validators={{
            onChange: ({ value }) =>
              value.trim().length < 2 ? "Enter at least 2 characters." : undefined,
          }}
        >
          {(field) => (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-kumo-default">Full Name</span>
              <input
                className="rounded-md border border-kumo-line bg-kumo-base px-3 py-2 text-sm"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldError fieldErrors={field.state.meta.errors} />
            </label>
          )}
        </form.Field>

        <form.Field
          name="email"
          validators={{
            onBlur: ({ value }) =>
              /^\S+@\S+\.\S+$/.test(value) ? undefined : "Enter a valid email address.",
          }}
        >
          {(field) => (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-kumo-default">Email</span>
              <input
                type="email"
                className="rounded-md border border-kumo-line bg-kumo-base px-3 py-2 text-sm"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldError fieldErrors={field.state.meta.errors} />
            </label>
          )}
        </form.Field>

        <form.Field name="role">
          {(field) => (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-kumo-default">Role</span>
              <select
                className="rounded-md border border-kumo-line bg-kumo-base px-3 py-2 text-sm"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) =>
                  field.handleChange(event.target.value as TemplateFormValues["role"])
                }
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </label>
          )}
        </form.Field>

        <form.Field name="notifications">
          {(field) => (
            <label className="flex items-center gap-2 text-sm text-kumo-default">
              <input
                type="checkbox"
                name={field.name}
                checked={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.checked)}
              />
              Enable notifications
            </label>
          )}
        </form.Field>

        <form.Field
          name="bio"
          validators={{
            onChange: ({ value }) => (value.trim().length === 0 ? "Add a short bio." : undefined),
          }}
        >
          {(field) => (
            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-kumo-default">Bio</span>
              <textarea
                className="min-h-28 rounded-md border border-kumo-line bg-kumo-base px-3 py-2 text-sm"
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldError fieldErrors={field.state.meta.errors} />
            </label>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => ({
            canSubmit: state.canSubmit,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ canSubmit, isSubmitting }) => (
            <div className="flex flex-wrap items-center gap-3 border-t border-kumo-line pt-4">
              <button
                type="submit"
                disabled={!canSubmit || isSubmitting || defaultsQuery.isLoading}
                className="rounded-md bg-kumo-fill px-4 py-2 text-sm font-medium text-kumo-default disabled:opacity-50"
              >
                {isSubmitting || submitMutation.isPending ? "Saving..." : "Save Template Form"}
              </button>
              <button
                type="button"
                onClick={() => {
                  form.reset(defaultsQuery.data ?? fallbackValues);
                  submitMutation.reset();
                }}
                className="rounded-md border border-kumo-line px-4 py-2 text-sm text-kumo-default"
              >
                Reset
              </button>
            </div>
          )}
        </form.Subscribe>
      </form>
    </section>
  );
}

function FieldError({ fieldErrors }: { fieldErrors: unknown[] }) {
  if (fieldErrors.length === 0) {
    return null;
  }

  const message = fieldErrors.map((errorValue) => String(errorValue)).join(", ");

  return <p className="text-xs text-red-600">{message}</p>;
}
