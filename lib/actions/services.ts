'use server';

import { db } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  categories, services, subServices,
  serviceFormTemplates, serviceFormFields, serviceFormOptions,
  serviceRequests, serviceRequestAnswers, requestFiles,
} from '@/db/schema';
import type { NewServiceRequest, NewServiceRequestAnswer } from '@/db/schema';

export async function createRequest(data: NewServiceRequest) {
  const [request] = await db.insert(serviceRequests).values(data).returning();
  revalidatePath('/dashboard/requests');
  return request;
}

export async function updateRequest(id: string, data: Partial<NewServiceRequest>) {
  const [request] = await db.update(serviceRequests).set(data).where(eq(serviceRequests.id, id)).returning();
  revalidatePath('/dashboard/requests');
  return request;
}

export async function submitRequest(id: string) {
  const [request] = await db.update(serviceRequests).set({ status: 'pending', submittedAt: new Date() }).where(eq(serviceRequests.id, id)).returning();
  revalidatePath('/dashboard/requests');
  return request;
}

export async function deleteRequest(id: string) {
  await db.update(serviceRequests).set({ deletedAt: new Date() }).where(eq(serviceRequests.id, id));
  revalidatePath('/dashboard/requests');
}

export async function saveRequestAnswer(data: NewServiceRequestAnswer) {
  const existing = await db.select().from(serviceRequestAnswers).where(and(eq(serviceRequestAnswers.requestId, data.requestId), eq(serviceRequestAnswers.fieldId, data.fieldId))).limit(1);
  if (existing[0]) {
    const [answer] = await db.update(serviceRequestAnswers).set({ value: data.value }).where(eq(serviceRequestAnswers.id, existing[0].id)).returning();
    return answer;
  }
  const [answer] = await db.insert(serviceRequestAnswers).values(data).returning();
  return answer;
}

export async function createCategory(data: typeof categories.$inferInsert) {
  const [category] = await db.insert(categories).values(data).returning();
  revalidatePath('/admin/services');
  return category;
}

export async function updateCategory(id: string, data: Partial<typeof categories.$inferInsert>) {
  const [category] = await db.update(categories).set(data).where(eq(categories.id, id)).returning();
  revalidatePath('/admin/services');
  return category;
}

export async function deleteCategory(id: string) {
  await db.update(categories).set({ deletedAt: new Date() }).where(eq(categories.id, id));
  revalidatePath('/admin/services');
}

export async function createService(data: typeof services.$inferInsert) {
  const [service] = await db.insert(services).values(data).returning();
  revalidatePath('/admin/services');
  return service;
}

export async function updateService(id: string, data: Partial<typeof services.$inferInsert>) {
  const [service] = await db.update(services).set(data).where(eq(services.id, id)).returning();
  revalidatePath('/admin/services');
  return service;
}

export async function deleteService(id: string) {
  await db.update(services).set({ deletedAt: new Date() }).where(eq(services.id, id));
  revalidatePath('/admin/services');
}

export async function createFormTemplate(data: typeof serviceFormTemplates.$inferInsert) {
  const [template] = await db.insert(serviceFormTemplates).values(data).returning();
  revalidatePath('/admin/form-builder');
  return template;
}

export async function createFormField(data: typeof serviceFormFields.$inferInsert) {
  const [field] = await db.insert(serviceFormFields).values(data).returning();
  revalidatePath('/admin/form-builder');
  return field;
}

export async function updateFormField(id: string, data: Partial<typeof serviceFormFields.$inferInsert>) {
  const [field] = await db.update(serviceFormFields).set(data).where(eq(serviceFormFields.id, id)).returning();
  revalidatePath('/admin/form-builder');
  return field;
}

export async function deleteFormField(id: string) {
  await db.update(serviceFormFields).set({ deletedAt: new Date() }).where(eq(serviceFormFields.id, id));
  revalidatePath('/admin/form-builder');
}

export async function createFormOption(data: typeof serviceFormOptions.$inferInsert) {
  const [option] = await db.insert(serviceFormOptions).values(data).returning();
  return option;
}

export async function deleteFormOption(id: string) {
  await db.delete(serviceFormOptions).where(eq(serviceFormOptions.id, id));
}
