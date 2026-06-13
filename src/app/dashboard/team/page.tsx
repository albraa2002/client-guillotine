"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { Users, UserPlus, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const mockTeam = [
  { id: "1", name: "You", email: "you@agency.com", role: "OWNER", initials: "YO" },
  { id: "2", name: "Sarah Chen", email: "sarah@agency.com", role: "ADMIN", initials: "SC" },
  { id: "3", name: "Marcus Johnson", email: "marcus@agency.com", role: "MEMBER", initials: "MJ" },
];

export default function TeamPage() {
  const [showInvite, setShowInvite] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, lang } = useI18n();
  const isAr = lang === "ar";

  function copyInviteLink() {
    navigator.clipboard.writeText("https://app.clientguillotine.com/invite/abc123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(isAr ? "تم نسخ رابط الدعوة" : "Invite link copied");
  }

  return (
    <div className="space-y-6" dir={isAr ? "rtl" : "ltr"}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`flex items-center ${isAr ? "flex-row-reverse" : ""} justify-between`}>
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-800 dark:text-noir-100">{t("team.title")}</h1>
          <p className="text-sm text-gray-500 dark:text-noir-400 mt-1">
            {isAr ? "إدارة أعضاء فريق وكالتك" : "Manage your agency team members"}
          </p>
        </div>
        <Dialog open={showInvite} onOpenChange={setShowInvite}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" /> {t("team.invite")}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isAr ? "دعوة عضو فريق" : "Invite Team Member"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "البريد الإلكتروني" : "Email address"}</label>
                <Input placeholder="colleague@agency.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-500 dark:text-noir-400">{isAr ? "الدور" : "Role"}</label>
                <div className="flex gap-2">
                  {["MEMBER", "ADMIN", "VIEWER"].map((role) => (
                    <Button key={role} variant="outline" size="sm">{role}</Button>
                  ))}
                </div>
              </div>
              <Button className="w-full">{isAr ? "إرسال الدعوة" : "Send Invitation"}</Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-noir-800" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-noir-900 px-2 text-gray-400 dark:text-noir-400">{isAr ? "أو" : "or"}</span></div>
              </div>
              <Button variant="outline" className="w-full" onClick={copyInviteLink}>
                {copied ? <Check className="w-4 h-4 mr-2 text-profit-positive" /> : <Copy className="w-4 h-4 mr-2" />}
                {isAr ? "نسخ رابط الدعوة" : "Copy Invite Link"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-4 h-4 text-guillotine-400" />
            {t("team.members")} ({mockTeam.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTeam.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-noir-900/50 border border-gray-200 dark:border-noir-800">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-guillotine-500/20 text-guillotine-400 text-sm">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-noir-200">{member.name}</p>
                    <p className="text-xs text-gray-500 dark:text-noir-400">{member.email}</p>
                  </div>
                </div>
                <Badge variant={member.role === "OWNER" ? "cyber" : member.role === "ADMIN" ? "default" : "outline"}>
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
