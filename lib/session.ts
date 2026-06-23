import { auth } from "@/lib/auth";
import { db } from "@/db";
import { user } from "@/auth-schema";

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: new Headers({ cookie: "" }),
  });
  return session?.user ?? null;
}

export async function getUserById(id: string) {
  const result = await db.select().from(user).where(eq(user.id, id)).limit(1);
  return result[0] ?? null;
}

import { eq } from "drizzle-orm";
