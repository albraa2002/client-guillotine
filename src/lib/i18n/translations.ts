export type Lang = "en" | "ar";

export type TranslationKey =
  | "app.name"
  | "app.tagline"
  | "nav.dashboard"
  | "nav.clients"
  | "nav.reports"
  | "nav.team"
  | "nav.settings"
  | "nav.signOut"
  | "dashboard.title"
  | "dashboard.subtitle"
  | "dashboard.totalProfitability"
  | "dashboard.teamBurnRate"
  | "dashboard.toxicClients"
  | "dashboard.revenueLeakage"
  | "dashboard.profitMargins"
  | "dashboard.clientHealth"
  | "dashboard.operationalPressure"
  | "dashboard.timeDrain"
  | "dashboard.clientVerdicts"
  | "dashboard.live"
  | "client.add"
  | "client.search"
  | "client.name"
  | "client.company"
  | "client.retainer"
  | "client.netProfit"
  | "client.margin"
  | "client.toxicScore"
  | "client.verdict"
  | "client.terminate"
  | "client.reprice"
  | "client.keep"
  | "client.analysis"
  | "client.runAnalysis"
  | "client.delete"
  | "client.generateEmail"
  | "client.backToClients"
  | "client.financialKpis"
  | "client.riskAnalysis"
  | "client.operational"
  | "client.executiveInsights"
  | "client.hiddenCosts"
  | "client.recommendations"
  | "client.actionItems"
  | "client.metrics.retainer"
  | "client.metrics.netProfit"
  | "client.metrics.grossMargin"
  | "client.metrics.hourlyProfit"
  | "client.metrics.toxicScore"
  | "client.metrics.riskScore"
  | "client.metrics.teamDrain"
  | "client.metrics.burnoutRisk"
  | "client.metrics.retentionViability"
  | "client.metrics.upsellProbability"
  | "client.metrics.revisionBurden"
  | "client.metrics.meetingToxicity"
  | "client.metrics.scopeCreep"
  | "client.metrics.emotionalCost"
  | "client.metrics.hiddenOpsCost"
  | "client.metrics.revenueLeakage"
  | "client.metrics.futureLoss"
  | "report.title"
  | "report.exportPdf"
  | "team.title"
  | "team.invite"
  | "team.members"
  | "settings.title"
  | "settings.demoData"
  | "settings.dangerZone"
  | "landing.hero.title"
  | "landing.hero.subtitle"
  | "landing.hero.cta"
  | "landing.hero.demo"
  | "landing.pain.title"
  | "landing.pain.losses"
  | "landing.pain.burnout"
  | "landing.pain.leakage"
  | "landing.how.title"
  | "landing.pricing.title"
  | "landing.faq.title"
  | "landing.cta.title"
  | "common.loading"
  | "common.error"
  | "common.save"
  | "common.cancel"
  | "common.search"
  | "common.noResults"
  | "common.monthly"
  | "email.reprice"
  | "email.terminate"
  | "email.scope"
  | "email.warning"
  | "email.retainer"
  | "email.generate"
  | "theme.dark"
  | "theme.light"
  | "lang.en"
  | "lang.ar";

export type Translations = Record<TranslationKey, string>;

