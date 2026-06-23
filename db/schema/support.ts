import { pgTable, uuid, text, integer, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { ticketStatusEnum, ticketPriorityEnum } from './system';

export const supportTickets = pgTable('support_tickets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  projectId: uuid('project_id'),
  subject: text('subject').notNull(),
  description: text('description'),
  status: ticketStatusEnum('status').default('open').notNull(),
  priority: ticketPriorityEnum('priority').default('medium').notNull(),
  category: text('category'),
  assignedTo: text('assigned_to'),
  resolvedAt: timestamp('resolved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('tickets_user_id_idx').on(table.userId),
  index('tickets_status_idx').on(table.status),
  index('tickets_priority_idx').on(table.priority),
  index('tickets_assigned_to_idx').on(table.assignedTo),
  index('tickets_project_id_idx').on(table.projectId),
]);

export const ticketMessages = pgTable('ticket_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  ticketId: uuid('ticket_id').notNull().references(() => supportTickets.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  isInternal: boolean('is_internal').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('ticket_messages_ticket_id_idx').on(table.ticketId),
  index('ticket_messages_user_id_idx').on(table.userId),
]);

export const ticketAttachments = pgTable('ticket_attachments', {
  id: uuid('id').defaultRandom().primaryKey(),
  ticketId: uuid('ticket_id').notNull().references(() => supportTickets.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id').references(() => ticketMessages.id, { onDelete: 'cascade' }),
  uploadedBy: text('uploaded_by').notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size'),
  fileType: text('file_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('ticket_attachments_ticket_id_idx').on(table.ticketId),
  index('ticket_attachments_message_id_idx').on(table.messageId),
]);

export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = typeof supportTickets.$inferInsert;
export type TicketMessage = typeof ticketMessages.$inferSelect;
export type NewTicketMessage = typeof ticketMessages.$inferInsert;
export type TicketAttachment = typeof ticketAttachments.$inferSelect;
export type NewTicketAttachment = typeof ticketAttachments.$inferInsert;
