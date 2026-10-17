"use client";

import Link from "next/link";
import { AssistantPanel } from "@/components/AssistantPanel";
import { Helplines } from "@/components/Helplines";
import { useLanguage } from "@/components/LanguageProvider";
import type { StringKey } from "@/lib/strings";

const TOOLS: { href: string; title: StringKey; desc: StringKey; icon: string }[] = [
  { href: "/earnings", title: "earnings.title", desc: "earnings.desc", icon: "₹" },
  { href: "/safety", title: "safety.title", desc: "safety.desc", icon: "🛡️" },
  { href: "/schemes", title: "schemes.title", desc: "schemes.desc", icon: "📜" },
  { href: "/documents", title: "documents.title", desc: "documents.desc", icon: "📄" },
  { href: "/grievance", title: "grievance.title", desc: "grievance.desc", icon: "✍️" },
];

export function HomeView() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-3xl bg-foreground px-6 py-10 text-background sm:px-10">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{t("app.name")}</h1>
        <p className="mt-3 max-w-2xl text-lg opacity-90">{t("app.tagline")}</p>
      </section>

      <section aria-labelledby="ask-title" className="card">
        <h2 id="ask-title" className="mb-4 text-2xl font-bold">
          {t("home.askTitle")}
        </h2>
        <AssistantPanel />
      </section>

      <section aria-labelledby="tools-title">
        <h2 id="tools-title" className="mb-4 text-2xl font-bold">
          {t("home.toolsTitle")}
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                className="flex h-full flex-col gap-2 rounded-2xl bg-surface-muted p-6 transition hover:bg-surface-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true" className="text-3xl">
                  {tool.icon}
                </span>
                <span className="text-xl font-bold">{t(tool.title)}</span>
                <span className="text-muted">{t(tool.desc)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Helplines />
    </div>
  );
}
