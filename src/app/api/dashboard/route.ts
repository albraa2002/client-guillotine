import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
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

  const clients = await prisma.client.findMany({
    where: { organizationId },
  });

  const totalClients = clients.length;
  const totalProfitability = clients.reduce((sum, c) => sum + (c.netProfit || 0), 0);
  const teamBurnRate = clients.reduce(
    (sum, c) => sum + c.estimatedMonthlyHours * c.averageEmployeeHourCost * c.numberOfEmployees,
    0
  );
  const toxicClients = clients.filter(
    (c) => c.toxicClientScore && c.toxicClientScore > 60
  );
  const totalRevenueLeakage = clients.reduce((sum, c) => sum + (c.revenueLeakage || 0), 0);
  const margins = clients
    .filter((c) => c.grossMargin !== null)
    .map((c) => c.grossMargin!);
  const avgMargin = margins.length > 0 ? margins.reduce((a, b) => a + b, 0) / margins.length : 0;
  const healthScores = clients
    .filter((c) => c.toxicClientScore !== null)
    .map((c) => 100 - c.toxicClientScore!);
  const avgHealth = healthScores.length > 0 ? healthScores.reduce((a, b) => a + b, 0) / healthScores.length : 0;
  const drainScores = clients
    .filter((c) => c.teamDrainScore !== null)
    .map((c) => c.teamDrainScore!);
  const avgDrain = drainScores.length > 0 ? drainScores.reduce((a, b) => a + b, 0) / drainScores.length : 0;

  const totalDrainHours = clients.reduce(
    (sum, c) =>
      sum +
      (c.estimatedMonthlyHours || 0) *
        ((c.teamDrainScore || 0) / 100) *
        0.3,
    0
  );

  return NextResponse.json({
    totalProfitability,
    teamBurnRate,
    toxicClientsCount: toxicClients.length,
    revenueLeakage: totalRevenueLeakage,
    profitMargins: avgMargin,
    averageClientHealth: avgHealth,
    operationalPressure: avgDrain,
    timeDrainAnalytics: totalDrainHours,
    totalClients,
    terminatedClients: clients.filter((c) => c.verdict === "TERMINATE").length,
    atRiskClients: clients.filter((c) => c.verdict === "REPRICE").length,
    healthyClients: clients.filter((c) => c.verdict === "KEEP").length,
  });
}
