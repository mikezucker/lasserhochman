"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { firm } from "@/data/firm";
import { directionsUrl } from "@/lib/directions.mjs";

const subscribe = () => () => {};
const serverUrl = () => firm.directions;
const deviceUrl = () =>
  directionsUrl(firm.directions, navigator.userAgent, navigator.maxTouchPoints);

export function DirectionsLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const href = useSyncExternalStore(subscribe, deviceUrl, serverUrl);
  const web = href === firm.directions;
  return (
    <a
      className={className}
      href={href}
      target={web ? "_blank" : undefined}
      rel={web ? "noreferrer" : undefined}
    >
      {children}
      {web && <span className="sr-only"> (opens a new tab)</span>}
    </a>
  );
}
