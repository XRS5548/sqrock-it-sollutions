import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { quotationStatusEnum, invoiceStatusEnum } from './system';

export const quotations = pgTable('quotations', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id'),
  leadId: uuid('lead_id'),
  userId: text('user_id').notNull(),
  quotationNumber: text('quotation_number').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  subtotal: integer('subtotal').default(0).notNull(),
  taxPercentage: integer('tax_percentage').default(0),
  taxAmount: integer('tax_amount').default(0).notNull(),
  discountPercentage: integer('discount_percentage').default(0),
  discountAmount: integer('discount_amount').default(0).notNull(),
  totalAmount: integer('total_amount').default(0).notNull(),
  currency: text('currency').default('INR'),
  validUntil: timestamp('valid_until'),
  status: quotationStatusEnum('status').default('draft').notNull(),
  notes: text('notes'),
  termsConditions: text('terms_conditions'),
  createdBy: text('created_by').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('quotations_user_id_idx').on(table.userId),
  index('quotations_status_idx').on(table.status),
  index('quotations_request_id_idx').on(table.requestId),
  index('quotations_lead_id_idx').on(table.leadId),
  index('quotations_number_idx').on(table.quotationNumber),
]);

export const quotationItems = pgTable('quotation_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  quotationId: uuid('quotation_id').notNull().references(() => quotations.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: integer('unit_price').notNull(),
  totalPrice: integer('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('quotation_items_quotation_id_idx').on(table.quotationId),
]);

export const quotationVersions = pgTable('quotation_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  quotationId: uuid('quotation_id').notNull().references(() => quotations.id, { onDelete: 'cascade' }),
  versionNumber: integer('version_number').notNull(),
  dataSnapshot: jsonb('data_snapshot').notNull(),
  createdBy: text('created_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('quotation_versions_quotation_id_idx').on(table.quotationId),
  uniqueIndex('quotation_versions_number_idx').on(table.quotationId, table.versionNumber),
]);

export const quotationStatusHistory = pgTable('quotation_status_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  quotationId: uuid('quotation_id').notNull().references(() => quotations.id, { onDelete: 'cascade' }),
  oldStatus: quotationStatusEnum('old_status'),
  newStatus: quotationStatusEnum('new_status').notNull(),
  changedBy: text('changed_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('quotation_status_history_quotation_id_idx').on(table.quotationId),
]);

export const invoices = pgTable('invoices', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id'),
  quotationId: uuid('quotation_id'),
  userId: text('user_id').notNull(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  status: invoiceStatusEnum('status').default('draft').notNull(),
  subtotal: integer('subtotal').default(0).notNull(),
  taxPercentage: integer('tax_percentage').default(0),
  taxAmount: integer('tax_amount').default(0).notNull(),
  discountPercentage: integer('discount_percentage').default(0),
  discountAmount: integer('discount_amount').default(0).notNull(),
  totalAmount: integer('total_amount').default(0).notNull(),
  amountPaid: integer('amount_paid').default(0).notNull(),
  balanceDue: integer('balance_due').default(0).notNull(),
  currency: text('currency').default('INR'),
  issueDate: timestamp('issue_date'),
  dueDate: timestamp('due_date'),
  paidAt: timestamp('paid_at'),
  notes: text('notes'),
  termsConditions: text('terms_conditions'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('invoices_user_id_idx').on(table.userId),
  index('invoices_status_idx').on(table.status),
  index('invoices_project_id_idx').on(table.projectId),
  index('invoices_quotation_id_idx').on(table.quotationId),
  index('invoices_number_idx').on(table.invoiceNumber),
]);

export const invoiceItems = pgTable('invoice_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  invoiceId: uuid('invoice_id').notNull().references(() => invoices.id, { onDelete: 'cascade' }),
  description: text('description').notNull(),
  quantity: integer('quantity').default(1).notNull(),
  unitPrice: integer('unit_price').notNull(),
  totalPrice: integer('total_price').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('invoice_items_invoice_id_idx').on(table.invoiceId),
]);

export type Quotation = typeof quotations.$inferSelect;
export type NewQuotation = typeof quotations.$inferInsert;
export type QuotationItem = typeof quotationItems.$inferSelect;
export type NewQuotationItem = typeof quotationItems.$inferInsert;
export type QuotationVersion = typeof quotationVersions.$inferSelect;
export type NewQuotationVersion = typeof quotationVersions.$inferInsert;
export type QuotationStatusHistoryEntry = typeof quotationStatusHistory.$inferSelect;
export type NewQuotationStatusHistoryEntry = typeof quotationStatusHistory.$inferInsert;
export type Invoice = typeof invoices.$inferSelect;
export type NewInvoice = typeof invoices.$inferInsert;
export type InvoiceItem = typeof invoiceItems.$inferSelect;
export type NewInvoiceItem = typeof invoiceItems.$inferInsert;
