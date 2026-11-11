"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { events } from "@/lib/analytics";
import type { Concern } from "@/lib/content/concerns";

type BookingState = {
  open: boolean;
  treatmentId?: string;
  message?: string;
  concerns?: Concern[];
  mode: "intake" | "full";
};

type BookingContextValue = {
  state: BookingState;
  openBooking: (opts?: {
    treatmentId?: string;
    message?: string;
    concerns?: Concern[];
    mode?: "intake" | "full";
    source?: string;
  }) => void;
  closeBooking: () => void;
  setMode: (mode: "intake" | "full") => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<BookingState>({ open: false, mode: "intake" });

  const openBooking = useCallback(
    (opts?: {
      treatmentId?: string;
      message?: string;
      concerns?: Concern[];
      mode?: "intake" | "full";
      source?: string;
    }) => {
      events.bookingOpen(opts?.source);
      setState({
        open: true,
        treatmentId: opts?.treatmentId,
        message: opts?.message,
        concerns: opts?.concerns,
        mode: opts?.mode ?? "intake",
      });
    },
    [],
  );

  const closeBooking = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const setMode = useCallback((mode: "intake" | "full") => {
    setState((s) => ({ ...s, mode }));
  }, []);

  const value = useMemo(
    () => ({ state, openBooking, closeBooking, setMode }),
    [state, openBooking, closeBooking, setMode],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
