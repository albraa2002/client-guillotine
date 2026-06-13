import { ClientInput, CalculatedMetrics, calculateMetrics } from "./calculations";
import { generateVerdict } from "./verdict";

export interface DemoClient {
  name: string;
  company: string;
  industry: string;
  email: string;
  input: ClientInput;
  metrics: CalculatedMetrics;
  verdict: ReturnType<typeof generateVerdict>;
}

function makeDemoClient(
  name: string,
  company: string,
  industry: string,
  email: string,
  input: ClientInput
): DemoClient {
  const metrics = calculateMetrics(input);
  const verdict = generateVerdict({
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
  });
  return { name, company, industry, email, input, metrics, verdict };
}

export const demoClients: DemoClient[] = [
  makeDemoClient(
    "Sarah Chen",
    "TechVenture Inc.",
    "SaaS / Technology",
    "sarah@techventure.io",
    {
      monthlyRetainer: 25000,
      estimatedMonthlyHours: 120,
      averageEmployeeHourCost: 85,
      numberOfEmployees: 4,
      numberOfRevisions: 3,
      numberOfMeetings: 12,
      teamStressLevel: 4,
      urgencyLevel: 3,
      communicationChaos: 3,
      scopeCreepFrequency: 3,
      paymentDelays: 0,
    }
  ),
  makeDemoClient(
    "Marcus Johnson",
    "Pinnacle Brands",
    "E-commerce / DTC",
    "marcus@pinnaclebrands.io",
    {
      monthlyRetainer: 18000,
      estimatedMonthlyHours: 90,
      averageEmployeeHourCost: 85,
      numberOfEmployees: 3,
      numberOfRevisions: 2,
      numberOfMeetings: 8,
      teamStressLevel: 3,
      urgencyLevel: 4,
      communicationChaos: 2,
      scopeCreepFrequency: 2,
      paymentDelays: 0,
    }
  ),
  makeDemoClient(
    "Elena Rodriguez",
    "VitaHealth Clinics",
    "Healthcare",
    "elena@vitahealth.io",
    {
      monthlyRetainer: 32000,
      estimatedMonthlyHours: 140,
      averageEmployeeHourCost: 85,
      numberOfEmployees: 5,
      numberOfRevisions: 4,
      numberOfMeetings: 15,
      teamStressLevel: 5,
      urgencyLevel: 5,
      communicationChaos: 4,
      scopeCreepFrequency: 4,
      paymentDelays: 0,
    }
  ),
  makeDemoClient(
    "David Park",
    "Quantum Financial",
    "FinTech",
    "david@quantumfin.io",
    {
      monthlyRetainer: 45000,
      estimatedMonthlyHours: 180,
      averageEmployeeHourCost: 95,
      numberOfEmployees: 6,
      numberOfRevisions: 6,
      numberOfMeetings: 20,
      teamStressLevel: 8,
      urgencyLevel: 9,
      communicationChaos: 8,
      scopeCreepFrequency: 7,
      paymentDelays: 2,
    }
  ),
  makeDemoClient(
    "Jessica Williams",
    "Bright Future Edu",
    "Education",
    "jessica@brightfuture.io",
    {
      monthlyRetainer: 12000,
      estimatedMonthlyHours: 60,
      averageEmployeeHourCost: 75,
      numberOfEmployees: 2,
      numberOfRevisions: 8,
      numberOfMeetings: 25,
      teamStressLevel: 9,
      urgencyLevel: 8,
      communicationChaos: 9,
      scopeCreepFrequency: 8,
      paymentDelays: 3,
    }
  ),
  makeDemoClient(
    "Alex Thompson",
    "GrowthLab Agency",
    "Marketing Agency",
    "alex@growthlab.io",
    {
      monthlyRetainer: 22000,
      estimatedMonthlyHours: 100,
      averageEmployeeHourCost: 85,
      numberOfEmployees: 3,
      numberOfRevisions: 5,
      numberOfMeetings: 10,
      teamStressLevel: 6,
      urgencyLevel: 5,
      communicationChaos: 5,
      scopeCreepFrequency: 5,
      paymentDelays: 1,
    }
  ),
  makeDemoClient(
    "Nadia Hassan",
    "Luxura Cosmetics",
    "Beauty / Cosmetics",
    "nadia@luxura.io",
    {
      monthlyRetainer: 35000,
      estimatedMonthlyHours: 130,
      averageEmployeeHourCost: 90,
      numberOfEmployees: 4,
      numberOfRevisions: 10,
      numberOfMeetings: 18,
      teamStressLevel: 7,
      urgencyLevel: 9,
      communicationChaos: 7,
      scopeCreepFrequency: 9,
      paymentDelays: 1,
    }
  ),
  makeDemoClient(
    "Ryan O'Brien",
    "BuildCore Construction",
    "Construction",
    "ryan@buildcore.io",
    {
      monthlyRetainer: 8000,
      estimatedMonthlyHours: 50,
      averageEmployeeHourCost: 80,
      numberOfEmployees: 2,
      numberOfRevisions: 4,
      numberOfMeetings: 6,
      teamStressLevel: 3,
      urgencyLevel: 4,
      communicationChaos: 3,
      scopeCreepFrequency: 2,
      paymentDelays: 0,
    }
  ),
  makeDemoClient(
    "Priya Patel",
    "DataSphere Analytics",
    "Data / AI",
    "priya@datasphere.io",
    {
      monthlyRetainer: 28000,
      estimatedMonthlyHours: 110,
      averageEmployeeHourCost: 95,
      numberOfEmployees: 3,
      numberOfRevisions: 3,
      numberOfMeetings: 8,
      teamStressLevel: 4,
      urgencyLevel: 5,
      communicationChaos: 3,
      scopeCreepFrequency: 3,
      paymentDelays: 0,
    }
  ),
  makeDemoClient(
    'Tommy "The Tyrant" Falcone',
    "Falcone Industries",
    "Manufacturing",
    "tommy@falcone.io",
    {
      monthlyRetainer: 40000,
      estimatedMonthlyHours: 200,
      averageEmployeeHourCost: 85,
      numberOfEmployees: 6,
      numberOfRevisions: 15,
      numberOfMeetings: 30,
      teamStressLevel: 10,
      urgencyLevel: 10,
      communicationChaos: 9,
      scopeCreepFrequency: 10,
      paymentDelays: 4,
    }
  ),
];
