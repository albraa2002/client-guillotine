import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateMetrics } from "@/lib/calculations";
import { generateVerdict, type VerdictType } from "@/lib/verdict";
import { generateRecommendations, generateExecutiveInsights } from "@/lib/recommendations";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await prisma.client.findUnique({
    where: { id },
  });

  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const metrics = {
    netProfit: client.netProfit,
    grossMargin: client.grossMargin,
    realHourlyProfit: client.realHourlyProfit,
    revenueLeakage: client.revenueLeakage,
    hiddenOperationalCost: client.hiddenOperationalCost,
    teamDrainScore: client.teamDrainScore,
    revisionBurden: client.revisionBurden,
    meetingToxicity: client.meetingToxicity,
    scopeCreepIndex: client.scopeCreepIndex,
    emotionalCost: client.emotionalCost,
    burnoutRisk: client.burnoutRisk,
    toxicClientScore: client.toxicClientScore,
    clientRiskScore: client.clientRiskScore,
    futureLossPrediction: client.futureLossPrediction,
    retentionViability: client.retentionViability,
    upsellProbability: client.upsellProbability,
  };

  let verdictData = null;
  let recommendations: any[] = [];
  let insights: any[] = [];

  if (client.verdict) {
    const verdictInput = {
      netProfit: client.netProfit || 0,
      grossMargin: client.grossMargin || 0,
      toxicClientScore: client.toxicClientScore || 0,
      clientRiskScore: client.clientRiskScore || 0,
      teamDrainScore: client.teamDrainScore || 0,
      burnoutRisk: client.burnoutRisk || 0,
      retentionViability: client.retentionViability || 0,
      monthlyRetainer: client.monthlyRetainer,
      paymentDelays: client.paymentDelays,
      scopeCreepIndex: client.scopeCreepIndex || 0,
      upsellProbability: client.upsellProbability || 0,
    };
    verdictData = generateVerdict(verdictInput);
    recommendations = generateRecommendations(
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
      client.verdict as VerdictType
    );
    insights = generateExecutiveInsights(
      {
        grossMargin: client.grossMargin || 0,
        toxicClientScore: client.toxicClientScore || 0,
        clientRiskScore: client.clientRiskScore || 0,
        netProfit: client.netProfit || 0,
        teamDrainScore: client.teamDrainScore || 0,
      },
      client.name
    );
  }

  return NextResponse.json({
    ...client,
    metrics,
    verdictData,
    recommendations,
    insights,
  });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const input = {
      monthlyRetainer: body.monthlyRetainer || 0,
      estimatedMonthlyHours: body.estimatedMonthlyHours || 0,
      averageEmployeeHourCost: body.averageEmployeeHourCost || 0,
      numberOfEmployees: body.numberOfEmployees || 1,
      numberOfRevisions: body.numberOfRevisions || 0,
      numberOfMeetings: body.numberOfMeetings || 0,
      teamStressLevel: body.teamStressLevel || 5,
      urgencyLevel: body.urgencyLevel || 5,
      communicationChaos: body.communicationChaos || 5,
      scopeCreepFrequency: body.scopeCreepFrequency || 5,
      paymentDelays: body.paymentDelays || 0,
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

    const client = await prisma.client.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email || null,
        company: body.company || null,
        industry: body.industry || null,
        monthlyRetainer: input.monthlyRetainer,
        estimatedMonthlyHours: input.estimatedMonthlyHours,
        averageEmployeeHourCost: input.averageEmployeeHourCost,
        numberOfEmployees: input.numberOfEmployees,
        numberOfRevisions: input.numberOfRevisions,
        numberOfMeetings: input.numberOfMeetings,
        teamStressLevel: input.teamStressLevel,
        urgencyLevel: input.urgencyLevel,
        communicationChaos: input.communicationChaos,
        scopeCreepFrequency: input.scopeCreepFrequency,
        paymentDelays: input.paymentDelays,
        additionalNotes: body.additionalNotes || null,
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
        analyzedById: session.user.id,
      },
    });

    return NextResponse.json(client);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
