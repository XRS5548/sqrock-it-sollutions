import { pgEnum, pgTable, uuid, text, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';

export const requestStatusEnum = pgEnum('request_status', ['draft', 'pending', 'approved', 'rejected', 'cancelled']);
export const priorityEnum = pgEnum('priority', ['low', 'medium', 'high', 'urgent', 'critical']);
export const projectStatusEnum = pgEnum('project_status', ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled', 'archived']);
export const milestoneStatusEnum = pgEnum('milestone_status', ['pending', 'in_progress', 'completed', 'delayed']);
export const deliverableStatusEnum = pgEnum('deliverable_status', ['pending', 'in_progress', 'completed', 'approved', 'rejected', 'needs_revision']);
export const taskStatusEnum = pgEnum('task_status', ['todo', 'in_progress', 'review', 'done']);
export const ticketStatusEnum = pgEnum('ticket_status', ['open', 'in_progress', 'waiting_on_client', 'waiting_on_team', 'resolved', 'closed']);
export const ticketPriorityEnum = pgEnum('ticket_priority', ['low', 'medium', 'high', 'urgent']);
export const leadStatusEnum = pgEnum('lead_status', ['new', 'contacted', 'qualified', 'proposal', 'negotiation', 'won', 'lost', 'archived']);
export const quotationStatusEnum = pgEnum('quotation_status', ['draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired', 'revised']);
export const invoiceStatusEnum = pgEnum('invoice_status', ['draft', 'sent', 'viewed', 'partially_paid', 'paid', 'overdue', 'cancelled', 'refunded']);
export const notificationTypeEnum = pgEnum('notification_type', [
  'project_update', 'status_change', 'support_reply',
  'invoice_update', 'quotation_update', 'lead_update',
  'review_received', 'general',
]);

export type RequestStatus = (typeof requestStatusEnum.enumValues)[number];
export type Priority = (typeof priorityEnum.enumValues)[number];
export type ProjectStatus = (typeof projectStatusEnum.enumValues)[number];
export type MilestoneStatus = (typeof milestoneStatusEnum.enumValues)[number];
export type DeliverableStatus = (typeof deliverableStatusEnum.enumValues)[number];
export type TaskStatus = (typeof taskStatusEnum.enumValues)[number];
export type TicketStatus = (typeof ticketStatusEnum.enumValues)[number];
export type TicketPriority = (typeof ticketPriorityEnum.enumValues)[number];
export type LeadStatus = (typeof leadStatusEnum.enumValues)[number];
export type QuotationStatus = (typeof quotationStatusEnum.enumValues)[number];
export type InvoiceStatus = (typeof invoiceStatusEnum.enumValues)[number];
export type NotificationType = (typeof notificationTypeEnum.enumValues)[number];

export const notifications = pgTable('notifications', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  type: notificationTypeEnum('type').notNull(),
  title: text('title').notNull(),
  message: text('message'),
  link: text('link'),
  referenceId: text('reference_id'),
  referenceType: text('reference_type'),
  isRead: boolean('is_read').default(false).notNull(),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('notifications_user_id_idx').on(table.userId),
  index('notifications_is_read_idx').on(table.isRead),
  index('notifications_user_id_is_read_idx').on(table.userId, table.isRead),
  index('notifications_created_at_idx').on(table.createdAt),
]);

export const activityLogs = pgTable('activity_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id'),
  action: text('action').notNull(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id'),
  description: text('description'),
  metadata: jsonb('metadata').default({}),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('activity_logs_user_id_idx').on(table.userId),
  index('activity_logs_entity_idx').on(table.entityType, table.entityId),
  index('activity_logs_created_at_idx').on(table.createdAt),
]);

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
