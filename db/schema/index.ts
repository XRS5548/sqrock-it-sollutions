import { relations } from 'drizzle-orm';
import { user } from '@/auth-schema';
import {
  categories, services, subServices,
  serviceFormTemplates, serviceFormFields, serviceFormOptions,
  serviceRequests, serviceRequestAnswers, requestFiles,
} from './services';
import {
  leads, leadNotes, leadActivities, leadStatusHistory, reviews,
} from './crm';
import {
  quotations, quotationItems, quotationVersions, quotationStatusHistory,
  invoices, invoiceItems,
} from './billing';
import {
  projects, projectMembers, projectMilestones, projectDeliverables,
  projectTasks, projectComments, projectFiles, projectActivityLogs,
  projectStatusHistory,
} from './projects';
import {
  supportTickets, ticketMessages, ticketAttachments,
} from './support';
import {
  notifications, activityLogs,
} from './system';

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryChildren',
  }),
  children: many(categories, {
    relationName: 'categoryChildren',
  }),
  services: many(services),
}));

export const servicesRelations = relations(services, ({ one, many }) => ({
  category: one(categories, {
    fields: [services.categoryId],
    references: [categories.id],
  }),
  subServices: many(subServices),
  formTemplates: many(serviceFormTemplates),
  requests: many(serviceRequests),
}));

export const subServicesRelations = relations(subServices, ({ one }) => ({
  service: one(services, {
    fields: [subServices.serviceId],
    references: [services.id],
  }),
}));

export const serviceFormTemplatesRelations = relations(serviceFormTemplates, ({ one, many }) => ({
  service: one(services, {
    fields: [serviceFormTemplates.serviceId],
    references: [services.id],
  }),
  fields: many(serviceFormFields),
}));

export const serviceFormFieldsRelations = relations(serviceFormFields, ({ one, many }) => ({
  template: one(serviceFormTemplates, {
    fields: [serviceFormFields.templateId],
    references: [serviceFormTemplates.id],
  }),
  options: many(serviceFormOptions),
  answers: many(serviceRequestAnswers),
}));

export const serviceFormOptionsRelations = relations(serviceFormOptions, ({ one }) => ({
  field: one(serviceFormFields, {
    fields: [serviceFormOptions.fieldId],
    references: [serviceFormFields.id],
  }),
}));

export const serviceRequestsRelations = relations(serviceRequests, ({ one, many }) => ({
  user: one(user, {
    fields: [serviceRequests.userId],
    references: [user.id],
  }),
  service: one(services, {
    fields: [serviceRequests.serviceId],
    references: [services.id],
  }),
  answers: many(serviceRequestAnswers),
  files: many(requestFiles),
  quotation: one(quotations, {
    fields: [serviceRequests.id],
    references: [quotations.requestId],
  }),
  project: one(projects, {
    fields: [serviceRequests.id],
    references: [projects.requestId],
  }),
}));

export const serviceRequestAnswersRelations = relations(serviceRequestAnswers, ({ one }) => ({
  request: one(serviceRequests, {
    fields: [serviceRequestAnswers.requestId],
    references: [serviceRequests.id],
  }),
  field: one(serviceFormFields, {
    fields: [serviceRequestAnswers.fieldId],
    references: [serviceFormFields.id],
  }),
}));

export const requestFilesRelations = relations(requestFiles, ({ one }) => ({
  request: one(serviceRequests, {
    fields: [requestFiles.requestId],
    references: [serviceRequests.id],
  }),
}));

export const leadsRelations = relations(leads, ({ one, many }) => ({
  assignedToUser: one(user, {
    fields: [leads.assignedTo],
    references: [user.id],
  }),
  convertedRequest: one(serviceRequests, {
    fields: [leads.convertedToRequestId],
    references: [serviceRequests.id],
  }),
  notes: many(leadNotes),
  activities: many(leadActivities),
  statusHistory: many(leadStatusHistory),
  quotations: many(quotations),
}));

