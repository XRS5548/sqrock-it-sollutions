import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { leadStatusEnum } from './system';

export const leads = pgTable('leads', {
  id: uuid('id').defaultRandom().primaryKey(),
  source: text('source'),
  leadStatus: leadStatusEnum('lead_status').default('new').notNull(),
  userId: text('user_id'),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  company: text('company'),
  serviceInterest: text('service_interest'),
  budgetRange: text('budget_range'),
  description: text('description'),
  convertedToRequestId: uuid('converted_to_request_id'),
  convertedAt: timestamp('converted_at'),
  assignedTo: text('assigned_to'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('leads_email_idx').on(table.email),
  index('leads_status_idx').on(table.leadStatus),
  index('leads_assigned_to_idx').on(table.assignedTo),
  index('leads_source_idx').on(table.source),
]);

export const leadNotes = pgTable('lead_notes', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('lead_notes_lead_id_idx').on(table.leadId),
]);

export const leadActivities = pgTable('lead_activities', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  activityType: text('activity_type').notNull(),
  description: text('description'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('lead_activities_lead_id_idx').on(table.leadId),
  index('lead_activities_type_idx').on(table.activityType),
]);

export const leadStatusHistory = pgTable('lead_status_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  leadId: uuid('lead_id').notNull().references(() => leads.id, { onDelete: 'cascade' }),
  oldStatus: leadStatusEnum('old_status'),
  newStatus: leadStatusEnum('new_status').notNull(),
  changedBy: text('changed_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('lead_status_history_lead_id_idx').on(table.leadId),
]);

export const reviews = pgTable('reviews', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  projectId: uuid('project_id'),
  serviceId: uuid('service_id'),
  rating: integer('rating').notNull(),
  title: text('title'),
  content: text('content'),
  isApproved: boolean('is_approved').default(false).notNull(),
  isFeatured: boolean('is_featured').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('reviews_user_id_idx').on(table.userId),
  index('reviews_service_id_idx').on(table.serviceId),
  index('reviews_is_approved_idx').on(table.isApproved),
  index('reviews_is_featured_idx').on(table.isFeatured),
]);

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
export type LeadNote = typeof leadNotes.$inferSelect;
export type NewLeadNote = typeof leadNotes.$inferInsert;
export type LeadActivity = typeof leadActivities.$inferSelect;
export type NewLeadActivity = typeof leadActivities.$inferInsert;
export type LeadStatusHistoryEntry = typeof leadStatusHistory.$inferSelect;
export type NewLeadStatusHistoryEntry = typeof leadStatusHistory.$inferInsert;
export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
