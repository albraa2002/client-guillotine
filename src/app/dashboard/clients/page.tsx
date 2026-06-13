"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatPercent, cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClientForm } from "@/components/clients/ClientForm";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Plus, Search, Skull, Users, TrendingDown, Activity } from "lucide-react";

interface ClientItem {
  id: string;
  name: string;
  company: string;
  industry: string;
  monthlyRetainer: number;
  netProfit: number | null;
  grossMargin: number | null;
  toxicClientScore: number | null;
  verdict: string | null;
  status: string;
}

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  function loadClients() {
    setLoading(true);
    fetch("/api/clients")
      .then((r) => r.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  useEffect(() => { loadClients(); }, []);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.company || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center ${isAr ? "flex-row-reverse" : ""} justify-between`}>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">{t("nav.clients")}</h1>
          <p className="text-sm text-gray-500 dark:text-noir-400 mt-1">
            {isAr ? "تحليل وإدارة ربحية العملاء" : "Analyze and manage client profitability"}
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t("client.add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{isAr ? "تحليل عميل جديد" : "New Client Analysis"}</DialogTitle>
            </DialogHeader>
            <ClientForm onSuccess={() => { setShowAddDialog(false); loadClients(); }} />
          </DialogContent>
        </Dialog>
      </motion.div>

      <div className="relative">
        <Search className="absolute ltr:left-3 rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-noir-400" />
        <Input
          placeholder={t("client.search")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ltr:pl-10 rtl:pr-10 max-w-sm"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Users className="w-12 h-12 text-gray-300 dark:text-noir-600 mb-4" />
            <p className="text-gray-500 dark:text-noir-400 text-lg font-medium">
              {isAr ? "لا يوجد عملاء" : "No clients found"}
            </p>
            <p className="text-gray-400 dark:text-noir-500 text-sm mt-1">
              {search
                ? isAr ? "جرب كلمة بحث مختلفة" : "Try a different search term"
                : isAr ? "أضف عميلك الأول لبدء التحليل" : "Add your first client to start analyzing"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className="cursor-pointer hover:border-guillotine-500/30 transition-all duration-300"
                onClick={() => router.push(`/dashboard/clients/${client.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0">
                      <CardTitle className="text-base truncate text-gray-800 dark:text-noir-100">{client.name}</CardTitle>
                      <p className="text-xs text-gray-500 dark:text-noir-400 truncate">{client.company || "—"}</p>
                    </div>
                    {client.verdict && (
                      <Badge
                        variant={
                          client.verdict === "TERMINATE"
                            ? "terminate"
                            : client.verdict === "REPRICE"
                            ? "reprice"
                            : "keep"
                        }
                        className="shrink-0"
                      >
                        {client.verdict}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-noir-400">{t("client.retainer")}</span>
                      <span className="text-gray-800 dark:text-noir-200 font-mono">{formatCurrency(client.monthlyRetainer)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-noir-400">{t("client.netProfit")}</span>
                      <span className={cn("font-mono", (client.netProfit || 0) >= 0 ? "text-profit-positive" : "text-profit-negative")}>
                        {client.netProfit !== null ? formatCurrency(client.netProfit) : "—"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-noir-400">{t("client.margin")}</span>
                      <span className={cn("font-mono", (client.grossMargin || 0) >= 15 ? "text-profit-positive" : (client.grossMargin || 0) >= 0 ? "text-profit-warning" : "text-profit-negative")}>
                        {client.grossMargin !== null ? formatPercent(client.grossMargin) : "—"}
                      </span>
                    </div>
                    {client.toxicClientScore !== null && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-noir-400">{t("client.toxicScore")}</span>
                        <span className={cn("font-mono", client.toxicClientScore > 60 ? "text-profit-negative" : client.toxicClientScore > 30 ? "text-profit-warning" : "text-profit-positive")}>
                          {client.toxicClientScore.toFixed(0)}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
