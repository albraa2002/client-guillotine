import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateShareToken } from "@/lib/utils";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { email, role } = await req.json();

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { organizations: { take: 1 } },
    });

    if (!user?.organizations?.[0]) {
      return NextResponse.json({ error: "No organization" }, { status: 400 });
    }

    const invite = await prisma.inviteCode.create({
      data: {
        code: generateShareToken(),
        organizationId: user.organizations[0].organizationId,
        email: email || null,
        role: role || "MEMBER",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return NextResponse.json({ code: invite.code, expiresAt: invite.expiresAt });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create invite" }, { status: 500 });
  }
}
