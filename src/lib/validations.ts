import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  organizationName: z.string().min(2, "Organization name is required"),
});

export const clientSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  email: z.string().email().optional().or(z.literal("")),
  company: z.string().optional(),
  industry: z.string().optional(),
  monthlyRetainer: z.coerce.number().min(0),
  estimatedMonthlyHours: z.coerce.number().min(1, "Hours must be at least 1"),
  averageEmployeeHourCost: z.coerce.number().min(1, "Hourly cost is required"),
  numberOfEmployees: z.coerce.number().min(1),
  numberOfRevisions: z.coerce.number().min(0),
  numberOfMeetings: z.coerce.number().min(0),
  teamStressLevel: z.coerce.number().min(1).max(10),
  urgencyLevel: z.coerce.number().min(1).max(10),
  communicationChaos: z.coerce.number().min(1).max(10),
  scopeCreepFrequency: z.coerce.number().min(1).max(10),
  paymentDelays: z.coerce.number().min(0),
  additionalNotes: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ClientInput = z.infer<typeof clientSchema>;