const en: Translations = {
  "app.name": "The Client Guillotine",
  "app.tagline": "Execute Unprofitable Clients",
  "nav.dashboard": "Dashboard",
  "nav.clients": "Clients",
  "nav.reports": "Reports",
  "nav.team": "Team",
  "nav.settings": "Settings",
  "nav.signOut": "Sign Out",
  "dashboard.title": "Executive Dashboard",
  "dashboard.subtitle": "Real-time agency profitability & client health analysis",
  "dashboard.totalProfitability": "Total Profitability",
  "dashboard.teamBurnRate": "Team Burn Rate",
  "dashboard.toxicClients": "Toxic Clients",
  "dashboard.revenueLeakage": "Revenue Leakage",
  "dashboard.profitMargins": "Avg Profit Margin",
  "dashboard.clientHealth": "Client Health",
  "dashboard.operationalPressure": "Operational Pressure",
  "dashboard.timeDrain": "Time Drain",
  "dashboard.clientVerdicts": "Client Verdicts",
  "dashboard.live": "LIVE",
  "client.add": "Add Client",
  "client.search": "Search clients...",
  "client.name": "Name",
  "client.company": "Company",
  "client.retainer": "Retainer",
  "client.netProfit": "Net Profit",
  "client.margin": "Margin",
  "client.toxicScore": "Toxic Score",
  "client.verdict": "Verdict",
  "client.terminate": "TERMINATE",
  "client.reprice": "REPRICE",
  "client.keep": "KEEP",
  "client.analysis": "Analysis",
  "client.runAnalysis": "Run Analysis",
  "client.delete": "Delete",
  "client.generateEmail": "Generate Email",
  "client.backToClients": "Back to Clients",
  "client.financialKpis": "Financial KPIs",
  "client.riskAnalysis": "Risk Analysis",
  "client.operational": "Operational",
  "client.executiveInsights": "Executive Insights",
  "client.hiddenCosts": "Hidden Costs",
  "client.recommendations": "AI Recommendations",
  "client.actionItems": "Action Items",
  "client.metrics.retainer": "Retainer",
  "client.metrics.netProfit": "Net Profit",
  "client.metrics.grossMargin": "Gross Margin",
  "client.metrics.hourlyProfit": "Hourly Profit",
  "client.metrics.toxicScore": "Toxic Score",
  "client.metrics.riskScore": "Client Risk Score",
  "client.metrics.teamDrain": "Team Drain Score",
  "client.metrics.burnoutRisk": "Burnout Risk",
  "client.metrics.retentionViability": "Retention Viability",
  "client.metrics.upsellProbability": "Upsell Probability",
  "client.metrics.revisionBurden": "Revision Burden",
  "client.metrics.meetingToxicity": "Meeting Toxicity",
  "client.metrics.scopeCreep": "Scope Creep Index",
  "client.metrics.emotionalCost": "Emotional Cost",
  "client.metrics.hiddenOpsCost": "Hidden Ops Cost",
  "client.metrics.revenueLeakage": "Revenue Leakage",
  "client.metrics.futureLoss": "Future Loss Prediction",
  "report.title": "Reports",
  "report.exportPdf": "Export PDF",
  "team.title": "Team",
  "team.invite": "Invite Member",
  "team.members": "Team Members",
  "settings.title": "Settings",
  "settings.demoData": "Load 10 realistic demo clients including profitable, toxic, and loss-making accounts to explore the full capabilities of the platform.",
  "settings.dangerZone": "Permanently delete all clients and data. This action cannot be undone.",
  "landing.hero.title": "Execute Unprofitable Clients. Ruthlessly.",
  "landing.hero.subtitle": "The first AI platform that reveals exactly which clients are draining your agency's profits, destroying your team's morale, and bleeding your resources.",
  "landing.hero.cta": "Start Free Trial",
  "landing.hero.demo": "View Live Demo",
  "landing.pain.title": "The Truth About Your Clients",
  "landing.pain.losses": "Hidden Losses",
  "landing.pain.burnout": "Team Burnout",
  "landing.pain.leakage": "Revenue Leakage",
  "landing.how.title": "Three Steps to Clean House",
  "landing.pricing.title": "Simple Pricing. Brutal Results.",
  "landing.faq.title": "Frequently Asked Questions",
  "landing.cta.title": "Stop Bleeding Profits. Start Executing.",
  "common.loading": "Loading...",
  "common.error": "Error",
  "common.save": "Save",
  "common.cancel": "Cancel",
  "common.search": "Search",
  "common.noResults": "No results found",
  "common.monthly": "Monthly",
  "email.reprice": "Reprice",
  "email.terminate": "Terminate",
  "email.scope": "Scope",
  "email.warning": "Warning",
  "email.retainer": "Retainer Increase",
  "email.generate": "Generate Email",
  "theme.dark": "Dark",
  "theme.light": "Light",
  "lang.en": "English",
  "lang.ar": "العربية",
};

