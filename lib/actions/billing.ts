'use server';

import { db } from '@/db';
import { eq, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  quotations, quotationItems, invoices, invoiceItems,
} from '@/db/schema';
import type { NewQuotation, NewQuotationItem, NewInvoice, NewInvoiceItem } from '@/db/schema';

export async function createQuotation(data: NewQuotation) {
  const [quotation] = await db.insert(quotations).values(data).returning();
  revalidatePath('/dashboard/quotations');
  revalidatePath('/admin/quotations');
  return quotation;
}

export async function updateQuotation(id: string, data: Partial<NewQuotation>) {
  const [quotation] = await db.update(quotations).set(data).where(eq(quotations.id, id)).returning();
  revalidatePath('/dashboard/quotations');
  revalidatePath('/admin/quotations');
  return quotation;
}

export async function addQuotationItem(data: NewQuotationItem) {
  const [item] = await db.insert(quotationItems).values(data).returning();
  return item;
}

export async function removeQuotationItem(id: string) {
  await db.delete(quotationItems).where(eq(quotationItems.id, id));
}

export async function createInvoice(data: NewInvoice) {
  const [invoice] = await db.insert(invoices).values(data).returning();
  revalidatePath('/dashboard/invoices');
  revalidatePath('/admin/invoices');
  return invoice;
}

export async function updateInvoice(id: string, data: Partial<NewInvoice>) {
  const [invoice] = await db.update(invoices).set(data).where(eq(invoices.id, id)).returning();
  if (data.status === 'paid') {
    await db.update(invoices).set({ paidAt: new Date(), balanceDue: 0 }).where(eq(invoices.id, id));
  }
  revalidatePath('/dashboard/invoices');
  revalidatePath('/admin/invoices');
  return invoice;
}

export async function addInvoiceItem(data: NewInvoiceItem) {
  const [item] = await db.insert(invoiceItems).values(data).returning();
  return item;
}
