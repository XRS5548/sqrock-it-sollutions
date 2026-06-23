import { db } from '@/db';
import { eq, and, desc, asc, isNull } from 'drizzle-orm';
import { leads, leadNotes, leadActivities, leadStatusHistory } from '@/db/schema';

export async function getLeads() {
  return db.select().from(leads).where(isNull(leads.deletedAt)).orderBy(desc(leads.createdAt));
}

export async function getLeadsByStatus(status: string) {
  return db.select().from(leads).where(and(eq(leads.leadStatus, status as any), isNull(leads.deletedAt))).orderBy(desc(leads.createdAt));
}

export async function getLeadById(id: string) {
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result[0];
}

export async function getLeadWithDetails(id: string) {
  const lead = await getLeadById(id);
  if (!lead) return null;
  const [notes, activities, statusHistory] = await Promise.all([
    db.select().from(leadNotes).where(eq(leadNotes.leadId, id)).orderBy(desc(leadNotes.createdAt)),
    db.select().from(leadActivities).where(eq(leadActivities.leadId, id)).orderBy(desc(leadActivities.createdAt)),
    db.select().from(leadStatusHistory).where(eq(leadStatusHistory.leadId, id)).orderBy(asc(leadStatusHistory.createdAt)),
  ]);
  return { ...lead, notes, activities, statusHistory };
}
