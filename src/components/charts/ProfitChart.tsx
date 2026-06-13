"use client";

import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface ProfitChartProps {
  data: { name: string; profit: number; margin: number }[];
}

export function ProfitChart({ data }: ProfitChartProps) {
  const isEmpty = !data || data.length === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <h3 className="section-title mb-1">Client Profitability</h3>
      <p className="text-xs text-gray-500 dark:text-noir-400 mb-6">Net profit per client (monthly)</p>
      {isEmpty ? (
        <div className="h-72 flex items-center justify-center">
          <p className="text-sm text-gray-400 dark:text-noir-500">No data available. Add clients to see profitability.</p>
        </div>
      ) : (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" className="dark:opacity-30" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 11 }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--tooltip-bg, #1a1a2e)",
                  border: "1px solid rgba(148, 56, 255, 0.3)",
                  borderRadius: "8px",
                  color: "var(--tooltip-color, #e2e2e6)",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, "Net Profit"]}
              />
              <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.profit >= 0 ? "#22c55e" : "#ef4444"} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
