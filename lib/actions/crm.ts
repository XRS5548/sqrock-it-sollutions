'use server';

import { db } from '@/db';
import { eq, and, desc, asc, isNull } from 'drizzle-orm';
import {
  leads, leadNotes, leadActivities, leadStatusHistory,
} from '@/db/schema';

export async function getLeads() {
  return db.select().from(leads).where(isNull(leads.deletedAt)).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: string) {
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function createLead(data: any) {
  const [lead] = await db.insert(leads).values(data).returning();
  await db.insert(leadActivities).values({
    leadId: lead.id,
    userId: data.userId ?? '',
    activityType: 'lead_created',
    description: `Lead "${data.name}" was created`,
  });
  return lead;
}

export async function updateLead(id: string, data: any) {
  const [lead] = await db.update(leads).set(data).where(eq(leads.id, id)).returning();
  return lead;
}

export async function updateLeadStatus(id: string, newStatus: string, changedBy: string, reason?: string) {
  const lead = await getLeadById(id);
  if (!lead) throw new Error('Lead not found');
  const oldStatus = lead.leadStatus;
  await db.update(leads).set({ leadStatus: newStatus as any }).where(eq(leads.id, id));
  await db.insert(leadStatusHistory).values({
    leadId: id, oldStatus: oldStatus as any, newStatus: newStatus as any, changedBy, reason,
  });
  await db.insert(leadActivities).values({
    leadId: id, userId: changedBy, activityType: 'status_change',
    description: `Status changed from ${oldStatus} to ${newStatus}`,
  });
}

export async function addLeadNote(data: any) {
  const [note] = await db.insert(leadNotes).values(data).returning();
  return note;
}

export async function deleteLead(id: string) {
  await db.update(leads).set({ deletedAt: new Date() }).where(eq(leads.id, id));
}
