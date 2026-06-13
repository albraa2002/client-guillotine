import { clamp } from "./utils";

export interface ClientInput {
  monthlyRetainer: number;
  estimatedMonthlyHours: number;
  averageEmployeeHourCost: number;
  numberOfEmployees: number;
  numberOfRevisions: number;
  numberOfMeetings: number;
  teamStressLevel: number;
  urgencyLevel: number;
  communicationChaos: number;
  scopeCreepFrequency: number;
  paymentDelays: number;
}

export interface CalculatedMetrics {
  netProfit: number;
  grossMargin: number;
  realHourlyProfit: number;
  revenueLeakage: number;
  hiddenOperationalCost: number;
  teamDrainScore: number;
  revisionBurden: number;
  meetingToxicity: number;
  scopeCreepIndex: number;
  emotionalCost: number;
  burnoutRisk: number;
  toxicClientScore: number;
  clientRiskScore: number;
  futureLossPrediction: number;
  retentionViability: number;
  upsellProbability: number;
}

export function calculateMetrics(input: ClientInput): CalculatedMetrics {
  const {
    monthlyRetainer,
    estimatedMonthlyHours,
    averageEmployeeHourCost,
    numberOfEmployees,
    numberOfRevisions,
    numberOfMeetings,
    teamStressLevel,
    urgencyLevel,
    communicationChaos,
    scopeCreepFrequency,
    paymentDelays,
  } = input;

  const totalTeamHours = estimatedMonthlyHours * numberOfEmployees;
  const baseOperationalCost = totalTeamHours * averageEmployeeHourCost;

  const revisionCostFactor = 1 + numberOfRevisions * 0.15;
  const meetingCost = numberOfMeetings * 1.5 * averageEmployeeHourCost;
  const chaosOverhead = (communicationChaos / 10) * baseOperationalCost * 0.1;
  const scopeCreepCost =
    (scopeCreepFrequency / 10) * baseOperationalCost * 0.2;

  const hiddenOperationalCost =
    baseOperationalCost * (revisionCostFactor - 1) +
    meetingCost +
    chaosOverhead +
    scopeCreepCost;

  const revenueLeakage = Math.max(
    0,
    paymentDelays * 0.02 * monthlyRetainer +
      (communicationChaos / 10) * 0.05 * monthlyRetainer
  );

  const effectiveRevenue = monthlyRetainer - revenueLeakage;
  const totalCost = baseOperationalCost + hiddenOperationalCost;
  const netProfit = effectiveRevenue - totalCost;
  const grossMargin =
    effectiveRevenue > 0 ? (netProfit / effectiveRevenue) * 100 : 0;
  const realHourlyProfit =
    estimatedMonthlyHours > 0 ? netProfit / estimatedMonthlyHours : 0;

  const teamDrainScore = clamp(
    (teamStressLevel / 10) * 40 +
      (urgencyLevel / 10) * 30 +
      (communicationChaos / 10) * 30,
    0,
    100
  );

  const revisionBurden = clamp(
    Math.min(numberOfRevisions, 20) * 5,
    0,
    100
  );

  const meetingToxicity = clamp(
    Math.min(numberOfMeetings, 30) * 3 +
      (urgencyLevel / 10) * 10,
    0,
    100
  );

  const scopeCreepIndex = clamp(
    (scopeCreepFrequency / 10) * 50 +
      (communicationChaos / 10) * 25 +
      (urgencyLevel / 10) * 25,
    0,
    100
  );

  const emotionalCost = clamp(
    teamDrainScore * 0.3 + meetingToxicity * 0.3 + scopeCreepIndex * 0.4,
    0,
    100
  );

  const burnoutRisk = clamp(
    emotionalCost * 0.4 + teamDrainScore * 0.3 + (urgencyLevel / 10) * 30,
    0,
    100
  );

  const toxicClientScore = clamp(
    (grossMargin < 0 ? 40 : 0) +
      (teamDrainScore * 0.2) +
      (revisionBurden * 0.1) +
      (meetingToxicity * 0.1) +
      (scopeCreepIndex * 0.15) +
      (paymentDelays * 5) +
      (emotionalCost * 0.2) +
      (communicationChaos / 10) * 10,
    0,
    100
  );

  const clientRiskScore = clamp(
    toxicClientScore * 0.4 +
      (1 - Math.min(grossMargin + 100, 200) / 200) * 30 +
      (paymentDelays * 5) +
      (burnoutRisk * 0.2),
    0,
    100
  );

  const monthlyLoss = Math.max(0, -netProfit);
  const futureLossPrediction = monthlyLoss * 6;

  const retentionViability = clamp(
    100 -
      clientRiskScore * 0.5 -
      (paymentDelays * 3) +
      (grossMargin > 20 ? 15 : 0),
    0,
    100
  );

  const upsellProbability = clamp(
    (grossMargin > 30 ? 30 : grossMargin > 15 ? 20 : 10) -
      toxicClientScore * 0.2 +
      (retentionViability * 0.2),
    0,
    100
  );

  return {
    netProfit,
    grossMargin,
    realHourlyProfit,
    revenueLeakage,
    hiddenOperationalCost,
    teamDrainScore,
    revisionBurden,
    meetingToxicity,
    scopeCreepIndex,
    emotionalCost,
    burnoutRisk,
    toxicClientScore,
    clientRiskScore,
    futureLossPrediction,
    retentionViability,
    upsellProbability,
  };
}
