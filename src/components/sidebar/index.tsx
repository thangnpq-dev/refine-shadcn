"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout, useMenu } from "@refinedev/core";
import { cn } from "@/lib/utils";

// Icons
import { 
  LayoutDashboard, 
  Phone, 
  Calendar, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Shadcn UI components
import { Button } from "@/components/ui/button";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { mutate: logout } = useLogout();
  const { menuItems, selectedKey } = useMenu();
  const pathname = usePathname();

  // Map menu items to icons
  const getIcon = (key: string) => {
    switch (key) {
      case "dashboard":
        return <LayoutDashboard className="w-5 h-5" />;
      case "trials":
        return <Phone className="w-5 h-5" />;
      case "categories":
        return <Calendar className="w-5 h-5" />;
      case "blog-posts":
        return <Settings className="w-5 h-5" />;
      default:
        return <LayoutDashboard className="w-5 h-5" />;
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-screen bg-background border-r transition-all duration-300 fixed top-0 left-0",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <div className="font-semibold text-lg">Agent Portal</div>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Menu Items - Scrollable */}
      <div className="flex-1 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link 
            key={item.key} 
            href={item.route ?? "/"}
            className="block"
          >
            <div className={cn(
              "flex items-center px-4 py-2 hover:bg-accent/50 transition-colors",
              selectedKey === item.key ? "bg-accent text-accent-foreground" : "",
              collapsed ? "justify-center" : "justify-start"
            )}>
              <div className="flex items-center">
                {getIcon(item.key)}
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout Button - Fixed */}
      <div className="p-4 border-t mt-auto">
        <Button 
          variant="ghost" 
          onClick={() => logout()}
          className={cn(
            "w-full flex items-center", 
            collapsed ? "justify-center" : "justify-start"
          )}
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
}
