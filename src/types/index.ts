import { Client } from "@prisma/client";

export type { Client };

export interface DashboardMetrics {
  totalProfitability: number;
  teamBurnRate: number;
  toxicClientsCount: number;
  revenueLeakage: number;
  profitMargins: number;
  averageClientHealth: number;
  operationalPressure: number;
  timeDrainAnalytics: number;
  totalClients: number;
  terminatedClients: number;
  atRiskClients: number;
  healthyClients: number;
}

export interface ClientWithMetrics extends Client {
  calculatedMetrics?: import("@prisma/client").Prisma.JsonValue;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  previousValue?: number;
  trend?: number;
}

export interface ClientFormData {
  name: string;
  email?: string;
  company?: string;
  industry?: string;
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
  additionalNotes?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  joinedAt: string;
}

export interface ReportData {
  id: string;
  title: string;
  type: string;
  data: any;
  createdAt: string;
  isShared: boolean;
  shareToken?: string;
}
