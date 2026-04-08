'use server'

import { z } from 'zod'
import { db } from '@/db'
import { users } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'

const registrationSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  college: z.string().min(2, 'College name is required'),
  branch: z.string().min(2, 'Branch is required'),
  year: z.number().min(1, 'Year must be between 1-4').max(4, 'Year must be between 1-4'),
})

export type RegistrationData = z.infer<typeof registrationSchema>

export async function registerUser(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      college: formData.get('college') as string,
      branch: formData.get('branch') as string,
      year: parseInt(formData.get('year') as string),
    }

    const validatedData = registrationSchema.parse(rawData)

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1)

    if (existingUser.length > 0) {
      return {
        success: false,
        error: 'User with this email already exists',
      }
    }

    // Insert user
    await db.insert(users).values({
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      college: validatedData.college,
      branch: validatedData.branch,
      year: validatedData.year,
    })

    revalidatePath('/admin')
    
    return {
      success: true,
      message: 'Successfully registered for Alpha 2 Internship Program!',
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        // error: error.errors[0].message,
      }
    }
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users).orderBy(users.createdAt)
    return { success: true, users: allUsers }
  } catch (error) {
    return { success: false, error: 'Failed to fetch users', users: [] }
  }
}