const ar: Translations = {
  "app.name": "مقصلة العملاء",
  "app.tagline": "أعدم العملاء غير المربحين",
  "nav.dashboard": "لوحة التحكم",
  "nav.clients": "العملاء",
  "nav.reports": "التقارير",
  "nav.team": "الفريق",
  "nav.settings": "الإعدادات",
  "nav.signOut": "تسجيل الخروج",
  "dashboard.title": "لوحة التحكم التنفيذية",
  "dashboard.subtitle": "تحليل فوري لربحية الوكالة وصحة العملاء",
  "dashboard.totalProfitability": "إجمالي الربحية",
  "dashboard.teamBurnRate": "معدل استنزاف الفريق",
  "dashboard.toxicClients": "العملاء السامين",
  "dashboard.revenueLeakage": "تسرب الإيرادات",
  "dashboard.profitMargins": "متوسط هامش الربح",
  "dashboard.clientHealth": "صحة العملاء",
  "dashboard.operationalPressure": "الضغط التشغيلي",
  "dashboard.timeDrain": "استنزاف الوقت",
  "dashboard.clientVerdicts": "أحكام العملاء",
  "dashboard.live": "مباشر",
  "client.add": "إضافة عميل",
  "client.search": "ابحث عن عملاء...",
  "client.name": "الاسم",
  "client.company": "الشركة",
  "client.retainer": "الاشتراك",
  "client.netProfit": "صافي الربح",
  "client.margin": "الهامش",
  "client.toxicScore": "نسبة السمية",
  "client.verdict": "الحكم",
  "client.terminate": "إنهاء",
  "client.reprice": "إعادة تسعير",
  "client.keep": "احتفاظ",
  "client.analysis": "تحليل",
  "client.runAnalysis": "تشغيل التحليل",
  "client.delete": "حذف",
  "client.generateEmail": "توليد بريد إلكتروني",
  "client.backToClients": "العودة للعملاء",
  "client.financialKpis": "مؤشرات مالية",
  "client.riskAnalysis": "تحليل المخاطر",
  "client.operational": "تشغيلي",
  "client.executiveInsights": "رؤى تنفيذية",
  "client.hiddenCosts": "تكاليف خفية",
  "client.recommendations": "توصيات الذكاء الاصطناعي",
  "client.actionItems": "إجراءات مطلوبة",
  "client.metrics.retainer": "الاشتراك",
  "client.metrics.netProfit": "صافي الربح",
  "client.metrics.grossMargin": "هامش الربح الإجمالي",
  "client.metrics.hourlyProfit": "الربح لكل ساعة",
  "client.metrics.toxicScore": "نسبة السمية",
  "client.metrics.riskScore": "مخاطر العميل",
  "client.metrics.teamDrain": "استنزاف الفريق",
  "client.metrics.burnoutRisk": "مخاطر الاحتراق",
  "client.metrics.retentionViability": "قابلية الاحتفاظ",
  "client.metrics.upsellProbability": "احتمالية البيع الإضافي",
  "client.metrics.revisionBurden": "عبء المراجعات",
  "client.metrics.meetingToxicity": "سمية الاجتماعات",
  "client.metrics.scopeCreep": "مؤشر توسع النطاق",
  "client.metrics.emotionalCost": "التكلفة العاطفية",
  "client.metrics.hiddenOpsCost": "تكلفة تشغيلية خفية",
  "client.metrics.revenueLeakage": "تسرب الإيرادات",
  "client.metrics.futureLoss": "توقع الخسارة المستقبلية",
  "report.title": "التقارير",
  "report.exportPdf": "تصدير PDF",
  "team.title": "الفريق",
  "team.invite": "دعوة عضو",
  "team.members": "أعضاء الفريق",
  "settings.title": "الإعدادات",
  "settings.demoData": "حمّل 10 عملاء تجريبيين واقعيين يشملون عملاء مربحين وسامين وخاسرين لاستكشاف كامل إمكانيات المنصة.",
  "settings.dangerZone": "احذف جميع العملاء والبيانات بشكل دائم. هذا الإجراء لا يمكن التراجع عنه.",
  "landing.hero.title": "أعدم العملاء غير المربحين. بلا رحمة.",
  "landing.hero.subtitle": "أول منصة ذكاء اصطناعي تكشف بالضبط أي العملاء يستنزفون أرباح وكالتك، يدمرون معنويات فريقك، وينزفون مواردك.",
  "landing.hero.cta": "ابدأ النسخة المجانية",
  "landing.hero.demo": "عرض تجريبي مباشر",
  "landing.pain.title": "الحقيقة عن عملائك",
  "landing.pain.losses": "خسائر خفية",
  "landing.pain.burnout": "احتراق الفريق",
  "landing.pain.leakage": "تسرب الإيرادات",
  "landing.how.title": "ثلاث خطوات لتنظيف البيت",
  "landing.pricing.title": "تسعير بسيط. نتائج قاسية.",
  "landing.faq.title": "الأسئلة الشائعة",
  "landing.cta.title": "توقف عن نزيف الأرباح. ابدأ الإعدام.",
  "common.loading": "جار التحميل...",
  "common.error": "خطأ",
  "common.save": "حفظ",
  "common.cancel": "إلغاء",
  "common.search": "بحث",
  "common.noResults": "لا توجد نتائج",
  "common.monthly": "شهرياً",
  "email.reprice": "إعادة تسعير",
  "email.terminate": "إنهاء",
  "email.scope": "النطاق",
  "email.warning": "تحذير",
  "email.retainer": "زيادة الاشتراك",
  "email.generate": "توليد البريد الإلكتروني",
  "theme.dark": "داكن",
  "theme.light": "فاتح",
  "lang.en": "English",
  "lang.ar": "العربية",
};

export const translations = { en, ar };
