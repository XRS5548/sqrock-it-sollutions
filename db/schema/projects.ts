import { pgTable, uuid, text, integer, timestamp, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { projectStatusEnum, priorityEnum, milestoneStatusEnum, deliverableStatusEnum, taskStatusEnum } from './system';

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  requestId: uuid('request_id'),
  quotationId: uuid('quotation_id'),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  status: projectStatusEnum('status').default('planning').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  progressPercentage: integer('progress_percentage').default(0).notNull(),
  startDate: timestamp('start_date'),
  expectedEndDate: timestamp('expected_end_date'),
  completedAt: timestamp('completed_at'),
  budget: integer('budget'),
  currency: text('currency').default('INR'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('projects_user_id_idx').on(table.userId),
  index('projects_status_idx').on(table.status),
  index('projects_request_id_idx').on(table.requestId),
  index('projects_quotation_id_idx').on(table.quotationId),
]);

export const projectMembers = pgTable('project_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  role: text('role'),
  hourlyRate: integer('hourly_rate'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('project_members_project_id_idx').on(table.projectId),
  index('project_members_user_id_idx').on(table.userId),
]);

export const projectMilestones = pgTable('project_milestones', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  status: milestoneStatusEnum('status').default('pending').notNull(),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  progressPercentage: integer('progress_percentage').default(0).notNull(),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('milestones_project_id_idx').on(table.projectId),
  index('milestones_status_idx').on(table.status),
]);

export const projectDeliverables = pgTable('project_deliverables', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  milestoneId: uuid('milestone_id').references(() => projectMilestones.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  description: text('description'),
  status: deliverableStatusEnum('status').default('pending').notNull(),
  fileUrl: text('file_url'),
  dueDate: timestamp('due_date'),
  deliveredAt: timestamp('delivered_at'),
  approvedAt: timestamp('approved_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('deliverables_project_id_idx').on(table.projectId),
  index('deliverables_milestone_id_idx').on(table.milestoneId),
  index('deliverables_status_idx').on(table.status),
]);

export const projectTasks = pgTable('project_tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  milestoneId: uuid('milestone_id').references(() => projectMilestones.id, { onDelete: 'set null' }),
  assignedTo: text('assigned_to'),
  title: text('title').notNull(),
  description: text('description'),
  status: taskStatusEnum('status').default('todo').notNull(),
  priority: priorityEnum('priority').default('medium').notNull(),
  estimatedHours: integer('estimated_hours'),
  actualHours: integer('actual_hours'),
  dueDate: timestamp('due_date'),
  completedAt: timestamp('completed_at'),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('tasks_project_id_idx').on(table.projectId),
  index('tasks_milestone_id_idx').on(table.milestoneId),
  index('tasks_assigned_to_idx').on(table.assignedTo),
  index('tasks_status_idx').on(table.status),
]);

export const projectComments = pgTable('project_comments', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  taskId: uuid('task_id').references(() => projectTasks.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
}, (table) => [
  index('comments_project_id_idx').on(table.projectId),
  index('comments_task_id_idx').on(table.taskId),
  index('comments_user_id_idx').on(table.userId),
]);

export const projectFiles = pgTable('project_files', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  taskId: uuid('task_id').references(() => projectTasks.id, { onDelete: 'set null' }),
  milestoneId: uuid('milestone_id').references(() => projectMilestones.id, { onDelete: 'set null' }),
  uploadedBy: text('uploaded_by').notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(),
  fileSize: integer('file_size'),
  fileType: text('file_type'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('project_files_project_id_idx').on(table.projectId),
  index('project_files_task_id_idx').on(table.taskId),
  index('project_files_milestone_id_idx').on(table.milestoneId),
]);

export const projectActivityLogs = pgTable('project_activity_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  activityType: text('activity_type').notNull(),
  description: text('description').notNull(),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('project_activity_logs_project_id_idx').on(table.projectId),
  index('project_activity_logs_user_id_idx').on(table.userId),
]);

export const projectStatusHistory = pgTable('project_status_history', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  oldStatus: projectStatusEnum('old_status'),
  newStatus: projectStatusEnum('new_status').notNull(),
  changedBy: text('changed_by').notNull(),
  reason: text('reason'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('project_status_history_project_id_idx').on(table.projectId),
]);

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectMember = typeof projectMembers.$inferSelect;
export type NewProjectMember = typeof projectMembers.$inferInsert;
export type ProjectMilestone = typeof projectMilestones.$inferSelect;
export type NewProjectMilestone = typeof projectMilestones.$inferInsert;
export type ProjectDeliverable = typeof projectDeliverables.$inferSelect;
export type NewProjectDeliverable = typeof projectDeliverables.$inferInsert;
export type ProjectTask = typeof projectTasks.$inferSelect;
export type NewProjectTask = typeof projectTasks.$inferInsert;
export type ProjectComment = typeof projectComments.$inferSelect;
export type NewProjectComment = typeof projectComments.$inferInsert;
export type ProjectFile = typeof projectFiles.$inferSelect;
export type NewProjectFile = typeof projectFiles.$inferInsert;
export type ProjectActivityLog = typeof projectActivityLogs.$inferSelect;
export type NewProjectActivityLog = typeof projectActivityLogs.$inferInsert;
export type ProjectStatusHistoryEntry = typeof projectStatusHistory.$inferSelect;
export type NewProjectStatusHistoryEntry = typeof projectStatusHistory.$inferInsert;
