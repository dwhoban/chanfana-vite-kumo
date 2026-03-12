import { createContext, useContext, type ReactNode } from "react";

export type GlobalPageHeaderSlots = {
  top?: ReactNode;
  breadcrumbs?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  metadata?: ReactNode;
  actions?: ReactNode;
  tabs?: ReactNode;
  bottom?: ReactNode;
  status?: ReactNode;
};

export type GlobalPageHeaderContextValue = {
  setPageHeaderSlots: (slots: GlobalPageHeaderSlots) => void;
  clearPageHeaderSlots: () => void;
};

export const GlobalPageHeaderContext = createContext<GlobalPageHeaderContextValue | null>(null);

export function useGlobalPageHeader() {
  const context = useContext(GlobalPageHeaderContext);

  if (!context) {
    throw new Error("useGlobalPageHeader must be used inside RootLayout.");
  }

  return context;
}
