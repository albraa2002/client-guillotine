type VerdictType = "TERMINATE" | "REPRICE" | "KEEP";

export interface Recommendation {
  type: "PRICE" | "SCOPE" | "TERMINATE" | "WORKFLOW" | "RESOURCE" | "INSIGHT";
  priority: "high" | "medium" | "low";
  title: string;
  description: string;
  impact: string;
  action: string;
}

export interface AIInsight {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
}

export function generateRecommendations(
  metrics: {
    grossMargin: number;
    toxicClientScore: number;
    clientRiskScore: number;
    retentionViability: number;
    upsellProbability: number;
    teamDrainScore: number;
    burnoutRisk: number;
    scopeCreepIndex: number;
    netProfit: number;
    monthlyRetainer: number;
    realHourlyProfit: number;
    meetingToxicity: number;
    paymentDelays: number;
    numberOfRevisions: number;
  },
  verdict: VerdictType
): Recommendation[] {
  const recs: Recommendation[] = [];

  if (verdict === "TERMINATE") {
    recs.push({
      type: "TERMINATE",
      priority: "high",
      title: "Execute Contract Termination",
      description: `This client has a toxic score of ${metrics.toxicClientScore.toFixed(0)}% and negative margin. Every month costs you $${Math.abs(metrics.netProfit).toFixed(0)}.`,
      impact: `Save $${Math.abs(metrics.netProfit * 6).toFixed(0)} over 6 months plus recovery of team morale`,
      action: "Send termination notice and prepare transition plan",
    });
  }

  if (verdict === "REPRICE" || metrics.grossMargin < 20) {
    const suggestedRetainer = Math.ceil(
      metrics.monthlyRetainer * (1 + (20 - metrics.grossMargin) / 100 + 0.15)
    );
    recs.push({
      type: "PRICE",
      priority: "high",
      title: "Increase Retainer Pricing",
      description: `Gross margin of ${metrics.grossMargin.toFixed(1)}% is below healthy threshold. Recommended retainer: $${suggestedRetainer.toLocaleString()}.`,
      impact: `Improves margin by ${(metrics.grossMargin > 0 ? ((suggestedRetainer - metrics.monthlyRetainer) / metrics.monthlyRetainer) * 100 : 20).toFixed(0)}%`,
      action: "Prepare reprice proposal and schedule client call",
    });
  }

  if (metrics.scopeCreepIndex > 50) {
    recs.push({
      type: "SCOPE",
      priority: "medium",
      title: "Implement Scope Control Measures",
      description: `Scope creep index at ${metrics.scopeCreepIndex.toFixed(0)}% indicates poorly defined boundaries.`,
      impact: `Reduce operational cost by up to ${Math.min(metrics.scopeCreepIndex * 0.5, 30).toFixed(0)}%`,
      action: "Define strict SOW and implement change order process",
    });
  }

  if (metrics.meetingToxicity > 50) {
    recs.push({
      type: "WORKFLOW",
      priority: "medium",
      title: "Reduce Meeting Overhead",
      description: `Meeting toxicity score of ${metrics.meetingToxicity.toFixed(0)}% suggests excessive meetings drain productivity.`,
      impact: `Recover ${Math.round(metrics.meetingToxicity / 10)} hours/week per employee`,
      action: "Implement async-first communication and limit recurring meetings",
    });
  }

  if (metrics.teamDrainScore > 60) {
    recs.push({
      type: "RESOURCE",
      priority: "high",
      title: "Reallocate Team Resources",
      description: `Team drain score of ${metrics.teamDrainScore.toFixed(0)}% indicates resource burnout risk.`,
      impact: `Reduce burnout risk from ${metrics.burnoutRisk.toFixed(0)}% to manageable levels`,
      action: "Rotate team members and assign additional support",
    });
  }

  if (metrics.realHourlyProfit < 0) {
    recs.push({
      type: "PRICE",
      priority: "high",
      title: "Critical: Negative Hourly Profit",
      description: `Real hourly profit is $${metrics.realHourlyProfit.toFixed(2)}. You lose money on every hour worked.`,
      impact: `Needs immediate correction of $${Math.abs(metrics.realHourlyProfit).toFixed(0)}/hour to break even`,
      action: "Emergency pricing review and immediate client communication",
    });
  }

  if (metrics.retentionViability > 70 && metrics.upsellProbability > 50) {
    recs.push({
      type: "INSIGHT",
      priority: "low",
      title: "Upsell Opportunity Detected",
      description: `${metrics.upsellProbability.toFixed(0)}% upsell probability with ${metrics.retentionViability.toFixed(0)}% retention viability.`,
      impact: `Potential revenue increase of ${Math.round(metrics.upsellProbability / 100 * metrics.monthlyRetainer).toLocaleString()}/month`,
      action: "Schedule QBR and present additional service offerings",
    });
  }

  if (metrics.paymentDelays > 1) {
    recs.push({
      type: "WORKFLOW",
      priority: "high",
      title: "Payment Terms Require Enforcement",
      description: `${metrics.paymentDelays} months of payment delays detected. Cash flow at risk.`,
      impact: `Eliminate $${(metrics.monthlyRetainer * 0.02 * metrics.paymentDelays).toFixed(0)} monthly revenue leakage`,
      action: "Switch to prepayment terms and implement late fees",
    });
  }

  if (metrics.numberOfRevisions > 5) {
    recs.push({
      type: "WORKFLOW",
      priority: "medium",
      title: "Excessive Revision Cycle",
      description: `${metrics.numberOfRevisions} revisions per cycle indicates inefficient review process.`,
      impact: `Reduce revision overhead by up to 60% with structured feedback`,
      action: "Implement revision limits and structured feedback templates",
    });
  }

  return recs.slice(0, 5);
}

