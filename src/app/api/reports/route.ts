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

  const reports = await prisma.report.findMany({
    where: { organizationId: user.organizations[0].organizationId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reports);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organizations: { take: 1 } },
    });

    if (!user?.organizations?.[0]) {
      return NextResponse.json({ error: "No organization" }, { status: 400 });
    }

    const report = await prisma.report.create({
      data: {
        organizationId: user.organizations[0].organizationId,
        clientId: body.clientId || null,
        title: body.title || "Executive Report",
        type: body.type || "EXECUTIVE",
        data: body.data || {},
        isShared: false,
      },
    });

    return NextResponse.json(report);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create report" }, { status: 500 });
  }
}
