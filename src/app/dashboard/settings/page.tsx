"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  async function loadDemoData() {
    const res = await fetch("/api/demo", { method: "POST" });
    if (res.ok) {
      toast.success(isAr ? "تم تحميل البيانات التجريبية" : "Demo data loaded successfully");
      router.refresh();
    } else {
      toast.error(isAr ? "فشل تحميل البيانات التجريبية" : "Failed to load demo data");
    }
  }

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">{t("settings.title")}</h1>
        <p className="text-sm text-gray-500 dark:text-noir-400 mt-1">
          {isAr ? "إدارة حسابك ووكالتك" : "Manage your account and organization"}
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>{isAr ? "الوكالة" : "Organization"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "اسم الوكالة" : "Agency Name"}</label>
              <Input defaultValue={isAr ? "وكالتي" : "My Agency"} />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "المجال" : "Industry"}</label>
              <Input defaultValue={isAr ? "وكالة تسويق" : "Marketing Agency"} />
            </div>
          </div>
          <Button>{t("common.save")}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{isAr ? "البيانات التجريبية" : "Demo Data"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-noir-400">{t("settings.demoData")}</p>
          <Button variant="cyber" onClick={loadDemoData}>
            {isAr ? "تحميل البيانات التجريبية" : "Load Demo Data"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{isAr ? "منطقة الخطر" : "Danger Zone"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-noir-400 mb-4">{t("settings.dangerZone")}</p>
          <Button variant="destructive">{isAr ? "حذف جميع البيانات" : "Delete All Data"}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
