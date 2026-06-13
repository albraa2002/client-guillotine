"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/layout/scroll-area";
import { useAppStore } from "@/lib/store";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LangSwitcher } from "@/components/theme/LangSwitcher";
import {
  Skull, LayoutDashboard, Users, FileText, Settings, LogOut,
  ChevronLeft, ChevronRight, Users2, Zap,
} from "lucide-react";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", labelKey: "nav.dashboard" as const, icon: LayoutDashboard },
  { href: "/dashboard/clients", labelKey: "nav.clients" as const, icon: Users },
  { href: "/dashboard/reports", labelKey: "nav.reports" as const, icon: FileText },
  { href: "/dashboard/team", labelKey: "nav.team" as const, icon: Users2 },
  { href: "/dashboard/settings", labelKey: "nav.settings" as const, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <aside
      dir={isAr ? "rtl" : "ltr"}
      className={cn(
        "fixed top-0 z-40 h-screen bg-white/80 dark:bg-noir-900/80 backdrop-blur-xl transition-all duration-300 flex flex-col",
        isAr ? "right-0 border-l" : "left-0 border-r",
        "border-gray-200 dark:border-noir-800/50",
        sidebarOpen ? (isAr ? "w-64" : "w-64") : "w-16"
      )}
    >
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-gray-200 dark:border-noir-800/50",
        sidebarOpen ? (isAr ? "flex-row-reverse justify-between" : "justify-between") : "justify-center"
      )}>
        {sidebarOpen && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-guillotine-500/20 border border-guillotine-500/30 flex items-center justify-center">
              <Skull className="w-4 h-4 text-guillotine-400" />
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-noir-100 font-display truncate">
              {isAr ? "مقصلة" : "GUILLOTINE"}
            </span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-gray-400 dark:text-noir-400">
          {isAr ? (
            <ChevronRight className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
          ) : (
            <ChevronLeft className={cn("w-4 h-4 transition-transform", !sidebarOpen && "rotate-180")} />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className={cn("space-y-1", sidebarOpen ? "px-3" : "px-2")}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 rounded-lg transition-all duration-200",
                    sidebarOpen ? "px-3 py-2.5" : "justify-center p-2.5",
                    isActive
                      ? "bg-guillotine-500/10 text-guillotine-600 dark:text-guillotine-400 border border-guillotine-500/20"
                      : "text-gray-500 dark:text-noir-400 hover:text-gray-700 dark:hover:text-noir-200 hover:bg-gray-100 dark:hover:bg-noir-800/50"
                  )}
                >
                  <item.icon className="w-5 h-5 shrink-0" />
                  {sidebarOpen && <span className="text-sm font-medium">{t(item.labelKey)}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className={cn("mt-6", sidebarOpen ? "px-3" : "px-2")}>
          <div className={cn(
            "rounded-lg bg-gradient-to-b from-guillotine-500/10 to-transparent border border-guillotine-500/20 p-3",
            !sidebarOpen && "hidden"
          )}>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-3 h-3 text-amber-500" />
              <span className="text-xs font-semibold text-amber-600 dark:text-profit-warning uppercase tracking-wider">
                {isAr ? "الذكاء الاصطناعي" : "AI Ready"}
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-noir-400">
              {isAr ? "رؤى وتوصيات تنفيذية جاهزة" : "Executive insights and recommendations ready"}
            </p>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 dark:border-noir-800/50 p-3 space-y-2">
        <div className={cn("flex items-center gap-1", sidebarOpen ? "" : "flex-col")}>
          <ThemeToggle />
          <LangSwitcher />
        </div>
        <Button
          variant="ghost"
          className={cn(
            "text-gray-500 dark:text-noir-400 hover:text-red-600 dark:hover:text-profit-negative hover:bg-red-50 dark:hover:bg-profit-negative/10 w-full",
            !sidebarOpen && "w-auto"
          )}
          onClick={() => signOut({ callbackUrl: "/landing" })}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {sidebarOpen && <span className={cn("text-sm", isAr ? "mr-2" : "ml-2")}>{t("nav.signOut")}</span>}
        </Button>
      </div>
    </aside>
  );
}
