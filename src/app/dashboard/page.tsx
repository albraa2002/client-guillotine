"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { KpiCard } from "@/components/charts/KpiCard";
import { ProfitChart } from "@/components/charts/ProfitChart";
import { ClientVerdictList } from "@/components/clients/ClientVerdictList";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LangSwitcher } from "@/components/theme/LangSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { DashboardMetrics } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Skull, DollarSign, TrendingDown, Activity, Zap, Clock, AlertTriangle, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  useEffect(() => {
    fetch("/api/dashboard")
      .then((r) => r.json())
      .then((data) => {
        setMetrics(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl bg-gray-200 dark:bg-noir-900/50" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className={`flex items-center ${isAr ? "flex-row-reverse" : ""} justify-between`}>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">
            {isAr ? "لوحة التحكم التنفيذية" : "Executive Dashboard"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-noir-400 mt-1">
            {isAr ? "تحليل فوري لربحية الوكالة وصحة العملاء" : "Real-time agency profitability & client health analysis"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangSwitcher />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyber-teal/5 border border-cyan-500/20 dark:border-cyber-teal/20">
            <Activity className="w-3 h-3 text-cyan-600 dark:text-cyber-teal" />
            <span className="text-xs text-cyan-600 dark:text-cyber-teal font-mono">
              {isAr ? "مباشر" : "LIVE"}
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label={t("dashboard.totalProfitability")} value={formatCurrency(metrics?.totalProfitability || 0)}
          subtitle={isAr ? "صافي الربح الشهري" : "Monthly net profit"} icon={<DollarSign className="w-4 h-4" />}
          accent={(metrics?.totalProfitability || 0) >= 0 ? "positive" : "negative"} delay={0} />
        <KpiCard label={t("dashboard.teamBurnRate")} value={formatCurrency(metrics?.teamBurnRate || 0)}
          subtitle={isAr ? "التكلفة التشغيلية الشهرية للفريق" : "Monthly team cost"} accent="default" delay={0.1} />
        <KpiCard label={t("dashboard.toxicClients")} value={(metrics?.toxicClientsCount || 0).toString()}
          subtitle={`${isAr ? "من أصل" : "Out of"} ${metrics?.totalClients || 0} ${isAr ? "عميل" : "total clients"}`}
          icon={<AlertTriangle className="w-4 h-4" />} accent="negative" delay={0.2} />
        <KpiCard label={t("dashboard.revenueLeakage")} value={formatCurrency(metrics?.revenueLeakage || 0)}
          subtitle={isAr ? "إيرادات مفقودة" : "Lost revenue"} icon={<TrendingDown className="w-4 h-4" />}
          accent="warning" delay={0.3} />
        <KpiCard label={t("dashboard.profitMargins")} value={metrics?.profitMargins ? formatPercent(metrics.profitMargins) : "0%"}
          subtitle={isAr ? "متوسط جميع العملاء" : "Average across clients"}
          accent={(metrics?.profitMargins || 0) > 15 ? "positive" : (metrics?.profitMargins || 0) > 0 ? "warning" : "negative"} delay={0.4} />
        <KpiCard label={t("dashboard.clientHealth")} value={metrics?.averageClientHealth ? `${metrics.averageClientHealth.toFixed(0)}%` : "0%"}
          subtitle={isAr ? "متوسط درجة الصحة" : "Average health score"}
          accent={(metrics?.averageClientHealth || 0) > 60 ? "positive" : "negative"} icon={<Activity className="w-4 h-4" />} delay={0.5} />
        <KpiCard label={t("dashboard.operationalPressure")} value={metrics?.operationalPressure ? `${metrics.operationalPressure.toFixed(0)}%` : "0%"}
          subtitle={isAr ? "ضغط الفريق والموارد" : "Team & resource strain"} icon={<Zap className="w-4 h-4" />}
          accent={(metrics?.operationalPressure || 0) > 60 ? "negative" : (metrics?.operationalPressure || 0) > 30 ? "warning" : "positive"} delay={0.6} />
        <KpiCard label={t("dashboard.timeDrain")} value={metrics?.timeDrainAnalytics ? `${metrics.timeDrainAnalytics.toFixed(0)}h` : "0h"}
          subtitle={isAr ? "ساعات ضائعة" : "Hours lost"} icon={<Clock className="w-4 h-4" />}
          accent={(metrics?.timeDrainAnalytics || 0) > 50 ? "negative" : "positive"} delay={0.7} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ProfitChart data={[]} />
        </div>
        <div>
          <ClientVerdictList />
        </div>
      </div>
    </div>
  );
}
