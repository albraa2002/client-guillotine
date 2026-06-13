"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LangSwitcher } from "@/components/theme/LangSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Skull, Loader2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", organizationName: "" });
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || (isAr ? "فشل التسجيل" : "Registration failed"));
      setLoading(false);
      return;
    }

    router.push("/login?registered=true");
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:bg-noir-gradient flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-cyber-grid bg-[length:60px_60px] opacity-30 pointer-events-none hidden dark:block" />
      <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2">
        <ThemeToggle />
        <LangSwitcher />
      </div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-xl bg-guillotine-500/20 border border-guillotine-500/30 flex items-center justify-center">
              <Skull className="w-7 h-7 text-guillotine-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display text-gray-800 dark:text-noir-100">
            {isAr ? "انضم للمقصلة" : "Join the Guillotine"}
          </CardTitle>
          <CardDescription>
            {isAr ? "أنشئ حساب وكالتك" : "Create your agency account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-profit-negative/10 border border-red-200 dark:border-profit-negative/20 text-red-600 dark:text-profit-negative text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "الاسم" : "Your Name"}</label>
              <Input placeholder={isAr ? "محمد أحمد" : "John Doe"} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "اسم الوكالة" : "Agency Name"}</label>
              <Input placeholder={isAr ? "وكالتك" : "Your Agency"} value={form.organizationName} onChange={(e) => setForm({ ...form, organizationName: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "البريد الإلكتروني" : "Email"}</label>
              <Input type="email" placeholder="you@agency.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "كلمة المرور" : "Password"}</label>
              <Input type="password" placeholder={isAr ? "8 أحرف على الأقل" : "Min 8 characters"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
            </div>
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {isAr ? "إنشاء حساب" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6">
            <Separator />
            <div className="mt-4 text-center text-sm">
              <span className="text-gray-400 dark:text-noir-400">{isAr ? "لديك حساب بالفعل؟" : "Already have an account?"}</span>{" "}
              <Link href="/login" className="text-guillotine-500 hover:text-guillotine-400 transition-colors">
                {isAr ? "تسجيل الدخول" : "Sign in"}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
