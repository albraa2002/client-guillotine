"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { formatCurrency, formatPercent, cn, getVerdictColor } from "@/lib/utils";
import {
  ArrowLeft, Skull, TrendingUp, TrendingDown, DollarSign, Clock, Users,
  AlertTriangle, AlertCircle, FileText, Mail, Zap, Activity, RefreshCw,
  Target, BarChart3, BrainCircuit, Gauge, Flame, Shield, Lightbulb,
} from "lucide-react";
import { toast } from "sonner";

interface MetricBarProps {
  label: string;
  value: number;
  max?: number;
  color?: string;
  suffix?: string;
  inverse?: boolean;
}

function MetricBar({ label, value, max = 100, color, suffix = "%", inverse }: MetricBarProps) {
  const displayValue = Math.min(Math.abs(value), max);
  const barColor = color || (inverse
    ? value > 60 ? "#ef4444" : value > 30 ? "#f59e0b" : "#22c55e"
    : value > 60 ? "#22c55e" : value > 30 ? "#f59e0b" : "#ef4444");

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500 dark:text-noir-400">{label}</span>
        <span className="text-gray-700 dark:text-noir-200 font-mono">{value.toFixed(1)}{suffix}</span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-noir-800 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${displayValue}%`, background: barColor }} />
      </div>
    </div>
  );
}

export default function ClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  async function loadClient() {
    try {
      const res = await fetch(`/api/clients/${params.id}`);
      if (!res.ok) { router.push("/dashboard/clients"); return; }
      const data = await res.json();
      setClient(data);
    } catch (e) {
      router.push("/dashboard/clients");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadClient(); }, [params.id]);

  async function runAnalysis() {
    setAnalyzing(true);
    try {
      const res = await fetch(`/api/clients/${params.id}/verdict`, { method: "POST" });
      const data = await res.json();
      setClient({ ...client, ...data });
      toast.success(isAr ? "اكتمل التحليل" : "Analysis complete");
    } catch (e) {
      toast.error(isAr ? "فشل التحليل" : "Analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

  async function deleteClient() {
    try {
      await fetch(`/api/clients/${params.id}`, { method: "DELETE" });
      toast.success(isAr ? "تم حذف العميل" : "Client deleted");
      router.push("/dashboard/clients");
    } catch (e) {
      toast.error(isAr ? "فشل الحذف" : "Failed to delete");
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  if (!client) return null;

  const metrics = client.metrics || {};
  const verdict = client.verdictData;
  const recommendations = client.recommendations || [];
  const insights = client.insights || [];

  return (
    <div className="space-y-8" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className={`w-4 h-4 ${isAr ? "ml-2" : "mr-2"}`} /> {t("client.backToClients")}
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <div className={`flex items-center gap-3 mb-1 ${isAr ? "flex-row-reverse" : ""}`}>
              <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">{client.name}</h1>
              {verdict && (
                <Badge variant={verdict.type === "TERMINATE" ? "terminate" : verdict.type === "REPRICE" ? "reprice" : "keep"}>
                  {verdict.type}
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-noir-400">
              {client.company || "—"} {client.industry ? `• ${client.industry}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowEmailDialog(true)}>
              <Mail className="w-4 h-4 mr-2" /> {t("client.generateEmail")}
            </Button>
            <Button variant="cyber" size="sm" onClick={runAnalysis} disabled={analyzing}>
              <RefreshCw className={cn("w-4 h-4 mr-2", analyzing && "animate-spin")} />
              {analyzing ? (isAr ? "جار التحليل..." : "Analyzing...") : t("client.runAnalysis")}
            </Button>
            <Button variant="destructive" size="sm" onClick={deleteClient} className="ml-2">
              <Skull className="w-4 h-4 mr-2" /> {t("client.delete")}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: t("client.metrics.retainer"), value: formatCurrency(client.monthlyRetainer), icon: DollarSign, color: "text-profit-positive", border: "border-profit-positive/40", delay: 0.1 },
          { label: t("client.metrics.netProfit"), value: metrics.netProfit !== undefined ? formatCurrency(metrics.netProfit) : "—", icon: TrendingUp, color: (metrics.netProfit || 0) >= 0 ? "text-profit-positive" : "text-profit-negative", border: "border-guillotine-500/40", delay: 0.15 },
          { label: t("client.metrics.grossMargin"), value: metrics.grossMargin !== undefined ? formatPercent(metrics.grossMargin) : "—", icon: BarChart3, color: (metrics.grossMargin || 0) >= 15 ? "text-profit-positive" : (metrics.grossMargin || 0) >= 0 ? "text-profit-warning" : "text-profit-negative", border: "border-profit-warning/40", delay: 0.2 },
          { label: t("client.metrics.hourlyProfit"), value: metrics.realHourlyProfit !== undefined ? formatCurrency(metrics.realHourlyProfit) : "—", icon: Clock, color: (metrics.realHourlyProfit || 0) >= 0 ? "text-profit-positive" : "text-profit-negative", border: "border-cyber-teal/40", delay: 0.25 },
        ].map((kpi, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: kpi.delay }}
            className={`kpi-card border-l-4 ${kpi.border}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="kpi-label">{kpi.label}</span>
              <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
            </div>
            <div className={`kpi-value ${kpi.color}`}>{kpi.value}</div>
            <p className="text-xs text-gray-500 dark:text-noir-400 mt-1">{t("common.monthly")}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {verdict && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <Card className={cn("border-2 overflow-hidden",
                verdict.type === "TERMINATE" ? "border-red-300 dark:border-profit-negative/30" :
                verdict.type === "REPRICE" ? "border-amber-300 dark:border-profit-warning/30" :
                "border-emerald-300 dark:border-profit-positive/30"
              )}>
                <div className={cn("px-6 py-3 flex items-center gap-2",
                  verdict.type === "TERMINATE" ? "bg-red-50 dark:bg-profit-negative/10" :
                  verdict.type === "REPRICE" ? "bg-amber-50 dark:bg-profit-warning/10" :
                  "bg-emerald-50 dark:bg-profit-positive/10"
                )}>
                  {verdict.type === "TERMINATE" ? <Skull className="w-5 h-5 text-profit-negative" /> :
                   verdict.type === "REPRICE" ? <AlertTriangle className="w-5 h-5 text-profit-warning" /> :
                   <Shield className="w-5 h-5 text-profit-positive" />}
                  <h3 className="font-bold font-display text-sm uppercase tracking-widest">{verdict.title}</h3>
                </div>
                <CardContent className="pt-6">
                  <p className="text-gray-700 dark:text-noir-200 leading-relaxed mb-4">{verdict.description}</p>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-noir-900/50 border border-gray-200 dark:border-noir-800 mb-4">
                    <p className="text-sm text-gray-600 dark:text-noir-300 leading-relaxed">{verdict.reason}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-noir-300 mb-3 uppercase tracking-wider">{t("client.actionItems")}</h4>
                    <ul className="space-y-2">
                      {verdict.actionItems.map((item: string, i: number) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-noir-400">
                          <span className={cn("mt-1 w-1.5 h-1.5 rounded-full shrink-0",
                            verdict.type === "TERMINATE" ? "bg-profit-negative" :
                            verdict.type === "REPRICE" ? "bg-profit-warning" : "bg-profit-positive"
                          )} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {recommendations.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-guillotine-400" />
                    {t("client.recommendations")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recommendations.map((rec: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-50 dark:bg-noir-900/50 border border-gray-200 dark:border-noir-800">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-profit-warning" />
                          <span className="text-sm font-semibold text-gray-800 dark:text-noir-200">{rec.title}</span>
                        </div>
                        <Badge variant={rec.priority === "high" ? "terminate" : rec.priority === "medium" ? "reprice" : "keep"}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-noir-400 mb-2">{rec.description}</p>
                      <div className="flex items-center gap-2">
                        <Zap className="w-3 h-3 text-cyber-teal" />
                        <span className="text-xs text-cyber-teal">{rec.impact}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-noir-400 mt-1">→ {rec.action}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-guillotine-400" />
                  {t("client.riskAnalysis")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricBar label={t("client.metrics.toxicScore")} value={metrics.toxicClientScore || 0} inverse color="#ef4444" />
                <MetricBar label={t("client.metrics.riskScore")} value={metrics.clientRiskScore || 0} inverse />
                <MetricBar label={t("client.metrics.teamDrain")} value={metrics.teamDrainScore || 0} inverse />
                <MetricBar label={t("client.metrics.burnoutRisk")} value={metrics.burnoutRisk || 0} inverse />
                <Separator />
                <MetricBar label={t("client.metrics.retentionViability")} value={metrics.retentionViability || 0} />
                <MetricBar label={t("client.metrics.upsellProbability")} value={metrics.upsellProbability || 0} />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-guillotine-400" />
                  {t("client.operational")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MetricBar label={t("client.metrics.revisionBurden")} value={metrics.revisionBurden || 0} inverse />
                <MetricBar label={t("client.metrics.meetingToxicity")} value={metrics.meetingToxicity || 0} inverse />
                <MetricBar label={t("client.metrics.scopeCreep")} value={metrics.scopeCreepIndex || 0} inverse />
                <MetricBar label={t("client.metrics.emotionalCost")} value={metrics.emotionalCost || 0} inverse />
              </CardContent>
            </Card>
          </motion.div>

          {insights.length > 0 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="w-4 h-4 text-guillotine-400" />
                    {t("client.executiveInsights")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {insights.map((insight: any, i: number) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-noir-900/50 border border-gray-200 dark:border-noir-800">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500 dark:text-noir-400 uppercase tracking-wider">{insight.title}</span>
                        <span className={cn("text-xs font-bold font-mono",
                          insight.trend === "up" ? "text-profit-positive" :
                          insight.trend === "down" ? "text-profit-negative" : "text-gray-400 dark:text-noir-400"
                        )}>{insight.value}</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-noir-400">{insight.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-profit-warning" />
                  {t("client.hiddenCosts")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="data-row">
                  <span className="text-gray-500 dark:text-noir-400">{t("client.metrics.hiddenOpsCost")}</span>
                  <span className="font-mono text-profit-negative text-sm">
                    {metrics.hiddenOperationalCost !== undefined ? formatCurrency(metrics.hiddenOperationalCost) : "—"}
                  </span>
                </div>
                <div className="data-row">
                  <span className="text-gray-500 dark:text-noir-400">{t("client.metrics.revenueLeakage")}</span>
                  <span className="font-mono text-profit-warning text-sm">
                    {metrics.revenueLeakage !== undefined ? formatCurrency(metrics.revenueLeakage) : "—"}
                  </span>
                </div>
                <div className="data-row">
                  <span className="text-gray-500 dark:text-noir-400">{t("client.metrics.futureLoss")}</span>
                  <span className="font-mono text-profit-negative text-sm">
                    {metrics.futureLossPrediction !== undefined ? formatCurrency(metrics.futureLossPrediction) : "—"}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{isAr ? "توليد بريد إلكتروني" : "Generate Email"}</DialogTitle>
          </DialogHeader>
          <EmailGenerator client={client} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmailGenerator({ client }: { client: any }) {
  const [emailType, setEmailType] = useState("reprice");
  const [generated, setGenerated] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    try {
      const res = await fetch(`/api/clients/${client.id}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: emailType }),
      });
      const data = await res.json();
      setGenerated(data);
    } catch (e) {
      toast.error("Failed to generate email");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {["reprice", "terminate", "scope", "warning", "retainer"].map((type) => (
          <Button key={type} variant={emailType === type ? "default" : "outline"} size="sm" onClick={() => setEmailType(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>
      <Button onClick={generate} disabled={loading} className="w-full">
        <Mail className="w-4 h-4 mr-2" />
        {loading ? "Generating..." : "Generate Email"}
      </Button>
      {generated && (
        <div className="p-4 rounded-lg bg-gray-50 dark:bg-noir-900/50 border border-gray-200 dark:border-noir-800 space-y-2">
          <div className="flex items-center gap-2 text-cyber-teal">
            <Zap className="w-4 h-4" />
            <span className="text-xs font-mono">{generated.subject}</span>
          </div>
          <p className="text-sm text-gray-700 dark:text-noir-300 whitespace-pre-wrap">{generated.body}</p>
        </div>
      )}
    </div>
  );
}
