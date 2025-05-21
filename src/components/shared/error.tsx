'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface ErrorProps {
  title?: string;
  description?: string;
  error?: Error;
  resetCallback?: () => void;
}

export default function Error({
  title = 'Something went wrong!',
  description = 'An error occurred',
  error,
  resetCallback,
}: ErrorProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="text-sm bg-muted p-3 rounded-md overflow-x-auto">
            <p className="font-mono">{error.message}</p>
          </div>
        )}
      </CardContent>
      {resetCallback && (
        <CardFooter>
          <Button onClick={resetCallback} variant="outline" className="w-full">
            Try again
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
