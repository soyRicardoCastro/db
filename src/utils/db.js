import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema.js'
import pkg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const { Client } = pkg

const pool = new Client({ connectionString: process.env.DRIZZLE_URL, ssl: true })

pool.connect()

const db = drizzle(pool, { schema })

export { db }
