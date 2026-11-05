import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
export function TextLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link href={href} className={`text-link${light ? " light" : ""}`}>
      {children}
      <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link href={href} className={`button${secondary ? " secondary" : ""}`}>
      {children}
      <ArrowRight size={17} strokeWidth={1.5} aria-hidden="true" />
    </Link>
  );
}
