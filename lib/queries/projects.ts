import { db } from '@/db';
import { eq, and, desc, isNull } from 'drizzle-orm';
import {
  projects, projectMembers, projectMilestones, projectDeliverables,
  projectTasks, projectComments, projectFiles, projectActivityLogs,
} from '@/db/schema';

export async function getUserProjects(userId: string) {
  return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: string) {
  const result = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  return result[0];
}

export async function getProjectWithDetails(id: string) {
  const project = await getProjectById(id);
  if (!project) return null;
  const [members, milestones, deliverables, tasks, comments, files, activityLogs] = await Promise.all([
    db.select().from(projectMembers).where(eq(projectMembers.projectId, id)),
    db.select().from(projectMilestones).where(eq(projectMilestones.projectId, id)).orderBy(projectMilestones.displayOrder),
    db.select().from(projectDeliverables).where(eq(projectDeliverables.projectId, id)),
    db.select().from(projectTasks).where(eq(projectTasks.projectId, id)).orderBy(projectTasks.displayOrder),
    db.select().from(projectComments).where(eq(projectComments.projectId, id)).orderBy(desc(projectComments.createdAt)),
    db.select().from(projectFiles).where(eq(projectFiles.projectId, id)).orderBy(desc(projectFiles.createdAt)),
    db.select().from(projectActivityLogs).where(eq(projectActivityLogs.projectId, id)).orderBy(desc(projectActivityLogs.createdAt)),
  ]);
  return { ...project, members, milestones, deliverables, tasks, comments, files, activityLogs };
}

export async function getProjectTasks(projectId: string) {
  return db.select().from(projectTasks).where(eq(projectTasks.projectId, projectId)).orderBy(projectTasks.displayOrder);
}

export async function getProjectMilestones(projectId: string) {
  return db.select().from(projectMilestones).where(eq(projectMilestones.projectId, projectId)).orderBy(projectMilestones.displayOrder);
}

export async function getAllProjects() {
  return db.select().from(projects).where(isNull(projects.deletedAt)).orderBy(desc(projects.createdAt));
}
