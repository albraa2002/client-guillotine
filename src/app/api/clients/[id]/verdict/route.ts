import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateMetrics } from "@/lib/calculations";
import { generateVerdict } from "@/lib/verdict";
import { generateRecommendations, generateExecutiveInsights } from "@/lib/recommendations";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const input = {
    monthlyRetainer: client.monthlyRetainer,
    estimatedMonthlyHours: client.estimatedMonthlyHours,
    averageEmployeeHourCost: client.averageEmployeeHourCost,
    numberOfEmployees: client.numberOfEmployees,
    numberOfRevisions: client.numberOfRevisions,
    numberOfMeetings: client.numberOfMeetings,
    teamStressLevel: client.teamStressLevel,
    urgencyLevel: client.urgencyLevel,
    communicationChaos: client.communicationChaos,
    scopeCreepFrequency: client.scopeCreepFrequency,
    paymentDelays: client.paymentDelays,
  };

  const metrics = calculateMetrics(input);

  const verdictInput = {
    netProfit: metrics.netProfit,
    grossMargin: metrics.grossMargin,
    toxicClientScore: metrics.toxicClientScore,
    clientRiskScore: metrics.clientRiskScore,
    teamDrainScore: metrics.teamDrainScore,
    burnoutRisk: metrics.burnoutRisk,
    retentionViability: metrics.retentionViability,
    monthlyRetainer: input.monthlyRetainer,
    paymentDelays: input.paymentDelays,
    scopeCreepIndex: metrics.scopeCreepIndex,
    upsellProbability: metrics.upsellProbability,
  };

  const verdict = generateVerdict(verdictInput);
  const recommendations = generateRecommendations(
    {
      grossMargin: metrics.grossMargin,
      toxicClientScore: metrics.toxicClientScore,
      clientRiskScore: metrics.clientRiskScore,
      retentionViability: metrics.retentionViability,
      upsellProbability: metrics.upsellProbability,
      teamDrainScore: metrics.teamDrainScore,
      burnoutRisk: metrics.burnoutRisk,
      scopeCreepIndex: metrics.scopeCreepIndex,
      netProfit: metrics.netProfit,
      monthlyRetainer: input.monthlyRetainer,
      realHourlyProfit: metrics.realHourlyProfit,
      meetingToxicity: metrics.meetingToxicity,
      paymentDelays: input.paymentDelays,
      numberOfRevisions: input.numberOfRevisions,
    },
    verdict.type
  );
  const insights = generateExecutiveInsights(
    {
      grossMargin: metrics.grossMargin,
      toxicClientScore: metrics.toxicClientScore,
      clientRiskScore: metrics.clientRiskScore,
      netProfit: metrics.netProfit,
      teamDrainScore: metrics.teamDrainScore,
    },
    client.name
  );

  await prisma.client.update({
    where: { id },
    data: {
      netProfit: metrics.netProfit,
      grossMargin: metrics.grossMargin,
      realHourlyProfit: metrics.realHourlyProfit,
      revenueLeakage: metrics.revenueLeakage,
      hiddenOperationalCost: metrics.hiddenOperationalCost,
      teamDrainScore: metrics.teamDrainScore,
      revisionBurden: metrics.revisionBurden,
      meetingToxicity: metrics.meetingToxicity,
      scopeCreepIndex: metrics.scopeCreepIndex,
      emotionalCost: metrics.emotionalCost,
      burnoutRisk: metrics.burnoutRisk,
      toxicClientScore: metrics.toxicClientScore,
      clientRiskScore: metrics.clientRiskScore,
      futureLossPrediction: metrics.futureLossPrediction,
      retentionViability: metrics.retentionViability,
      upsellProbability: metrics.upsellProbability,
      verdict: verdict.type,
      lastAnalyzed: new Date(),
    },
  });

  return NextResponse.json({ metrics, verdictData: verdict, recommendations, insights });
}
