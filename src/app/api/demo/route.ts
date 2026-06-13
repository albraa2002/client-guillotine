import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { demoClients } from "@/lib/demo";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { organizations: { take: 1 } },
  });

  if (!user?.organizations?.[0]) {
    return NextResponse.json({ error: "No organization" }, { status: 400 });
  }

  const organizationId = user.organizations[0].organizationId;

  // Clear existing clients
  await prisma.client.deleteMany({ where: { organizationId } });

  const created = [];
  for (const demo of demoClients) {
    const client = await prisma.client.create({
      data: {
        organizationId,
        name: demo.name,
        company: demo.company,
        industry: demo.industry,
        email: demo.email,
        monthlyRetainer: demo.input.monthlyRetainer,
        estimatedMonthlyHours: demo.input.estimatedMonthlyHours,
        averageEmployeeHourCost: demo.input.averageEmployeeHourCost,
        numberOfEmployees: demo.input.numberOfEmployees,
        numberOfRevisions: demo.input.numberOfRevisions,
        numberOfMeetings: demo.input.numberOfMeetings,
        teamStressLevel: demo.input.teamStressLevel,
        urgencyLevel: demo.input.urgencyLevel,
        communicationChaos: demo.input.communicationChaos,
        scopeCreepFrequency: demo.input.scopeCreepFrequency,
        paymentDelays: demo.input.paymentDelays,
        netProfit: demo.metrics.netProfit,
        grossMargin: demo.metrics.grossMargin,
        realHourlyProfit: demo.metrics.realHourlyProfit,
        revenueLeakage: demo.metrics.revenueLeakage,
        hiddenOperationalCost: demo.metrics.hiddenOperationalCost,
        teamDrainScore: demo.metrics.teamDrainScore,
        revisionBurden: demo.metrics.revisionBurden,
        meetingToxicity: demo.metrics.meetingToxicity,
        scopeCreepIndex: demo.metrics.scopeCreepIndex,
        emotionalCost: demo.metrics.emotionalCost,
        burnoutRisk: demo.metrics.burnoutRisk,
        toxicClientScore: demo.metrics.toxicClientScore,
        clientRiskScore: demo.metrics.clientRiskScore,
        futureLossPrediction: demo.metrics.futureLossPrediction,
        retentionViability: demo.metrics.retentionViability,
        upsellProbability: demo.metrics.upsellProbability,
        verdict: demo.verdict.type,
        lastAnalyzed: new Date(),
        analyzedById: session.user.id,
      },
    });
    created.push(client);
  }

  return NextResponse.json({ success: true, count: created.length });
}
