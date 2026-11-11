"use client";

import { useEffect, useState } from "react";

/**
 * QA switch: `?motion=off` disables animations, parallax, Lenis and counters
 * so everything renders in its final state for screenshots / audits.
 */
export function useMotionOff() {
  const [off, setOff] = useState(false);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const disabled = params.get("motion") === "off";
      setOff(disabled);
      document.documentElement.dataset.motion = disabled ? "off" : "on";
    } catch {
      setOff(false);
    }
  }, []);

  return off;
}

export function isMotionOff(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).get("motion") === "off";
  } catch {
    return false;
  }
}
