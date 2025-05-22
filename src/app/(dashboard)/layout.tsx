"use client";

import { Authenticated } from "@refinedev/core";
import { Layout as RefineLayout } from "@/components/layout";
import { TokenValidator } from "@/components/auth/TokenValidator";

export default function DashboardLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <Authenticated key="dashboard-layout">
      <TokenValidator>
        <RefineLayout>{children}</RefineLayout>
      </TokenValidator>
    </Authenticated>
  );
}