export const leadNotesRelations = relations(leadNotes, ({ one }) => ({
  lead: one(leads, {
    fields: [leadNotes.leadId],
    references: [leads.id],
  }),
  user: one(user, {
    fields: [leadNotes.userId],
    references: [user.id],
  }),
}));

export const leadActivitiesRelations = relations(leadActivities, ({ one }) => ({
  lead: one(leads, {
    fields: [leadActivities.leadId],
    references: [leads.id],
  }),
  user: one(user, {
    fields: [leadActivities.userId],
    references: [user.id],
  }),
}));

export const leadStatusHistoryRelations = relations(leadStatusHistory, ({ one }) => ({
  lead: one(leads, {
    fields: [leadStatusHistory.leadId],
    references: [leads.id],
  }),
  changedByUser: one(user, {
    fields: [leadStatusHistory.changedBy],
    references: [user.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(user, {
    fields: [reviews.userId],
    references: [user.id],
  }),
  project: one(projects, {
    fields: [reviews.projectId],
    references: [projects.id],
  }),
  service: one(services, {
    fields: [reviews.serviceId],
    references: [services.id],
  }),
}));

export const quotationsRelations = relations(quotations, ({ one, many }) => ({
  request: one(serviceRequests, {
    fields: [quotations.requestId],
    references: [serviceRequests.id],
  }),
  lead: one(leads, {
    fields: [quotations.leadId],
    references: [leads.id],
  }),
  client: one(user, {
    fields: [quotations.userId],
    references: [user.id],
  }),
  creator: one(user, {
    fields: [quotations.createdBy],
    references: [user.id],
  }),
  items: many(quotationItems),
  versions: many(quotationVersions),
  statusHistory: many(quotationStatusHistory),
  project: one(projects, {
    fields: [quotations.id],
    references: [projects.quotationId],
  }),
}));

export const quotationItemsRelations = relations(quotationItems, ({ one }) => ({
  quotation: one(quotations, {
    fields: [quotationItems.quotationId],
    references: [quotations.id],
  }),
}));

export const quotationVersionsRelations = relations(quotationVersions, ({ one }) => ({
  quotation: one(quotations, {
    fields: [quotationVersions.quotationId],
    references: [quotations.id],
  }),
}));

export const quotationStatusHistoryRelations = relations(quotationStatusHistory, ({ one }) => ({
  quotation: one(quotations, {
    fields: [quotationStatusHistory.quotationId],
    references: [quotations.id],
  }),
  changedByUser: one(user, {
    fields: [quotationStatusHistory.changedBy],
    references: [user.id],
  }),
}));

export const invoicesRelations = relations(invoices, ({ one, many }) => ({
  project: one(projects, {
    fields: [invoices.projectId],
    references: [projects.id],
  }),
  quotation: one(quotations, {
    fields: [invoices.quotationId],
    references: [quotations.id],
  }),
  client: one(user, {
    fields: [invoices.userId],
    references: [user.id],
  }),
  items: many(invoiceItems),
}));

export const invoiceItemsRelations = relations(invoiceItems, ({ one }) => ({
  invoice: one(invoices, {
    fields: [invoiceItems.invoiceId],
    references: [invoices.id],
  }),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  request: one(serviceRequests, {
    fields: [projects.requestId],
    references: [serviceRequests.id],
  }),
  quotation: one(quotations, {
    fields: [projects.quotationId],
    references: [quotations.id],
  }),
  client: one(user, {
    fields: [projects.userId],
    references: [user.id],
  }),
  members: many(projectMembers),
  milestones: many(projectMilestones),
  deliverables: many(projectDeliverables),
  tasks: many(projectTasks),
  comments: many(projectComments),
  files: many(projectFiles),
  activityLogs: many(projectActivityLogs),
  statusHistory: many(projectStatusHistory),
  invoices: many(invoices),
  tickets: many(supportTickets),
}));

export const projectMembersRelations = relations(projectMembers, ({ one }) => ({
  project: one(projects, {
    fields: [projectMembers.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [projectMembers.userId],
    references: [user.id],
  }),
}));

export const projectMilestonesRelations = relations(projectMilestones, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectMilestones.projectId],
    references: [projects.id],
  }),
  tasks: many(projectTasks),
  deliverables: many(projectDeliverables),
  files: many(projectFiles),
}));

