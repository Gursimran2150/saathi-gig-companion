"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { StringKey } from "@/lib/strings";
import { LanguageSelect } from "./LanguageSelect";
import { useLanguage } from "./LanguageProvider";

export const NAV_ITEMS: { href: string; key: StringKey; icon: string }[] = [
  { href: "/", key: "nav.home", icon: "🏠" },
  { href: "/earnings", key: "nav.earnings", icon: "₹" },
  { href: "/safety", key: "nav.safety", icon: "🛡️" },
  { href: "/schemes", key: "nav.schemes", icon: "📜" },
  { href: "/documents", key: "nav.documents", icon: "📄" },
  { href: "/grievance", key: "nav.grievance", icon: "✍️" },
];

export function SiteHeader() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          {t("app.name")}
        </Link>
        <LanguageSelect />
      </div>
      <nav aria-label="Main" className="mx-auto max-w-5xl overflow-x-auto px-4 pb-3">
        <ul className="flex gap-2">
          {NAV_ITEMS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="inline-flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-medium hover:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent aria-[current=page]:bg-foreground aria-[current=page]:text-background"
                >
                  <span aria-hidden="true">{item.icon}</span>
                  {t(item.key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
