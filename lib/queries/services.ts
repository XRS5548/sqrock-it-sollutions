import { db } from '@/db';
import { eq, and, asc, desc, isNull, sql } from 'drizzle-orm';
import {
  categories, services, subServices,
  serviceFormTemplates, serviceFormFields, serviceFormOptions,
  serviceRequests, serviceRequestAnswers, requestFiles,
} from '@/db/schema';

export async function getCategories() {
  return db.select().from(categories).where(and(eq(categories.isActive, true), isNull(categories.deletedAt))).orderBy(asc(categories.displayOrder));
}

export async function getCategoryBySlug(slug: string) {
  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result[0];
}

export async function getServices() {
  return db.select().from(services).where(and(eq(services.isActive, true), isNull(services.deletedAt))).orderBy(asc(services.displayOrder));
}

export async function getServicesByCategory(categoryId: string) {
  return db.select().from(services).where(and(eq(services.categoryId, categoryId), eq(services.isActive, true), isNull(services.deletedAt))).orderBy(asc(services.displayOrder));
}

export async function getServiceBySlug(slug: string) {
  const result = await db.select().from(services).where(eq(services.slug, slug)).limit(1);
  return result[0];
}

export async function getSubServices(serviceId: string) {
  return db.select().from(subServices).where(and(eq(subServices.serviceId, serviceId), eq(subServices.isActive, true), isNull(subServices.deletedAt))).orderBy(asc(subServices.displayOrder));
}

export async function getFormTemplates(serviceId: string) {
  return db.select().from(serviceFormTemplates).where(and(eq(serviceFormTemplates.serviceId, serviceId), eq(serviceFormTemplates.isActive, true), isNull(serviceFormTemplates.deletedAt)));
}

export async function getFormFields(templateId: string) {
  return db.select().from(serviceFormFields).where(and(eq(serviceFormFields.templateId, templateId), isNull(serviceFormFields.deletedAt))).orderBy(asc(serviceFormFields.displayOrder));
}

export async function getFormOptions(fieldId: string) {
  return db.select().from(serviceFormOptions).where(eq(serviceFormOptions.fieldId, fieldId)).orderBy(asc(serviceFormOptions.displayOrder));
}

export async function getUserRequests(userId: string) {
  return db.select().from(serviceRequests).where(eq(serviceRequests.userId, userId)).orderBy(desc(serviceRequests.createdAt));
}

export async function getRequestById(id: string) {
  const result = await db.select().from(serviceRequests).where(eq(serviceRequests.id, id)).limit(1);
  return result[0];
}

export async function getRequestWithAnswers(id: string) {
  const request = await getRequestById(id);
  if (!request) return null;
  const answers = await db.select().from(serviceRequestAnswers).where(eq(serviceRequestAnswers.requestId, id));
  const files = await db.select().from(requestFiles).where(eq(requestFiles.requestId, id));
  return { ...request, answers, files };
}

export async function getAllRequests() {
  return db.select().from(serviceRequests).where(isNull(serviceRequests.deletedAt)).orderBy(desc(serviceRequests.createdAt));
}
