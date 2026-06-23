import { db } from '@/db';
import { eq, and, desc, sql } from 'drizzle-orm';
import { notifications } from '@/db/schema';

export async function getUserNotifications(userId: string) {
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(50);
}

export async function getUnreadNotifications(userId: string) {
  return db.select().from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false))).orderBy(desc(notifications.createdAt)).limit(20);
}

export async function getNotificationCount(userId: string) {
  const result = await db.select({ count: sql<number>`count(*)` }).from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  return Number(result[0]?.count ?? 0);
}