export const projectDeliverablesRelations = relations(projectDeliverables, ({ one }) => ({
  project: one(projects, {
    fields: [projectDeliverables.projectId],
    references: [projects.id],
  }),
  milestone: one(projectMilestones, {
    fields: [projectDeliverables.milestoneId],
    references: [projectMilestones.id],
  }),
}));

export const projectTasksRelations = relations(projectTasks, ({ one, many }) => ({
  project: one(projects, {
    fields: [projectTasks.projectId],
    references: [projects.id],
  }),
  milestone: one(projectMilestones, {
    fields: [projectTasks.milestoneId],
    references: [projectMilestones.id],
  }),
  assignee: one(user, {
    fields: [projectTasks.assignedTo],
    references: [user.id],
  }),
  comments: many(projectComments),
  files: many(projectFiles),
}));

export const projectCommentsRelations = relations(projectComments, ({ one }) => ({
  project: one(projects, {
    fields: [projectComments.projectId],
    references: [projects.id],
  }),
  task: one(projectTasks, {
    fields: [projectComments.taskId],
    references: [projectTasks.id],
  }),
  user: one(user, {
    fields: [projectComments.userId],
    references: [user.id],
  }),
}));

export const projectFilesRelations = relations(projectFiles, ({ one }) => ({
  project: one(projects, {
    fields: [projectFiles.projectId],
    references: [projects.id],
  }),
  task: one(projectTasks, {
    fields: [projectFiles.taskId],
    references: [projectTasks.id],
  }),
  milestone: one(projectMilestones, {
    fields: [projectFiles.milestoneId],
    references: [projectMilestones.id],
  }),
  uploader: one(user, {
    fields: [projectFiles.uploadedBy],
    references: [user.id],
  }),
}));

export const projectActivityLogsRelations = relations(projectActivityLogs, ({ one }) => ({
  project: one(projects, {
    fields: [projectActivityLogs.projectId],
    references: [projects.id],
  }),
  user: one(user, {
    fields: [projectActivityLogs.userId],
    references: [user.id],
  }),
}));

export const projectStatusHistoryRelations = relations(projectStatusHistory, ({ one }) => ({
  project: one(projects, {
    fields: [projectStatusHistory.projectId],
    references: [projects.id],
  }),
  changedByUser: one(user, {
    fields: [projectStatusHistory.changedBy],
    references: [user.id],
  }),
}));

export const supportTicketsRelations = relations(supportTickets, ({ one, many }) => ({
  creator: one(user, {
    fields: [supportTickets.userId],
    references: [user.id],
  }),
  project: one(projects, {
    fields: [supportTickets.projectId],
    references: [projects.id],
  }),
  assignee: one(user, {
    fields: [supportTickets.assignedTo],
    references: [user.id],
  }),
  messages: many(ticketMessages),
  attachments: many(ticketAttachments),
}));

export const ticketMessagesRelations = relations(ticketMessages, ({ one, many }) => ({
  ticket: one(supportTickets, {
    fields: [ticketMessages.ticketId],
    references: [supportTickets.id],
  }),
  user: one(user, {
    fields: [ticketMessages.userId],
    references: [user.id],
  }),
  attachments: many(ticketAttachments),
}));

export const ticketAttachmentsRelations = relations(ticketAttachments, ({ one }) => ({
  ticket: one(supportTickets, {
    fields: [ticketAttachments.ticketId],
    references: [supportTickets.id],
  }),
  message: one(ticketMessages, {
    fields: [ticketAttachments.messageId],
    references: [ticketMessages.id],
  }),
  uploader: one(user, {
    fields: [ticketAttachments.uploadedBy],
    references: [user.id],
  }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  user: one(user, {
    fields: [notifications.userId],
    references: [user.id],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(user, {
    fields: [activityLogs.userId],
    references: [user.id],
  }),
}));

export * from './system';
export * from './services';
export * from './crm';
export * from './billing';
export * from './projects';
export * from './support';
