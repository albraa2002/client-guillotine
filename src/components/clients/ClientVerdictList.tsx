"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { Skull, ArrowRight } from "lucide-react";
import Link from "next/link";

interface VerdictClient {
  id: string;
  name: string;
  company: string;
  verdict: string;
  netProfit: number;
  toxicClientScore: number;
  monthlyRetainer: number;
}

export function ClientVerdictList() {
  const [clients, setClients] = useState<VerdictClient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/clients?limit=5")
      .then((r) => r.json())
      .then((data) => {
        setClients(Array.isArray(data) ? data : data.clients || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-guillotine-400" />
          Client Verdicts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-noir-400 text-sm">No clients analyzed yet</p>
            <p className="text-xs text-gray-400 dark:text-noir-500 mt-1">Add a client to see their verdict</p>
          </div>
        ) : (
          <div className="space-y-2">
            {clients.map((client, i) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/dashboard/clients/${client.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-noir-800/50 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 dark:text-noir-200 truncate">{client.name}</p>
                    <p className="text-xs text-gray-500 dark:text-noir-400 truncate">{client.company || "No company"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-xs font-mono text-gray-500 dark:text-noir-400">{formatCurrency(client.monthlyRetainer)}</p>
                    </div>
                    <Badge
                      variant={
                        client.verdict === "TERMINATE" ? "terminate"
                        : client.verdict === "REPRICE" ? "reprice" : "keep"
                      }
                    >
                      {client.verdict === "TERMINATE" ? "TERMINATE"
                        : client.verdict === "REPRICE" ? "REPRICE" : "KEEP"}
                    </Badge>
                    <ArrowRight className="w-4 h-4 text-gray-400 dark:text-noir-500 group-hover:text-gray-500 dark:group-hover:text-noir-400 transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
