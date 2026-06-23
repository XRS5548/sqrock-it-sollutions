'use server';

import { db } from '@/db';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { notifications } from '@/db/schema';
import type { NewNotification } from '@/db/schema';

export async function createNotification(data: NewNotification) {
  const [notification] = await db.insert(notifications).values(data).returning();
  return notification;
}

export async function markNotificationRead(id: string) {
  await db.update(notifications).set({ isRead: true, readAt: new Date() }).where(eq(notifications.id, id));
  revalidatePath('/dashboard/notifications');
}

export async function markAllNotificationsRead(userId: string) {
  await db.update(notifications).set({ isRead: true, readAt: new Date() }).where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));
  revalidatePath('/dashboard/notifications');
}

export async function deleteNotification(id: string) {
  await db.delete(notifications).where(eq(notifications.id, id));
  revalidatePath('/dashboard/notifications');
}
