import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateMetrics } from "@/lib/calculations";
import { generateVerdict } from "@/lib/verdict";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "50");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { organizations: { take: 1 } },
  });

  if (!user?.organizations?.[0]) {
    return NextResponse.json({ error: "No organization" }, { status: 400 });
  }

  const organizationId = user.organizations[0].organizationId;

  const clients = await prisma.client.findMany({
    where: { organizationId },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organizations: { take: 1 } },
    });

    if (!user?.organizations?.[0]) {
      return NextResponse.json({ error: "No organization" }, { status: 400 });
    }

    const organizationId = user.organizations[0].organizationId;

    const input = {
      monthlyRetainer: body.monthlyRetainer || 0,
      estimatedMonthlyHours: body.estimatedMonthlyHours || 40,
      averageEmployeeHourCost: body.averageEmployeeHourCost || 75,
      numberOfEmployees: body.numberOfEmployees || 2,
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

    const client = await prisma.client.create({
      data: {
        organizationId,
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
    console.error(error);
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 });
  }
}
