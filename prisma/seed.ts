import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { demoClients } from "../src/lib/demo";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create demo user
  const passwordHash = await hash("demo1234", 12);
  const user = await prisma.user.upsert({
    where: { email: "demo@agency.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@agency.com",
      passwordHash,
      emailVerified: new Date(),
    },
  });

  // Create organization
  const org = await prisma.organization.upsert({
    where: { slug: "demo-agency" },
    update: {},
    create: {
      name: "Demo Agency",
      slug: "demo-agency",
    },
  });

  // Add user to organization
  await prisma.organizationMember.upsert({
    where: { organizationId_userId: { organizationId: org.id, userId: user.id } },
    update: {},
    create: {
      organizationId: org.id,
      userId: user.id,
      role: "OWNER",
    },
  });

  // Create demo clients
  for (const demo of demoClients) {
    await prisma.client.create({
      data: {
        organizationId: org.id,
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
        analyzedById: user.id,
      },
    });
  }

  console.log(`✅ Created ${demoClients.length} demo clients`);
  console.log("🔑 Demo login: demo@agency.com / demo1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
