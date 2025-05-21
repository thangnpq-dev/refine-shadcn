"use client"

import * as React from "react"

export function ThemeProvider({
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased" {...props}>
      {children}
    </div>
  )
}
