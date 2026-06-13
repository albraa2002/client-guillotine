"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { FileText, Download, Share2, Eye, BarChart3 } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
  const [reports] = useState<any[]>([]);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  async function exportPDF() {
    const { default: jsPDF } = await import("jspdf");
    await import("jspdf-autotable");
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("The Client Guillotine", 20, 20);
    doc.setFontSize(12);
    doc.text("Executive Summary Report", 20, 30);
    doc.text("Generated: " + new Date().toLocaleDateString(), 20, 38);
    doc.save("guillotine-report.pdf");
    toast.success(isAr ? "تم تصدير PDF" : "PDF exported");
  }

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center ${isAr ? "flex-row-reverse" : ""} justify-between`}>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">{t("report.title")}</h1>
          <p className="text-sm text-gray-500 dark:text-noir-400 mt-1">
            {isAr ? "تصدير ومشاركة التقارير التنفيذية" : "Export and share executive reports"}
          </p>
        </div>
        <Button onClick={exportPDF}>
          <Download className="w-4 h-4 mr-2" /> {t("report.exportPdf")}
        </Button>
      </motion.div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BarChart3 className="w-12 h-12 text-gray-300 dark:text-noir-700 mb-4" />
            <p className="text-gray-500 dark:text-noir-400 text-lg font-medium">
              {isAr ? "لا توجد تقارير بعد" : "No reports yet"}
            </p>
            <p className="text-gray-400 dark:text-noir-600 text-sm mt-1 max-w-md text-center">
              {isAr ? "يتم إنشاء التقارير تلقائياً عند تحليل عملائك. قم بتصدير ملخصات PDF أو مشاركتها مع فريقك." : "Reports are automatically generated when you analyze your clients. Export PDF summaries or share them with your team."}
            </p>
            <Button variant="outline" className="mt-6" onClick={exportPDF}>
              <FileText className="w-4 h-4 mr-2" /> {isAr ? "توليد تقرير تجريبي" : "Generate Sample Report"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report) => (
            <Card key={report.id} className="hover:border-guillotine-500/30 transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{report.title}</CardTitle>
                  <Badge variant="outline">{report.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Eye className="w-3 h-3 mr-1" /> View</Button>
                  <Button variant="outline" size="sm"><Share2 className="w-3 h-3 mr-1" /> Share</Button>
                  <Button variant="outline" size="sm"><Download className="w-3 h-3 mr-1" /> PDF</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
