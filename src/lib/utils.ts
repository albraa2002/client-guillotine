import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  return `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`;
}

export function formatHours(hours: number): string {
  return `${hours.toFixed(1)}h`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function generateShareToken(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function calculateTrend(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function getVerdictColor(verdict: string): string {
  switch (verdict) {
    case "TERMINATE":
      return "text-profit-negative";
    case "REPRICE":
      return "text-profit-warning";
    case "KEEP":
      return "text-profit-positive";
    default:
      return "text-profit-neutral";
  }
}

export function getVerdictBg(verdict: string): string {
  switch (verdict) {
    case "TERMINATE":
      return "bg-verdict-terminate";
    case "REPRICE":
      return "bg-verdict-reprice";
    case "KEEP":
      return "bg-verdict-keep";
    default:
      return "bg-noir-700";
  }
}
