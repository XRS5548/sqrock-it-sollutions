import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
export const db = drizzle(process.env.MARKETING_DATABASE_URL!);