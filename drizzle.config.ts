import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: [
    './auth-schema.ts',
    './db/schema.ts',
    './db/schema/system.ts',
    './db/schema/services.ts',
    './db/schema/projects.ts',
    './db/schema/crm.ts',
    './db/schema/billing.ts',
    './db/schema/support.ts',
  ],
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
