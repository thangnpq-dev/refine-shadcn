"use client";

import { Authenticated } from "@refinedev/core";
import { Layout as RefineLayout } from "@/components/layout";

export default function TrialTableLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Authenticated key="trial-table-layout">
      <RefineLayout>{children}</RefineLayout>
    </Authenticated>
  );
}
