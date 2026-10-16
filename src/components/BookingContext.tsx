"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { scrollToId } from "@/lib/scroll";

type BookingState = {
  service: string;
  notes: string;
  setService: (s: string) => void;
  setNotes: (n: string) => void;
  /** Pre-select a service (and optional notes) and take the visitor to the booking form. */
  request: (service?: string, notes?: string) => void;
};

const Ctx = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [service, setService] = useState("");
  const [notes, setNotes] = useState("");

  const request = useCallback((s?: string, n?: string) => {
    if (s) setService(s);
    if (n) setNotes(n);
    scrollToId("book", "#bk-name");
  }, []);

  const value = useMemo(
    () => ({ service, notes, setService, setNotes, request }),
    [service, notes, request]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}
