"use client";

import { useEffect, useState } from "react";

/** Avoid SSR/no-JS flash of opacity:0 animated content. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
