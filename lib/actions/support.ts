'use server';

import { db } from '@/db';
import { eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { supportTickets, ticketMessages } from '@/db/schema';
import type { NewSupportTicket, NewTicketMessage } from '@/db/schema';

export async function createTicket(data: NewSupportTicket) {
  const [ticket] = await db.insert(supportTickets).values(data).returning();
  revalidatePath('/dashboard/tickets');
  revalidatePath('/admin/tickets');
  return ticket;
}

export async function updateTicket(id: string, data: Partial<NewSupportTicket>) {
  const [ticket] = await db.update(supportTickets).set(data).where(eq(supportTickets.id, id)).returning();
  if (data.status === 'resolved' || data.status === 'closed') {
    await db.update(supportTickets).set({ resolvedAt: new Date() }).where(eq(supportTickets.id, id));
  }
  revalidatePath('/dashboard/tickets');
  revalidatePath('/admin/tickets');
  return ticket;
}

export async function addTicketMessage(data: NewTicketMessage) {
  const [message] = await db.insert(ticketMessages).values(data).returning();
  await db.update(supportTickets).set({ updatedAt: new Date() }).where(eq(supportTickets.id, data.ticketId));
  revalidatePath('/dashboard/tickets');
  revalidatePath('/admin/tickets');
  return message;
}
