"use client";

import { Authenticated } from "@refinedev/core";
import { Layout as RefineLayout } from "@/components/layout";

export default function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Authenticated key="dashboard-layout">
      <RefineLayout>{children}</RefineLayout>
    </Authenticated>
  );
}
