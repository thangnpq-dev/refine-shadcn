'use client';

import { Loader2 } from 'lucide-react';

interface LoadingProps {
  text?: string;
  className?: string;
}

export default function Loading({ text = 'Loading...', className = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
