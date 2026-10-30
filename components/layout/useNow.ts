"use client";

import { useEffect, useState } from "react";

/** Current time, refreshed every `ms`. Null until mounted to avoid hydration mismatch. */
export function useNow(ms = 1000) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}
