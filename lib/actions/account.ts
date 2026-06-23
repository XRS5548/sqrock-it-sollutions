'use server';

import { db } from '@/db';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/cloudinary';

export async function uploadProfileImage(formData: FormData): Promise<string> {
  const file = formData.get('file') as File;
  if (!file) throw new Error('No file provided');

  const url = await uploadImage(file, 'sqrock/profiles');
  return url;
}

export async function updateProfile(userId: string, data: { name?: string; image?: string }) {
  const { user } = await import('@/auth-schema');
  await db.update(user).set(data).where(eq(user.id, userId));
  revalidatePath('/dashboard/settings');
  return { success: true };
}
