import { db } from '@/db';
import { eq, and, desc, isNull } from 'drizzle-orm';
import { quotations, quotationItems, invoices, invoiceItems } from '@/db/schema';

export async function getUserQuotations(userId: string) {
  return db.select().from(quotations).where(and(eq(quotations.userId, userId), isNull(quotations.deletedAt))).orderBy(desc(quotations.createdAt));
}

export async function getQuotationById(id: string) {
  const result = await db.select().from(quotations).where(eq(quotations.id, id)).limit(1);
  return result[0];
}

export async function getQuotationWithItems(id: string) {
  const quotation = await getQuotationById(id);
  if (!quotation) return null;
  const items = await db.select().from(quotationItems).where(eq(quotationItems.quotationId, id));
  return { ...quotation, items };
}

export async function getUserInvoices(userId: string) {
  return db.select().from(invoices).where(and(eq(invoices.userId, userId), isNull(invoices.deletedAt))).orderBy(desc(invoices.createdAt));
}

export async function getInvoiceById(id: string) {
  const result = await db.select().from(invoices).where(eq(invoices.id, id)).limit(1);
  return result[0];
}

export async function getInvoiceWithItems(id: string) {
  const invoice = await getInvoiceById(id);
  if (!invoice) return null;
  const items = await db.select().from(invoiceItems).where(eq(invoiceItems.invoiceId, id));
  return { ...invoice, items };
}

export async function getAllQuotations() {
  return db.select().from(quotations).where(isNull(quotations.deletedAt)).orderBy(desc(quotations.createdAt));
}

export async function getAllInvoices() {
  return db.select().from(invoices).where(isNull(invoices.deletedAt)).orderBy(desc(invoices.createdAt));
}
