import { cn } from "@cloudflare/kumo";
import { HouseIcon, TableIcon, TextboxIcon } from "@phosphor-icons/react";
import { Link, Outlet, createRootRoute, useRouterState } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { GlobalPageHeaderContext, type GlobalPageHeaderSlots } from "../pageHeaderSlots.ts";

type NavigationItem = {
  to: "/" | "/forms" | "/tables";
  label: string;
  icon: ReactNode;
};

type NavigationSection = {
  label: string;
  items: NavigationItem[];
};

const navigationSections: NavigationSection[] = [
  {
    label: "Pages",
    items: [
      { to: "/", label: "Home", icon: <HouseIcon size={16} /> },
      { to: "/forms", label: "Forms", icon: <TextboxIcon size={16} /> },
      { to: "/tables", label: "Tables", icon: <TableIcon size={16} /> },
    ],
  },
];

function isRouteActive(pathname: string, routePath: string) {
  if (routePath === "/") {
    return pathname === routePath;
  }

  return pathname === routePath || pathname.startsWith(`${routePath}/`);
}

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  const isNavigating = useRouterState({
    select: (state) => state.status === "pending",
  });
  const [pageHeaderSlots, setPageHeaderSlotsState] = useState<GlobalPageHeaderSlots>({});

  const setPageHeaderSlots = useCallback((slots: GlobalPageHeaderSlots) => {
    setPageHeaderSlotsState(slots);
  }, []);

  const clearPageHeaderSlots = useCallback(() => {
    setPageHeaderSlotsState({});
  }, []);

  const pageHeaderContextValue = useMemo(
    () => ({ setPageHeaderSlots, clearPageHeaderSlots }),
    [clearPageHeaderSlots, setPageHeaderSlots],
  );

  return (
    <GlobalPageHeaderContext.Provider value={pageHeaderContextValue}>
      <div className="min-h-dvh bg-kumo-base text-kumo-default">
        <div className="flex min-h-dvh flex-col lg:flex-row">
          <aside className="w-full border-b border-kumo-line bg-kumo-elevated lg:sticky lg:top-0 lg:h-dvh lg:w-68 lg:shrink-0 lg:border-r lg:border-b-0">
            <div className="border-b border-kumo-line px-4 py-4">
              <p className="text-xs font-semibold tracking-[0.1em] text-kumo-subtle uppercase">
                Project Template
              </p>
              <h1 className="mt-1 text-base font-semibold text-kumo-default">Navigation</h1>
            </div>

            <nav className="flex gap-4 overflow-x-auto px-3 py-3 lg:flex-col lg:overflow-y-auto lg:px-4 lg:py-4">
              {navigationSections.map((section) => (
                <div key={section.label} className="min-w-50 lg:min-w-0">
                  <p className="mb-1 hidden px-3 text-xs font-medium tracking-[0.08em] text-kumo-subtle uppercase lg:block">
                    {section.label}
                  </p>
                  <div className="flex gap-1 lg:flex-col">
                    {section.items.map((item) => {
                      const active = isRouteActive(pathname, item.to);

                      return (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            active
                              ? "bg-kumo-fill text-kumo-default"
                              : "text-kumo-strong hover:bg-kumo-fill-hover hover:text-kumo-default",
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </aside>

          <main className="flex min-h-dvh flex-1 flex-col bg-kumo-base">
            <GlobalPageHeader isNavigating={isNavigating} slots={pageHeaderSlots} />
            <div className="mx-auto flex w-full max-w-[1220px] flex-1 flex-col px-4 py-6 md:px-6 lg:px-8 lg:py-8">
              <Outlet />
            </div>
          </main>
        </div>
        {import.meta.env.DEV ? <TanStackRouterDevtools /> : null}
      </div>
    </GlobalPageHeaderContext.Provider>
  );
}

function GlobalPageHeader({
  isNavigating,
  slots,
}: {
  isNavigating: boolean;
  slots: GlobalPageHeaderSlots;
}) {
  const titleSlot = slots.title ?? (
    <h1 className="text-2xl font-semibold text-kumo-default md:text-3xl">Template Page</h1>
  );

  const descriptionSlot = slots.description ?? (
    <p className="max-w-2xl text-sm text-kumo-subtle md:text-base">
      Set page-specific header content with the global page header slot API.
    </p>
  );

  return (
    <header className="border-b border-kumo-line bg-kumo-base">
      {slots.top ? (
        <div className="border-b border-kumo-line px-4 py-2 md:px-6 lg:px-8">{slots.top}</div>
      ) : null}

      <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8 lg:py-5">
        {slots.breadcrumbs ? (
          <div className="text-sm text-kumo-subtle">{slots.breadcrumbs}</div>
        ) : (
          <p className="text-xs font-semibold tracking-[0.1em] text-kumo-subtle uppercase">
            Template
          </p>
        )}

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex min-w-0 flex-col gap-2">
            {slots.eyebrow ? (
              <div className="text-xs font-medium tracking-[0.08em] text-kumo-subtle uppercase">
                {slots.eyebrow}
              </div>
            ) : null}
            {titleSlot}
            {descriptionSlot}

            {slots.metadata ? (
              <div className="flex flex-wrap items-center gap-3 text-sm text-kumo-subtle">
                {slots.metadata}
              </div>
            ) : null}
          </div>

          {slots.actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">{slots.actions}</div>
          ) : null}
        </div>
      </div>

      {slots.tabs ? (
        <div className="border-t border-kumo-line px-4 py-3 md:px-6 lg:px-8">{slots.tabs}</div>
      ) : null}

      {slots.bottom ? (
        <div className="border-t border-kumo-line px-4 py-3 md:px-6 lg:px-8">{slots.bottom}</div>
      ) : null}

      <div className="border-t border-kumo-line px-4 py-2 text-sm text-kumo-subtle md:px-6 lg:px-8">
        {isNavigating ? "Loading page..." : (slots.status ?? "Ready")}
      </div>
    </header>
  );
}
