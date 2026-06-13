"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
  accent?: "default" | "positive" | "negative" | "warning";
  delay?: number;
}

export function KpiCard({ label, value, subtitle, trend, trendValue, icon, accent = "default", delay = 0 }: KpiCardProps) {
  const accentColors = {
    default: "border-guillotine-500/20",
    positive: "border-profit-positive/20",
    negative: "border-profit-negative/20",
    warning: "border-profit-warning/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={cn("kpi-card border-l-4", accentColors[accent])}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="kpi-label">{label}</span>
        {icon && <div className="text-gray-400 dark:text-noir-400">{icon}</div>}
      </div>
      <div className="kpi-value mb-1">{value}</div>
      {subtitle && <p className="text-xs text-gray-400 dark:text-noir-400 mb-2">{subtitle}</p>}
      {trend && (
        <div className="flex items-center gap-1.5">
          {trend === "up" ? (
            <TrendingUp className="w-3.5 h-3.5 text-profit-positive" />
          ) : trend === "down" ? (
            <TrendingDown className="w-3.5 h-3.5 text-profit-negative" />
          ) : (
            <Minus className="w-3.5 h-3.5 text-gray-400 dark:text-noir-400" />
          )}
          {trendValue && (
            <span
              className={cn(
                "text-xs font-mono",
                trend === "up" && "text-profit-positive",
                trend === "down" && "text-profit-negative",
                trend === "neutral" && "text-gray-400 dark:text-noir-400"
              )}
            >
              {trendValue}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
