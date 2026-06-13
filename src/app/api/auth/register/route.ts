import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password, organizationName } = await req.json();

    if (!name || !email || !password || !organizationName) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        emailVerified: new Date(),
        organizations: {
          create: {
            role: "OWNER",
            organization: {
              create: {
                name: organizationName,
                slug: organizationName.toLowerCase().replace(/[^a-z0-9]/g, "-") + "-" + Math.random().toString(36).substring(2, 6),
              },
            },
          },
        },
      },
      include: {
        organizations: {
          include: { organization: true },
        },
      },
    });

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      organization: user.organizations[0]?.organization,
    });
  } catch (error) {
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
