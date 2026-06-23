'use server';

import { db } from '@/db';
import { eq, and, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import {
  projects,
} from '@/db/schema';
import { notifications } from '@/db/schema';
import { sendEmail } from '@/lib/email';
import { processAutomations } from '@/lib/automation/engine';
import type { NewProject } from '@/db/schema';

export async function createProject(data: NewProject) {
  const [project] = await db.insert(projects).values(data).returning();
  revalidatePath('/dashboard/projects');
  revalidatePath('/admin/projects');
  return project;
}

export async function updateProject(id: string, data: Partial<NewProject>) {
  const [project] = await db.update(projects).set(data).where(eq(projects.id, id)).returning();
  revalidatePath('/dashboard/projects');
  revalidatePath('/admin/projects');
  return project;
}

export async function addProjectMember(data: any) {
  const { projectMembers } = await import('@/db/schema');
  const [member] = await db.insert(projectMembers).values(data).returning();
  return member;
}

export async function createMilestone(data: any) {
  const { projectMilestones, projectActivityLogs } = await import('@/db/schema');
  const [milestone] = await db.insert(projectMilestones).values(data).returning();
  await db.insert(projectActivityLogs).values({
    projectId: data.projectId,
    userId: '',
    activityType: 'milestone_created',
    description: `Milestone "${data.title}" was created`,
  });
  revalidatePath('/dashboard/projects');
  return milestone;
}

export async function updateMilestone(id: string, data: any) {
  const { projectMilestones } = await import('@/db/schema');
  const [milestone] = await db.update(projectMilestones).set(data).where(eq(projectMilestones.id, id)).returning();
  if (data.status === 'completed') {
    await db.update(projectMilestones).set({ completedAt: new Date() }).where(eq(projectMilestones.id, id));
  }
  revalidatePath('/dashboard/projects');
  return milestone;
}

export async function updateProjectStatus(id: string, status: string, changedBy: string) {
  const oldProject = await db.select().from(projects).where(eq(projects.id, id)).limit(1).then(r => r[0]);
  if (!oldProject) throw new Error('Project not found');
  await db.update(projects).set({ status: status as any, ...(status === 'completed' ? { completedAt: new Date(), progressPercentage: 100 } : {}) }).where(eq(projects.id, id));
  const { projectStatusHistory, projectActivityLogs } = await import('@/db/schema');
  await db.insert(projectStatusHistory).values({ projectId: id, oldStatus: oldProject.status, newStatus: status as any, changedBy });
  await db.insert(projectActivityLogs).values({ projectId: id, userId: changedBy, activityType: 'status_change', description: `Status changed to ${status}` });

  if (status === 'completed') {
    const authSchema = await import('@/auth-schema');
    const client = await db.select().from(authSchema.user).where(eq(authSchema.user.id, oldProject.userId)).limit(1).then(r => r[0]);
    if (client) {
      await processAutomations('project_completed', {
        userId: client.id,
        clientEmail: client.email,
        referenceId: id,
        referenceType: 'project',
        projectName: oldProject.name,
      });
    }
  }
  revalidatePath('/dashboard/projects');
  revalidatePath('/admin/projects');
}

export async function createDeliverable(data: any) {
  const { projectDeliverables } = await import('@/db/schema');
  const [deliverable] = await db.insert(projectDeliverables).values(data).returning();
  return deliverable;
}

export async function updateDeliverable(id: string, data: any) {
  const { projectDeliverables } = await import('@/db/schema');
  const [deliverable] = await db.update(projectDeliverables).set(data).where(eq(projectDeliverables.id, id)).returning();
  if (data.status === 'delivered') await db.update(projectDeliverables).set({ deliveredAt: new Date() }).where(eq(projectDeliverables.id, id));
  if (data.status === 'approved') await db.update(projectDeliverables).set({ approvedAt: new Date() }).where(eq(projectDeliverables.id, id));
  revalidatePath('/dashboard/projects');
  return deliverable;
}

export async function createTask(data: any) {
  const { projectTasks } = await import('@/db/schema');
  const [task] = await db.insert(projectTasks).values(data).returning();
  revalidatePath('/dashboard/projects');
  return task;
}

export async function updateTask(id: string, data: any) {
  const { projectTasks } = await import('@/db/schema');
  const [task] = await db.update(projectTasks).set(data).where(eq(projectTasks.id, id)).returning();
  if (data.status === 'done') await db.update(projectTasks).set({ completedAt: new Date() }).where(eq(projectTasks.id, id));
  revalidatePath('/dashboard/projects');
  return task;
}

export async function addProjectComment(data: any) {
  const { projectComments } = await import('@/db/schema');
  const [comment] = await db.insert(projectComments).values(data).returning();
  revalidatePath('/dashboard/projects');
  return comment;
}
