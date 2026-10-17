"use client";

import type { StringKey } from "@/lib/strings";
import { useLanguage } from "./LanguageProvider";

export function PageIntro({ title, desc }: { title: StringKey; desc: StringKey }) {
  const { t } = useLanguage();
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t(title)}</h1>
      <p className="mt-2 text-lg text-muted">{t(desc)}</p>
    </div>
  );
}
