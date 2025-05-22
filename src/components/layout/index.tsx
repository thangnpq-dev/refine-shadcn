"use client";

import { useState } from "react";
import type { PropsWithChildren } from "react";
import { Sidebar } from "../sidebar";
import { cn } from "@/lib/utils";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <div className="min-h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={cn(
        "ml-64 transition-all duration-300 min-h-screen",
        collapsed && "ml-16"
      )}>
        <div className="p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
