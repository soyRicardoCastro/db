import dotenv from 'dotenv'
dotenv.config()

/** @type { import("drizzle-kit").Config } */
export default {
  schema: './src/utils/schema.js',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_URL
  }
}
