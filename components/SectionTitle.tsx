"use client";
import { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-800 mb-2">
      {children}
    </h3>
  );
}
