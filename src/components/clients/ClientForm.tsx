"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientSchema, ClientInput } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ClientFormProps {
  onSuccess: () => void;
  defaultValues?: Partial<ClientInput>;
  clientId?: string;
}

export function ClientForm({ onSuccess, defaultValues, clientId }: ClientFormProps) {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ClientInput>({
    resolver: zodResolver(clientSchema),
    defaultValues: defaultValues || {
      monthlyRetainer: 0, estimatedMonthlyHours: 40, averageEmployeeHourCost: 75,
      numberOfEmployees: 2, numberOfRevisions: 0, numberOfMeetings: 0,
      teamStressLevel: 5, urgencyLevel: 5, communicationChaos: 5,
      scopeCreepFrequency: 5, paymentDelays: 0,
    },
  });

  async function onSubmit(data: ClientInput) {
    setLoading(true);
    try {
      const url = clientId ? `/api/clients/${clientId}` : "/api/clients";
      const method = clientId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to save client");
      }
      toast.success(clientId ? "Client updated" : "Client created");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-noir-300 mb-3 uppercase tracking-wider">Client Information</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Client Name *</Label>
            <Input {...register("name")} placeholder="Client name" />
            {errors.name && <p className="text-xs text-profit-negative">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input {...register("email")} placeholder="client@company.com" />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input {...register("company")} placeholder="Company name" />
          </div>
          <div className="space-y-2">
            <Label>Industry</Label>
            <Input {...register("industry")} placeholder="e.g., SaaS, Healthcare" />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-noir-300 mb-3 uppercase tracking-wider">Financial Inputs</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Monthly Retainer ($)</Label>
            <Input type="number" {...register("monthlyRetainer", { valueAsNumber: true })} />
            {errors.monthlyRetainer && <p className="text-xs text-profit-negative">{errors.monthlyRetainer.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Est. Monthly Hours</Label>
            <Input type="number" {...register("estimatedMonthlyHours", { valueAsNumber: true })} />
            {errors.estimatedMonthlyHours && <p className="text-xs text-profit-negative">{errors.estimatedMonthlyHours.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Avg Employee Hour Cost ($)</Label>
            <Input type="number" {...register("averageEmployeeHourCost", { valueAsNumber: true })} />
            {errors.averageEmployeeHourCost && <p className="text-xs text-profit-negative">{errors.averageEmployeeHourCost.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Team Size</Label>
            <Input type="number" {...register("numberOfEmployees", { valueAsNumber: true })} />
            {errors.numberOfEmployees && <p className="text-xs text-profit-negative">{errors.numberOfEmployees.message}</p>}
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-noir-300 mb-3 uppercase tracking-wider">Operational Inputs</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Revisions per Cycle</Label>
            <Input type="number" {...register("numberOfRevisions", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <Label>Meetings per Month</Label>
            <Input type="number" {...register("numberOfMeetings", { valueAsNumber: true })} />
          </div>
          <div className="space-y-2">
            <Label>Payment Delays (months)</Label>
            <Input type="number" {...register("paymentDelays", { valueAsNumber: true })} />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold text-gray-700 dark:text-noir-300 mb-3 uppercase tracking-wider">Scoring (1-10)</h4>
        <div className="grid grid-cols-2 gap-6">
          {[
            { name: "teamStressLevel", label: "Team Stress Level" },
            { name: "urgencyLevel", label: "Urgency Level" },
            { name: "communicationChaos", label: "Communication Chaos" },
            { name: "scopeCreepFrequency", label: "Scope Creep Frequency" },
          ].map(({ name, label }) => (
            <div key={name} className="space-y-2">
              <div className="flex justify-between">
                <Label>{label}</Label>
                <span className="text-xs font-mono text-gray-500 dark:text-noir-400">
                  {defaultValues?.[name as keyof ClientInput] || 5}
                </span>
              </div>
              <input type="range" min="1" max="10" {...register(name as keyof ClientInput, { valueAsNumber: true })}
                className="w-full h-2 bg-gray-200 dark:bg-noir-800 rounded-lg appearance-none cursor-pointer accent-guillotine-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Additional Notes</Label>
        <textarea
          {...register("additionalNotes")}
          className="w-full h-20 rounded-lg border border-gray-300 dark:border-noir-700 bg-white dark:bg-noir-900/80 px-3 py-2 text-sm text-gray-700 dark:text-noir-100 placeholder:text-gray-400 dark:placeholder:text-noir-400 focus:outline-none focus:ring-2 focus:ring-guillotine-500/50 resize-none"
          placeholder="Any additional context about this client..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button type="submit" disabled={loading} size="lg">
          {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {clientId ? "Update & Analyze" : "Create & Analyze"}
        </Button>
      </div>
    </form>
  );
}
