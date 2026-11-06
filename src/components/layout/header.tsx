"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { firm, navigation } from "@/data/firm";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    // Keep a sticky header from covering page titles after client navigation.
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab") {
        const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === toggle.current) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
      }
    }
    document.addEventListener("keydown", key);
    const media = window.matchMedia("(min-width: 960px)");
    const close = () => setOpen(false);
    media.addEventListener("change", close);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
      media.removeEventListener("change", close);
    };
  }, [open]);
  const active = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href ||
        pathname.startsWith(href + "/") ||
        (href === "/attorneys" &&
          !["/about", "/contact", "/privacy", "/practice", "/"].some(
            (p) =>
              pathname === p || (p !== "/" && pathname.startsWith(p + "/")),
          ));
  return (
    <header className={`site-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner wrap">
        <Link
          href="/"
          className="wordmark"
          aria-label="Lasser Hochman home"
          onClick={() => setOpen(false)}
        >
          <span>
            LASSER HOCHMAN<span className="brand-dot">.</span>
          </span>
          <small>ATTORNEYS AT LAW</small>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={active(n.href) ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          className="header-phone"
          href={`tel:${firm.telephone}`}
          aria-label={`Call Lasser Hochman at ${firm.phone}`}
        >
          <Phone size={14} strokeWidth={1.5} aria-hidden="true" />
          <span>{firm.phone}</span>
        </a>
        <ThemeToggle />
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={open ? "mobile-navigation" : undefined}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            ref={panel}
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: reduced ? 0 : -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {navigation.map((n, i) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                aria-current={active(n.href) ? "page" : undefined}
              >
                <small>0{i + 1}</small>
                {n.label}
              </Link>
            ))}
            <a href={`tel:${firm.telephone}`}>
              {firm.phone}
              <Phone size={20} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
