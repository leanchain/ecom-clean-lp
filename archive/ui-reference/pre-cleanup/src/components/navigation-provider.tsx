"use client";

import type React from "react";

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
