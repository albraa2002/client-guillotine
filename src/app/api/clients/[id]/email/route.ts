import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  generateRepricingEmail,
  generateContractTerminationEmail,
  generateScopeLimitationEmail,
  generateClientWarningEmail,
  generateRetainerIncreaseEmail,
} from "@/lib/email-generator";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const client = await prisma.client.findUnique({ where: { id } });
  if (!client) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { type } = await req.json();
  const suggestedRetainer = Math.ceil(client.monthlyRetainer * 1.4);
  const name = client.name || client.company || "Client";

  let email;
  switch (type) {
    case "reprice":
      email = generateRepricingEmail(
        name,
        client.monthlyRetainer,
        suggestedRetainer,
        `Analysis shows our current engagement exceeds the agreed scope. The operational complexity requires adjusted investment to maintain quality.`
      );
      break;
    case "terminate":
      email = generateContractTerminationEmail(
        name,
        `After strategic review, we've determined our business directions no longer align for optimal results. We believe this decision allows both parties to pursue more aligned opportunities.`
      );
      break;
    case "scope":
      email = generateScopeLimitationEmail(
        name,
        ["Excessive revision cycles", "Scope expansion beyond agreement", "Extended meeting hours"],
        Math.ceil(client.monthlyRetainer * 0.25)
      );
      break;
    case "warning":
      email = generateClientWarningEmail(
        name,
        [
          `Payment delays of ${client.paymentDelays} months affecting cash flow`,
          `Scope creep frequency exceeding sustainable levels`,
          `Team stress levels impacting delivery quality`,
        ],
        `If these patterns continue, we may need to restructure our engagement to ensure we can continue delivering at the level you expect.`
      );
      break;
    case "retainer":
      email = generateRetainerIncreaseEmail(
        name,
        client.monthlyRetainer,
        suggestedRetainer,
        [
          "Dedicated account strategy sessions",
          "Priority response times",
          "Extended service coverage",
          "Senior team allocation",
        ]
      );
      break;
    default:
      email = generateRepricingEmail(name, client.monthlyRetainer, suggestedRetainer, "");
  }

  return NextResponse.json(email);
}
