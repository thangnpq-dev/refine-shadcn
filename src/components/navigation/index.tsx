"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout, useMenu } from "@refinedev/core";

// Shadcn UI components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Navigation() {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full py-2 px-4 border-b bg-background">
      <div className="flex items-center gap-2">
        {menuItems.map((item) => (
          <Button
            key={item.key}
            variant={selectedKey === item.key ? "default" : "ghost"}
            className={selectedKey === item.key ? "bg-primary text-primary-foreground" : ""}
            asChild
          >
            <Link href={item.route ?? "/"}>
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        onClick={() => logout()}
        className="ml-auto"
      >
        Logout
      </Button>
    </div>
  );
}
