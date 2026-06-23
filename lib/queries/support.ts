import { db } from '@/db';
import { eq, and, desc, isNull } from 'drizzle-orm';
import { supportTickets, ticketMessages, ticketAttachments } from '@/db/schema';

export async function getUserTickets(userId: string) {
  return db.select().from(supportTickets).where(and(eq(supportTickets.userId, userId), isNull(supportTickets.deletedAt))).orderBy(desc(supportTickets.createdAt));
}

export async function getTicketById(id: string) {
  const result = await db.select().from(supportTickets).where(eq(supportTickets.id, id)).limit(1);
  return result[0];
}

export async function getTicketWithMessages(id: string) {
  const ticket = await getTicketById(id);
  if (!ticket) return null;
  const messages = await db.select().from(ticketMessages).where(eq(ticketMessages.ticketId, id)).orderBy(ticketMessages.createdAt);
  const attachments = await db.select().from(ticketAttachments).where(eq(ticketAttachments.ticketId, id));
  return { ...ticket, messages, attachments };
}

export async function getAllTickets() {
  return db.select().from(supportTickets).where(isNull(supportTickets.deletedAt)).orderBy(desc(supportTickets.createdAt));
}
