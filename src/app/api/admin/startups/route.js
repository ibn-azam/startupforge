import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/session";
import {
  approveAdminStartup,
  getAdminStartups,
  removeAdminStartup,
} from "@/lib/api/admin";

async function requireAdmin() {
  const user = await getUserSession();
  return user?.role === "admin";
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ startups: await getAdminStartups() });
  } catch (error) {
    console.error("Failed to load admin startups:", error);
    return NextResponse.json(
      {
        message:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Failed to load startups.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { startupId } = await request.json();
    if (!startupId) {
      return NextResponse.json({ message: "startupId is required." }, { status: 400 });
    }

    return NextResponse.json({ startup: await approveAdminStartup(startupId) });
  } catch (error) {
    console.error("Failed to approve startup:", error);
    return NextResponse.json(
      { message: error.message || "Failed to approve startup." },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { startupId } = await request.json();
    if (!startupId) {
      return NextResponse.json({ message: "startupId is required." }, { status: 400 });
    }

    return NextResponse.json({ startup: await removeAdminStartup(startupId) });
  } catch (error) {
    console.error("Failed to remove startup:", error);
    return NextResponse.json(
      { message: error.message || "Failed to remove startup." },
      { status: 500 },
    );
  }
}