export function generateExecutiveInsights(
  metrics: {
    grossMargin: number;
    toxicClientScore: number;
    clientRiskScore: number;
    netProfit: number;
    teamDrainScore: number;
  },
  clientName: string
): AIInsight[] {
  return [
    {
      title: "Profitability Verdict",
      value: metrics.grossMargin > 15 ? "HEALTHY" : metrics.grossMargin > 0 ? "AT RISK" : "CRITICAL",
      description: `${clientName} generates ${metrics.grossMargin.toFixed(1)}% margin. ${metrics.grossMargin > 15 ? "Above industry benchmark." : metrics.grossMargin > 0 ? "Below 15% threshold." : "Operating at a loss."}`,
      trend: metrics.grossMargin > 15 ? "up" : "down",
    },
    {
      title: "Client Health",
      value: `${metrics.toxicClientScore.toFixed(0)}%`,
      description: `Toxic score is ${metrics.toxicClientScore > 50 ? "elevated" : "manageable"}. Risk level: ${metrics.clientRiskScore > 50 ? "HIGH" : "MODERATE"}`,
      trend: metrics.toxicClientScore > 50 ? "up" : "down",
    },
    {
      title: "Team Impact",
      value: metrics.teamDrainScore > 60 ? "DRAINING" : "STABLE",
      description: `Team drain at ${metrics.teamDrainScore.toFixed(0)}%. ${metrics.teamDrainScore > 60 ? "Immediate intervention required." : "Within acceptable range."}`,
      trend: metrics.teamDrainScore > 60 ? "up" : "neutral",
    },
    {
      title: "Financial Trajectory",
      value: metrics.netProfit > 0 ? "POSITIVE" : "NEGATIVE",
      description: `Net profit of $${metrics.netProfit.toFixed(0)}/month. ${metrics.netProfit > 0 ? "Contributing positively to agency." : "Draining agency resources."}`,
      trend: metrics.netProfit > 0 ? "up" : "down",
    },
  ];
}
