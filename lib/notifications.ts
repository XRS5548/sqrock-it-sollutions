import { db } from '@/db';
import { notifications } from '@/db/schema';
import { sendEmail } from '@/lib/email';
import type { NewNotification } from '@/db/schema';

export async function notify(data: NewNotification) {
  const [notification] = await db.insert(notifications).values(data).returning();
  return notification;
}

export async function notifyAndEmail(data: NewNotification & { email: string; templateName: string; emailData: Record<string, string> }) {
  await notify(data);
  await sendEmail(data.email, data.templateName, data.emailData);
}
