'use server';

import { db } from '@/db';
import { eq, and, desc, asc, isNull } from 'drizzle-orm';

export async function getDashboardRequests(userId: string) {
  const { serviceRequests } = await import('@/db/schema/services');
  return db.select().from(serviceRequests).where(eq(serviceRequests.userId, userId)).orderBy(desc(serviceRequests.createdAt));
}

export async function getDashboardProjects(userId: string) {
  const { projects } = await import('@/db/schema/projects');
  return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.createdAt));
}

export async function getDashboardProject(id: string) {
  const { projects, projectMembers, projectMilestones, projectDeliverables, projectTasks, projectComments, projectFiles, projectActivityLogs } = await import('@/db/schema/projects');
  const project = await db.select().from(projects).where(eq(projects.id, id)).limit(1).then(r => r[0]);
  if (!project) return null;
  const [members, milestones, deliverables, tasks, comments, files, activityLogs] = await Promise.all([
    db.select().from(projectMembers).where(eq(projectMembers.projectId, id)),
    db.select().from(projectMilestones).where(eq(projectMilestones.projectId, id)).orderBy(projectMilestones.displayOrder),
    db.select().from(projectDeliverables).where(eq(projectDeliverables.projectId, id)),
    db.select().from(projectTasks).where(eq(projectTasks.projectId, id)).orderBy(projectTasks.displayOrder),
    db.select().from(projectComments).where(eq(projectComments.projectId, id)).orderBy(desc(projectComments.createdAt)),
    db.select().from(projectFiles).where(eq(projectFiles.projectId, id)).orderBy(desc(projectFiles.createdAt)),
    db.select().from(projectActivityLogs).where(eq(projectActivityLogs.projectId, id)).orderBy(desc(projectActivityLogs.createdAt)),
  ]);
  return { ...project, members, milestones, deliverables, tasks, comments, files, activityLogs };
}

export async function getDashboardQuotations(userId: string) {
  const { quotations } = await import('@/db/schema/billing');
  return db.select().from(quotations).where(and(eq(quotations.userId, userId), isNull(quotations.deletedAt))).orderBy(desc(quotations.createdAt));
}

export async function getDashboardInvoices(userId: string) {
  const { invoices } = await import('@/db/schema/billing');
  return db.select().from(invoices).where(and(eq(invoices.userId, userId), isNull(invoices.deletedAt))).orderBy(desc(invoices.createdAt));
}

export async function getDashboardTickets(userId: string) {
  const { supportTickets } = await import('@/db/schema/support');
  return db.select().from(supportTickets).where(and(eq(supportTickets.userId, userId), isNull(supportTickets.deletedAt))).orderBy(desc(supportTickets.createdAt));
}

export async function getDashboardTicket(id: string) {
  const { supportTickets, ticketMessages, ticketAttachments } = await import('@/db/schema/support');
  const ticket = await db.select().from(supportTickets).where(eq(supportTickets.id, id)).limit(1).then(r => r[0]);
  if (!ticket) return null;
  const messages = await db.select().from(ticketMessages).where(eq(ticketMessages.ticketId, id)).orderBy(ticketMessages.createdAt);
  return { ...ticket, messages };
}

export async function getDashboardNotifications(userId: string) {
  const { notifications } = await import('@/db/schema/system');
  return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(50);
}

export async function getDashboardServices() {
  const { services } = await import('@/db/schema/services');
  return db.select().from(services).where(eq(services.isActive, true)).orderBy(services.displayOrder);
}

export async function getDashboardServiceRequests(userId: string) {
  const { serviceRequests, services: svc } = await import('@/db/schema/services');
  return db.select({
    id: serviceRequests.id,
    serviceName: svc.name,
    status: serviceRequests.status,
    createdAt: serviceRequests.createdAt,
  }).from(serviceRequests).leftJoin(svc, eq(serviceRequests.serviceId, svc.id)).where(eq(serviceRequests.userId, userId)).orderBy(desc(serviceRequests.createdAt));
}
