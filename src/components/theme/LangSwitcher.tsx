"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Languages } from "lucide-react";

export function LangSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLang(lang === "en" ? "ar" : "en")}
      className="text-gray-400 dark:text-noir-400 hover:text-gray-600 dark:hover:text-noir-200 gap-1.5"
    >
      <Languages className="w-3.5 h-3.5" />
      <span className="text-xs font-medium">{lang === "en" ? "AR" : "EN"}</span>
    </Button>
  );
}
