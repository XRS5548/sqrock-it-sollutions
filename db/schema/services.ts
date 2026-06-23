import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { requestStatusEnum, priorityEnum } from './system';

export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  icon: text('icon'),
  color: text('color'),
  displayOrder: integer('display_order').default(0),
  isActive: boolean('is_active').default(true).notNull(),
  parentId: uuid('parent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('categories_parent_id_idx').on(table.parentId),
  index('categories_slug_idx').on(table.slug),
  index('categories_is_active_idx').on(table.isActive),
]);

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  shortDescription: text('short_description'),
  icon: text('icon'),
  features: jsonb('features').default([]),
  technologies: jsonb('technologies').default([]),
  startingPrice: integer('starting_price'),
  estimatedDuration: text('estimated_duration'),
  isActive: boolean('is_active').default(true).notNull(),
  displayOrder: integer('display_order').default(0),
  categoryId: uuid('category_id').references(() => categories.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('services_category_id_idx').on(table.categoryId),
  index('services_slug_idx').on(table.slug),
  index('services_is_active_idx').on(table.isActive),
]);

export const subServices = pgTable('sub_services', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  displayOrder: integer('display_order').default(0),
  serviceId: uuid('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('sub_services_service_id_idx').on(table.serviceId),
  uniqueIndex('sub_services_service_slug_idx').on(table.serviceId, table.slug),
]);

export const serviceFormTemplates = pgTable('service_form_templates', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  serviceId: uuid('service_id').notNull().references(() => services.id, { onDelete: 'cascade' }),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('form_templates_service_id_idx').on(table.serviceId),
]);

export const serviceFormFields = pgTable('service_form_fields', {
  id: uuid('id').defaultRandom().primaryKey(),
  templateId: uuid('template_id').notNull().references(() => serviceFormTemplates.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  fieldType: text('field_type').notNull(),
  placeholder: text('placeholder'),
  helpText: text('help_text'),
  required: boolean('required').default(false).notNull(),
  displayOrder: integer('display_order').default(0),
  validationRules: jsonb('validation_rules').default({}),
  conditionalLogic: jsonb('conditional_logic').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('form_fields_template_id_idx').on(table.templateId),
  index('form_fields_display_order_idx').on(table.displayOrder),
]);

export const serviceFormOptions = pgTable('service_form_options', {
  id: uuid('id').defaultRandom().primaryKey(),
  fieldId: uuid('field_id').notNull().references(() => serviceFormFields.id, { onDelete: 'cascade' }),
  label: text('label').notNull(),
  value: text('value').notNull(),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('form_options_field_id_idx').on(table.fieldId),
]);

export const serviceRequests = pgTable('service_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  serviceId: uuid('service_id').notNull().references(() => services.id, { onDelete: 'restrict' }),
  title: text('title').notNull(),
  description: text('description'),
  status: requestStatusEnum('status').default('draft').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  budgetMin: integer('budget_min'),
  budgetMax: integer('budget_max'),
  timeline: text('timeline'),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('requests_user_id_idx').on(table.userId),
  index('requests_service_id_idx').on(table.serviceId),
  index('requests_status_idx').on(table.status),
  index('requests_user_status_idx').on(table.userId, table.status),
]);

export const serviceRequestAnswers = pgTable('service_request_answers', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id').notNull().references(() => serviceRequests.id, { onDelete: 'cascade' }),
  fieldId: uuid('field_id').notNull().references(() => serviceFormFields.id, { onDelete: 'restrict' }),
  value: text('value').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('answers_request_id_idx').on(table.requestId),
  index('answers_field_id_idx').on(table.fieldId),
  uniqueIndex('answers_request_field_idx').on(table.requestId, table.fieldId),
]);

export const requestFiles = pgTable('request_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id').notNull().references(() => serviceRequests.id, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  fileSize: integer('file_size'),
  fileType: text('file_type'),
  fileUrl: text('file_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('request_files_request_id_idx').on(table.requestId),
]);

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Service = typeof services.$inferSelect;
export type NewService = typeof services.$inferInsert;
export type SubService = typeof subServices.$inferSelect;
export type NewSubService = typeof subServices.$inferInsert;
export type ServiceFormTemplate = typeof serviceFormTemplates.$inferSelect;
export type NewServiceFormTemplate = typeof serviceFormTemplates.$inferInsert;
export type ServiceFormField = typeof serviceFormFields.$inferSelect;
export type NewServiceFormField = typeof serviceFormFields.$inferInsert;
export type ServiceFormOption = typeof serviceFormOptions.$inferSelect;
export type NewServiceFormOption = typeof serviceFormOptions.$inferInsert;
export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type NewServiceRequest = typeof serviceRequests.$inferInsert;
export type ServiceRequestAnswer = typeof serviceRequestAnswers.$inferSelect;
export type NewServiceRequestAnswer = typeof serviceRequestAnswers.$inferInsert;
export type RequestFile = typeof requestFiles.$inferSelect;
export type NewRequestFile = typeof requestFiles.$inferInsert;
