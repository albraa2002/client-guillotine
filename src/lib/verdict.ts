export type VerdictType = "TERMINATE" | "REPRICE" | "KEEP";

export interface VerdictResult {
  type: VerdictType;
  title: string;
  description: string;
  reason: string;
  actionItems: string[];
  severity: "high" | "medium" | "low";
}

export interface VerdictInput {
  netProfit: number;
  grossMargin: number;
  toxicClientScore: number;
  clientRiskScore: number;
  teamDrainScore: number;
  burnoutRisk: number;
  retentionViability: number;
  monthlyRetainer: number;
  paymentDelays: number;
  scopeCreepIndex: number;
  upsellProbability: number;
}

function generateTerminateVerdict(input: VerdictInput): VerdictResult {
  const drainPercent = input.teamDrainScore.toFixed(0);
  const lossAmount = Math.abs(input.netProfit).toFixed(0);

  return {
    type: "TERMINATE",
    title: "EXECUTE IMMEDIATE TERMINATION",
    description: `This client is actively destroying your agency's profitability and team morale. Every day you keep them, you bleed resources that could be deployed elsewhere.`,
    reason: `Client consumes ${drainPercent}% of team capacity with a negative gross margin of ${input.grossMargin.toFixed(1)}%. You are effectively paying $${lossAmount}/month to service this relationship. The burnout risk of ${input.burnoutRisk.toFixed(0)}% indicates severe team damage.`,
    actionItems: [
      "Draft termination effective immediately with 30-day notice clause",
      "Prepare transition document for client handoff",
      "Reallocate team resources to profitable accounts",
      "Flag client in system to prevent re-engagement",
      "Document lessons learned for future client screening",
    ],
    severity: "high",
  };
}

function generateRepriceVerdict(input: VerdictInput): VerdictResult {
  const requiredIncrease = Math.max(
    20,
    Math.ceil(((input.clientRiskScore - 30) / 100) * 60 + 20)
  );

  return {
    type: "REPRICE",
    title: "REPRICE OR RESTRUCTURE",
    description: `This client is on the edge of becoming a net drain. Their current pricing structure doesn't account for the operational complexity they introduce.`,
    reason: `Toxic score of ${input.toxicClientScore.toFixed(0)}% with ${input.scopeCreepIndex.toFixed(0)}% scope creep index. Retainer of $${input.monthlyRetainer.toLocaleString()} needs a ${requiredIncrease}% increase to restore healthy margins. Payment delays of ${input.paymentDelays} months indicate cash flow risk.`,
    actionItems: [
      `Increase retainer by minimum ${requiredIncrease}% effective next quarter`,
      `Implement strict scope-of-work boundaries with change order fees`,
      `Require net-15 payment terms or prepayment`,
      `Reduce meeting frequency to bi-weekly maximum`,
      `Assign a dedicated project manager to control scope creep`,
    ],
    severity: "medium",
  };
}

function generateKeepVerdict(input: VerdictInput): VerdictResult {
  return {
    type: "KEEP",
    title: "MAINTAIN & OPTIMIZE",
    description: `This is a healthy client relationship with positive margins and manageable operational demands. Nurture this account for long-term value.`,
    reason: `Gross margin of ${input.grossMargin.toFixed(1)}% with low toxic score (${input.toxicClientScore.toFixed(0)}%). Retention viability is ${input.retentionViability.toFixed(0)}% with ${input.upsellProbability.toFixed(0)}% upsell potential. Team drain is manageable at ${input.teamDrainScore.toFixed(0)}%.`,
    actionItems: [
      "Schedule quarterly business review to demonstrate value",
      "Explore upsell opportunities for additional services",
      "Assign your top talent to strengthen the relationship",
      "Request testimonial or case study permission",
      "Set up automated performance reporting for transparency",
    ],
    severity: "low",
  };
}

export function generateVerdict(input: VerdictInput): VerdictResult {
  const shouldTerminate =
    input.grossMargin < -5 ||
    input.toxicClientScore > 75 ||
    (input.clientRiskScore > 70 && input.grossMargin < 0);

  const shouldReprice =
    !shouldTerminate &&
    (input.grossMargin < 15 ||
      input.clientRiskScore > 50 ||
      input.toxicClientScore > 40 ||
      input.scopeCreepIndex > 50 ||
      input.paymentDelays >= 2);

  if (shouldTerminate) {
    return generateTerminateVerdict(input);
  }

  if (shouldReprice) {
    return generateRepriceVerdict(input);
  }

  return generateKeepVerdict(input);
}
