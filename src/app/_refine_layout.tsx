'use client';

import { ReactNode } from 'react';
import { RefineProvider } from '@refinedev/core';
import { authProvider } from './(_refine)/auth-provider';
import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';

interface RefineLayoutProps {
  children: ReactNode;
}

export default function RefineLayout({ children }: RefineLayoutProps) {
  return (
    <RefineProvider authProvider={authProvider}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 p-6 md:ml-64">
            {children}
          </main>
        </div>
      </div>
    </RefineProvider>
  );
}
