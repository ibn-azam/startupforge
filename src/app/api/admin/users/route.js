import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/session";
import { getAdminUsers, setAdminUserBlocked } from "@/lib/api/admin";

async function requireAdmin() {
  const user = await getUserSession();

  if (!user || user.role !== "admin") {
    return null;
  }

  return user;
}

export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json({ users: await getAdminUsers() });
  } catch (error) {
    console.error("Failed to load admin users:", error);
    return NextResponse.json(
      { message: "Failed to load users." },
      { status: 500 },
    );
  }
}

export async function PATCH(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const { userId, isBlocked } = await request.json();

    if (!userId || typeof isBlocked !== "boolean") {
      return NextResponse.json(
        { message: "userId and isBlocked are required." },
        { status: 400 },
      );
    }

    const user = await setAdminUserBlocked(userId, isBlocked);
    return NextResponse.json({ user });
  } catch (error) {
    console.error("Failed to update user block status:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update user." },
      { status: 500 },
    );
  }
}