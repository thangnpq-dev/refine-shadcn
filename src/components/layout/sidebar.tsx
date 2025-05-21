'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, ListFilter, FilePenLine, Settings, User } from 'lucide-react';
import { ROUTES } from '@/constants';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Trials',
    href: ROUTES.TRIALS,
    icon: <ListFilter className="h-5 w-5" />,
  },
  {
    title: 'Categories',
    href: ROUTES.CATEGORIES,
    icon: <ListFilter className="h-5 w-5" />,
  },
  {
    title: 'Blog Posts',
    href: ROUTES.BLOG_POSTS,
    icon: <FilePenLine className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 w-64 hidden md:flex flex-col border-r bg-background h-screen">
      <div className="flex flex-col flex-grow p-4 overflow-auto">
        <div className="py-2">
          <div className="flex items-center px-3 py-2 mb-8 border-b pb-4">
            <User className="h-6 w-6 mr-2" />
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@example.com</p>
            </div>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  pathname === item.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
