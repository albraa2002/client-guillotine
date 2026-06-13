"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LangSwitcher } from "@/components/theme/LangSwitcher";
import { useI18n } from "@/lib/i18n/I18nProvider";
import {
  Skull, TrendingDown, Users, DollarSign, Shield,
  Zap, ArrowRight, Check, ChevronRight, Star,
  BarChart3, Activity, BrainCircuit, FileText, Mail,
  Github, Twitter, Linkedin, Gauge, Target
} from "lucide-react";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  return (
    <div className={`min-h-screen bg-white dark:bg-noir-950 ${isAr ? "rtl" : ""}`} dir={isAr ? "rtl" : "ltr"}>
      <div className="fixed inset-0 bg-cyber-grid bg-[length:60px_60px] opacity-20 pointer-events-none hidden dark:block" />

      <nav className="relative z-10 border-b border-gray-200 dark:border-noir-800/50 backdrop-blur-xl bg-white/80 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-guillotine-500/20 border border-guillotine-500/30 flex items-center justify-center">
              <Skull className="w-4 h-4 text-guillotine-400" />
            </div>
            <span className="text-sm font-bold text-gray-800 dark:text-noir-100 font-display">
              {isAr ? "مقصلة العملاء" : "GUILLOTINE"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LangSwitcher />
            <Link href="/login">
              <Button variant="ghost">{isAr ? "تسجيل الدخول" : "Sign In"}</Button>
            </Link>
            <Link href="/register">
              <Button size="sm">{isAr ? "ابدأ الآن" : "Get Started"}</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="cyber" className="mb-6">
                <Zap className="w-3 h-3 mr-1" /> {isAr ? "ذكاء اصطناعي لتحليل العملاء" : "AI-Powered Client Intelligence"}
              </Badge>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              <span className="text-gray-800 dark:text-noir-100">{isAr ? "أعدم " : "Execute "}</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-guillotine-500 to-cyber-teal">
                {isAr ? "العملاء غير المربحين" : "Unprofitable"}
              </span>
              <br />
              <span className="text-gray-800 dark:text-noir-100">
                {isAr ? "بلا رحمة." : "Clients. Ruthlessly."}
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-noir-400 max-w-2xl mx-auto mb-8 leading-relaxed">
              {isAr
                ? "أول منصة ذكاء اصطناعي تكشف بالضبط أي العملاء يستنزفون أرباح وكالتك، يدمرون معنويات فريقك، وينزفون مواردك. لا مزيد من التخمين. لا مزيد من العملاء السامين."
                : "The first AI platform that reveals exactly which clients are draining your agency's profits, destroying your team's morale, and bleeding your resources. No more guesswork. No more toxic retainers."}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button size="xl" className="w-full sm:w-auto">
                  {isAr ? "ابدأ النسخة المجانية" : "Start Free Trial"} <ArrowRight className={`${isAr ? "mr-2" : "ml-2"} w-5 h-5`} />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  {isAr ? "عرض تجريبي" : "View Live Demo"}
                </Button>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 text-sm text-gray-400 dark:text-noir-400">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> {isAr ? "لا حاجة لبطاقة ائتمان" : "No credit card"}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> {isAr ? "نسخة تجريبية 14 يوم" : "14-day free trial"}</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-green-500" /> {isAr ? "إلغاء في أي وقت" : "Cancel anytime"}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 border-t border-gray-200 dark:border-noir-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-noir-100 mb-4">
              {isAr ? "الحقيقة عن عملائك" : "The Truth About Your Clients"}
            </h2>
            <p className="text-gray-500 dark:text-noir-400 max-w-xl mx-auto">
              {isAr ? "معظم الوكالات تخسر أموالاً على 30% من عملائها دون أن تدري." : "Most agencies lose money on 30% of their clients and don't even know it."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: TrendingDown, title: isAr ? "خسائر خفية" : "Hidden Losses", desc: isAr ? "عملاء يبدون مربحين لكنهم يكلفون أضعافاً في المراجعات والاجتماعات والجهد العاطفي." : "Clients that seem profitable but cost more in revisions, meetings, and emotional labor than they pay.", color: "text-red-500" },
              { icon: Users, title: isAr ? "احتراق الفريق" : "Team Burnout", desc: isAr ? "أفضل موظفيك يغرقون في حسابات منخفضة القيمة بينما يُهمل العملاء مرتفعو الربح." : "Your best people are drowning in low-value accounts while high-profit clients get neglected.", color: "text-amber-500" },
              { icon: DollarSign, title: isAr ? "تسرب الإيرادات" : "Revenue Leakage", desc: isAr ? "توسع النطاق وتأخير الدفع والفوضى التواصلية تأكل أرباحك شهرياً." : "Scope creep, payment delays, and communication chaos silently eroding your margins every month.", color: "text-guillotine-500" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="h-full hover:border-red-500/30 dark:hover:border-profit-negative/30 transition-all duration-300">
                  <CardContent className="p-8">
                    <item.icon className={`w-10 h-10 ${item.color} mb-4`} />
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-noir-200 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-noir-400 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 border-t border-gray-200 dark:border-noir-800/50 bg-gray-50 dark:bg-noir-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <Badge variant="cyber" className="mb-4">{isAr ? "الطريقة" : "The Process"}</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-noir-100 mb-4">
              {isAr ? "ثلاث خطوات لتنظيف البيت" : "Three Steps to Clean House"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: isAr ? "أضف عملاءك" : "Connect Your Clients", desc: isAr ? "أضف محفظة عملائك مع الاشتراكات والساعات وحجم الفريق والبيانات التشغيلية." : "Add your client portfolio with retainers, hours, team size, and operational data.", icon: BarChart3 },
              { step: "02", title: isAr ? "تحليل الذكاء الاصطناعي" : "AI Analysis Engine", desc: isAr ? "خوارزمياتنا تحسب الربحية الحقيقية واستنزاف الفريق ودرجات السمية والتكاليف الخفية." : "Our algorithm calculates true profitability, team drain, toxicity scores, and hidden costs.", icon: BrainCircuit },
              { step: "03", title: isAr ? "نفذ الأحكام" : "Execute Verdicts", desc: isAr ? "احصل على أحكام واضحة وقابلة للتنفيذ: إنهاء، إعادة تسعير، أو احتفاظ." : "Get clear, actionable verdicts: TERMINATE, REPRICE, or KEEP.", icon: Skull },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative">
                <div className="text-5xl font-display font-bold text-guillotine-500/20 mb-4">{item.step}</div>
                <item.icon className="w-8 h-8 text-guillotine-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-noir-200 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-noir-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 border-t border-gray-200 dark:border-noir-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 dark:text-noir-100 mb-4">
              {isAr ? "كل ما تحتاج لتنظيف البيت" : "Everything You Need to Clean House"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Gauge, title: isAr ? "لوحة التحكم" : "Executive Dashboard", desc: isAr ? "مؤشرات ربحية الوكالة وصحة العملاء لحظياً." : "Real-time agency profitability and client health KPIs." },
              { icon: Activity, title: isAr ? "تحليل العملاء" : "Client Analysis", desc: isAr ? "مقاييس متعمقة لكل علاقة عميل." : "Deep-dive metrics on every client relationship." },
              { icon: Skull, title: isAr ? "محرك الأحكام" : "Verdict Engine", desc: isAr ? "قرارات إنهاء / إعادة تسعير / احتفاظ واضحة." : "Clear TERMINATE / REPRICE / KEEP decisions." },
              { icon: BrainCircuit, title: isAr ? "توصيات ذكية" : "AI Recommendations", desc: isAr ? "اقتراحات للتسعير والنطاق والموارد." : "Smart suggestions for pricing, scope, and resources." },
              { icon: Mail, title: isAr ? "توليد الإيميلات" : "Email Generator", desc: isAr ? "إيميلات احترافية لإعادة التفاوض والإنهاء." : "Professional emails for renegotiation and termination." },
              { icon: FileText, title: isAr ? "تقارير PDF" : "PDF Reports", desc: isAr ? "تقارير تنفيذية جاهزة للمشاركة." : "Executive-ready reports for stakeholder communication." },
              { icon: Shield, title: isAr ? "تقدير المخاطر" : "Risk Scoring", desc: isAr ? "درجات سمية العملاء وتوقع خطر الاحتراق." : "Toxic client scores and burnout risk prediction." },
              { icon: Target, title: isAr ? "رؤى النمو" : "Growth Insights", desc: isAr ? "فرص البيع الإضافي واستراتيجيات الاحتفاظ." : "Upsell opportunities and retention strategies." },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="h-full hover:border-guillotine-500/30 transition-all duration-300">
                  <CardContent className="p-5">
                    <feature.icon className="w-6 h-6 text-guillotine-500 mb-3" />
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-noir-200 mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-noir-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 border-t border-gray-200 dark:border-noir-800/50 bg-gray-50 dark:bg-noir-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-noir-100 mb-4">
              {isAr ? "تسعير بسيط. نتائج قاسية." : "Simple Pricing. Brutal Results."}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: isAr ? "ستارتر" : "Starter", price: "$49", desc: isAr ? "للمستشارين والوكالات الصغيرة" : "For solo consultants and small shops", features: isAr ? ["حتى 10 عملاء", "تحليل أساسي", "توليد الإيميلات", "تقارير PDF"] : ["Up to 10 clients", "Basic analysis", "Email generator", "PDF reports"], popular: false },
              { name: isAr ? "وكالة" : "Agency", price: "$99", desc: isAr ? "للوكالات المتنامية" : "For growing agencies", features: isAr ? ["عملاء غير محدودين", "مقاييس متقدمة", "توصيات ذكاء اصطناعي", "فريق حتى 5 أفراد", "دعم أولوي"] : ["Unlimited clients", "Advanced metrics", "AI recommendations", "Team access (5 seats)", "Priority support"], popular: true },
              { name: "Enterprise", price: "$249", desc: isAr ? "للوكالات متعددة الفرق" : "For multi-team agencies", features: isAr ? ["كل مزايا Agency", "فريق غير محدود", "علامة تجارية مخصصة", "API", "مدير حساب مخصص"] : ["Everything in Agency", "Unlimited team seats", "Custom branding", "API access", "Dedicated account manager"], popular: false },
            ].map((plan, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="cyber">{isAr ? "الأكثر طلباً" : "Most Popular"}</Badge>
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-guillotine-500/40 shadow-lg shadow-guillotine-500/10' : ''}`}>
                  <CardContent className="p-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-noir-200 mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-noir-400 mb-4">{plan.desc}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold font-display text-gray-800 dark:text-noir-100">{plan.price}</span>
                      <span className="text-gray-400 dark:text-noir-400 text-sm">/month</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 text-sm text-gray-500 dark:text-noir-400">
                          <Check className="w-4 h-4 text-green-500 shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.popular ? "default" : "outline"} size="lg">
                      {isAr ? "ابدأ الآن" : "Get Started"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 border-t border-gray-200 dark:border-noir-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Badge variant="cyber" className="mb-6">{isAr ? "ابدأ اليوم" : "Get Started Today"}</Badge>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 dark:text-noir-100 mb-4 leading-tight">
              {isAr ? "توقف عن نزيف الأرباح. ابدأ الإعدام." : "Stop Bleeding Profits. Start Executing."}
            </h2>
            <p className="text-lg text-gray-500 dark:text-noir-400 mb-8 max-w-lg mx-auto">
              {isAr ? "انضم لمئات الوكالات التي تستخدم مقصلة العملاء لتحسين محفظة عملائها وحماية فريقها." : "Join hundreds of agencies using The Client Guillotine to optimize their client portfolio and protect their team."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <Input placeholder={isAr ? "أدخل بريدك الإلكتروني" : "Enter your email"} value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 h-12" />
              <Button size="lg" className="w-full sm:w-auto">
                {isAr ? "ابدأ النسخة المجانية" : "Start Free Trial"} <ArrowRight className={`${isAr ? "mr-2" : "ml-2"} w-4 h-4`} />
              </Button>
            </div>
            <p className="text-xs text-gray-400 dark:text-noir-500 mt-4">{isAr ? "لا حاجة لبطاقة ائتمان. نسخة تجريبية 14 يوم." : "No credit card required. 14-day free trial."}</p>
          </motion.div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-gray-200 dark:border-noir-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-guillotine-500/20 border border-guillotine-500/30 flex items-center justify-center">
                <Skull className="w-3 h-3 text-guillotine-400" />
              </div>
              <span className="text-xs font-bold text-gray-400 dark:text-noir-400 font-display">
                {isAr ? "مقصلة العملاء" : "THE CLIENT GUILLOTINE"}
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-xs text-gray-400 dark:text-noir-500 hover:text-gray-600 dark:hover:text-noir-400 transition-colors">
                {isAr ? "تسجيل الدخول" : "Sign In"}
              </Link>
              <Link href="/register" className="text-xs text-gray-400 dark:text-noir-500 hover:text-gray-600 dark:hover:text-noir-400 transition-colors">
                {isAr ? "تسجيل" : "Register"}
              </Link>
              <span className="text-xs text-gray-300 dark:text-noir-600">© 2026 Guillotine Labs</span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="w-8 h-8"><Twitter className="w-4 h-4 text-gray-400 dark:text-noir-500" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8"><Linkedin className="w-4 h-4 text-gray-400 dark:text-noir-500" /></Button>
              <Button variant="ghost" size="icon" className="w-8 h-8"><Github className="w-4 h-4 text-gray-400 dark:text-noir-500" /></Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
