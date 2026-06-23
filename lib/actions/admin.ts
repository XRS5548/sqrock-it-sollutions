'use server';

import { db } from '@/db';
import { eq, isNull } from 'drizzle-orm';
import { user } from '@/auth-schema';
import { automations } from '@/lib/automation/engine';

export async function getStats() {
  const { sql } = await import('drizzle-orm');
  const { projects } = await import('@/db/schema/projects');
  const { serviceRequests } = await import('@/db/schema/services');
  const { quotations, invoices } = await import('@/db/schema/billing');
  const { supportTickets } = await import('@/db/schema/support');
  const [clients, projectsData, requestsData, quotationsData, invoicesData, ticketsData] = await Promise.all([
    db.select({ count: sql`count(*)` }).from(user),
    db.select({ count: sql`count(*)` }).from(projects).where(isNull(projects.deletedAt)),
    db.select({ count: sql`count(*)` }).from(serviceRequests).where(isNull(serviceRequests.deletedAt)),
    db.select({ count: sql`count(*)` }).from(quotations).where(isNull(quotations.deletedAt)),
    db.select({ count: sql`count(*)` }).from(invoices).where(isNull(invoices.deletedAt)),
    db.select({ count: sql`count(*)` }).from(supportTickets).where(isNull(supportTickets.deletedAt)),
  ]);
  return {
    clients: Number(clients[0]?.count ?? 0),
    projects: Number(projectsData[0]?.count ?? 0),
    requests: Number(requestsData[0]?.count ?? 0),
    quotations: Number(quotationsData[0]?.count ?? 0),
    invoices: Number(invoicesData[0]?.count ?? 0),
    tickets: Number(ticketsData[0]?.count ?? 0),
  };
}

export async function getClients() {
  return db.select().from(user).where(eq(user.role, 'client'));
}

export async function getTeam() {
  return db.select().from(user).where(eq(user.role, 'admin'));
}

export async function getAllUsers() {
  return db.select().from(user);
}

export async function getAutomations() {
  return db.select().from(automations).where(isNull(automations.deletedAt));
}

export async function createAutomation(data: any) {
  await db.insert(automations).values(data);
}

export async function toggleAutomation(id: string, isActive: boolean) {
  await db.update(automations).set({ isActive }).where(eq(automations.id, id));
}

export async function deleteAutomation(id: string) {
  await db.update(automations).set({ deletedAt: new Date() }).where(eq(automations.id, id));
}

export async function adminGetAllRequests() {
  const { serviceRequests, services: svc } = await import('@/db/schema/services');
  return db.select({
    id: serviceRequests.id,
    title: serviceRequests.title,
    serviceName: svc.name,
    status: serviceRequests.status,
    createdAt: serviceRequests.createdAt,
  }).from(serviceRequests).leftJoin(svc, eq(serviceRequests.serviceId, svc.id)).orderBy(serviceRequests.createdAt);
}

export async function adminGetAllProjects() {
  const { projects } = await import('@/db/schema/projects');
  return db.select().from(projects).where(isNull(projects.deletedAt)).orderBy(projects.createdAt);
}

export async function adminGetAllQuotations() {
  const { quotations } = await import('@/db/schema/billing');
  return db.select().from(quotations).where(isNull(quotations.deletedAt)).orderBy(quotations.createdAt);
}

export async function adminGetAllInvoices() {
  const { invoices } = await import('@/db/schema/billing');
  return db.select().from(invoices).where(isNull(invoices.deletedAt)).orderBy(invoices.createdAt);
}

export async function adminGetAllTickets() {
  const { supportTickets } = await import('@/db/schema/support');
  return db.select().from(supportTickets).where(isNull(supportTickets.deletedAt)).orderBy(supportTickets.createdAt);
}

export async function adminGetServices() {
  const { services, categories } = await import('@/db/schema/services');
  const svcs = await db.select().from(services).where(eq(services.isActive, true)).orderBy(services.displayOrder);
  const cats = await db.select().from(categories).where(isNull(categories.deletedAt)).orderBy(categories.displayOrder);
  return { services: svcs, categories: cats };
}

export async function adminGetFormTemplates() {
  const { serviceFormTemplates, services } = await import('@/db/schema/services');
  return db.select({
    id: serviceFormTemplates.id,
    name: serviceFormTemplates.name,
    serviceName: services.name,
  }).from(serviceFormTemplates).leftJoin(services, eq(serviceFormTemplates.serviceId, services.id)).orderBy(serviceFormTemplates.name);
}

export async function adminGetFormFields(templateId: string) {
  const { serviceFormFields } = await import('@/db/schema/services');
  return db.select().from(serviceFormFields).where(eq(serviceFormFields.templateId, templateId)).orderBy(serviceFormFields.displayOrder);
}

export async function adminGetFormOptions(fieldId: string) {
  const { serviceFormOptions } = await import('@/db/schema/services');
  return db.select().from(serviceFormOptions).where(eq(serviceFormOptions.fieldId, fieldId)).orderBy(serviceFormOptions.displayOrder);
}
