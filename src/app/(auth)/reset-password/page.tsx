"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LangSwitcher } from "@/components/theme/LangSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Skull, Loader2, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setSent(true);
    setLoading(false);
  }

  return (
    <div dir={isAr ? "rtl" : "ltr"} className="w-full max-w-md">
      <div className="absolute top-4 ltr:right-4 rtl:left-4 flex items-center gap-2">
        <ThemeToggle />
        <LangSwitcher />
      </div>
      <Card>
        <CardHeader className="text-center space-y-3">
          <div className="flex justify-center mb-2">
            <div className="w-14 h-14 rounded-xl bg-guillotine-500/20 border border-guillotine-500/30 flex items-center justify-center">
              <Skull className="w-7 h-7 text-guillotine-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display text-gray-800 dark:text-noir-100">
            {isAr ? "إعادة تعيين كلمة المرور" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {sent
              ? isAr ? "تحقق من بريدك الإلكتروني لتعليمات إعادة التعيين" : "Check your email for reset instructions"
              : isAr ? "أدخل بريدك الإلكتروني لاستلام تعليمات إعادة التعيين" : "Enter your email to receive reset instructions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-500 dark:text-noir-400">
                {isAr ? "إذا كان هناك حساب بهذا البريد، ستتلقى تعليمات إعادة التعيين قريباً." : "If an account exists with that email, you'll receive reset instructions shortly."}
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" /> {isAr ? "العودة لتسجيل الدخول" : "Back to Sign In"}
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "البريد الإلكتروني" : "Email"}</label>
                <Input type="email" placeholder="you@agency.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                {isAr ? "إرسال تعليمات إعادة التعيين" : "Send Reset Instructions"}
              </Button>
              <div className="text-center">
                <Link href="/login" className="text-xs text-gray-400 dark:text-noir-400 hover:text-gray-500 dark:hover:text-noir-300 transition-colors">
                  ← {isAr ? "العودة لتسجيل الدخول" : "Back to sign in"}
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
