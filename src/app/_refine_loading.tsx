// Global loading component for Refine

'use client';

import { Loader2 } from 'lucide-react';

export default function RefineLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2 text-muted-foreground">Loading...</span>
    </div>
  );
}
