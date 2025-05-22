"use client";

import type { PropsWithChildren } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Navigation } from "../navigation";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-1 container py-4 max-w-[100%]">
        <Breadcrumb />
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};
