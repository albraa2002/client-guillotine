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
    include: {
      organizations: {
        include: { organization: true },
      },
    },
  });

  return NextResponse.json(user?.organizations.map((o) => o.organization) || []);
}

export async function PUT(req: Request) {
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

    const org = await prisma.organization.update({
      where: { id: user.organizations[0].organizationId },
      data: {
        name: body.name,
        logo: body.logo,
      },
    });

    return NextResponse.json(org);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
