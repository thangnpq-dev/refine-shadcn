"use client";

import { Authenticated } from "@refinedev/core";

export default function TrialTableLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Authenticated key="trial-table-layout">
      {children}
    </Authenticated>
  );
}
