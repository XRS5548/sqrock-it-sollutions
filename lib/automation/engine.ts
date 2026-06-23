import { db } from '@/db';
import { eq, and, isNull, sql } from 'drizzle-orm';
import { pgTable, uuid, text, timestamp, boolean, jsonb, index, pgEnum } from 'drizzle-orm/pg-core';

export const automationTriggerEnum = pgEnum('automation_trigger', [
  'project_completed',
  'milestone_completed',
  'request_approved',
  'invoice_paid',
  'ticket_resolved',
  'lead_status_changed',
  'review_submitted',
]);

export const automationActionEnum = pgEnum('automation_action', [
  'send_email',
  'create_notification',
  'update_status',
  'assign_team_member',
  'request_review',
  'create_task',
  'webhook',
]);

export const automations = pgTable('automations', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  trigger: automationTriggerEnum('trigger').notNull(),
  triggerConditions: jsonb('trigger_conditions').default({}),
  action: automationActionEnum('action').notNull(),
  actionConfig: jsonb('action_config').default({}),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull().$onUpdate(() => new Date()),
  deletedAt: timestamp('deleted_at'),
}, (table) => [
  index('automations_trigger_idx').on(table.trigger),
  index('automations_is_active_idx').on(table.isActive),
]);

export type Automation = typeof automations.$inferSelect;
export type NewAutomation = typeof automations.$inferInsert;

export async function processAutomations(trigger: string, context: Record<string, any>) {
  const rules = await db.select().from(automations).where(and(eq(automations.trigger, trigger as any), eq(automations.isActive, true), isNull(automations.deletedAt)));
  for (const rule of rules) {
    try {
      await executeAction(rule.action, rule.actionConfig as Record<string, any>, context);
    } catch (error) {
      console.error(`Automation rule "${rule.name}" failed:`, error);
    }
  }
}

async function executeAction(action: string, config: Record<string, any>, context: Record<string, any>) {
  switch (action) {
    case 'send_email': {
      const { sendEmail } = await import('@/lib/email');
      const to = config.to === 'client' ? context.clientEmail : config.to;
      if (to) await sendEmail(to, config.template, { ...context, ...config.templateData });
      break;
    }
    case 'create_notification': {
      const { notify } = await import('@/lib/notifications');
      await notify({
        userId: context.userId,
        type: 'general',
        title: config.title || 'Automated Notification',
        message: config.message,
        referenceId: context.referenceId,
        referenceType: context.referenceType,
      } as any);
      break;
    }
    case 'request_review': {
      const { createNotification } = await import('@/lib/actions/notifications');
      await createNotification({
        userId: context.userId,
        type: 'review_received',
        title: 'Please review your project',
        message: `Your project "${context.projectName}" is complete. Please leave a review.`,
        referenceId: context.referenceId,
        referenceType: 'project',
      } as any);
      break;
    }
    default:
      console.warn(`Unknown automation action: ${action}`);
  }
}
