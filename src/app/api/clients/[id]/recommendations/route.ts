import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateRecommendations, generateExecutiveInsights } from "@/lib/recommendations";
import type { VerdictType } from "@/lib/verdict";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const recommendations = generateRecommendations(
    {
      grossMargin: client.grossMargin || 0,
      toxicClientScore: client.toxicClientScore || 0,
      clientRiskScore: client.clientRiskScore || 0,
      retentionViability: client.retentionViability || 0,
      upsellProbability: client.upsellProbability || 0,
      teamDrainScore: client.teamDrainScore || 0,
      burnoutRisk: client.burnoutRisk || 0,
      scopeCreepIndex: client.scopeCreepIndex || 0,
      netProfit: client.netProfit || 0,
      monthlyRetainer: client.monthlyRetainer,
      realHourlyProfit: client.realHourlyProfit || 0,
      meetingToxicity: client.meetingToxicity || 0,
      paymentDelays: client.paymentDelays,
      numberOfRevisions: client.numberOfRevisions,
    },
    (client.verdict as VerdictType) || "KEEP"
  );

  const insights = generateExecutiveInsights(
    {
      grossMargin: client.grossMargin || 0,
      toxicClientScore: client.toxicClientScore || 0,
      clientRiskScore: client.clientRiskScore || 0,
      netProfit: client.netProfit || 0,
      teamDrainScore: client.teamDrainScore || 0,
    },
    client.name
  );

  return NextResponse.json({ recommendations, insights });
}
