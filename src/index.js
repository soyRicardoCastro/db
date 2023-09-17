import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from './utils/db.js'
import { migrate } from 'drizzle-orm/node-postgres/migrator'

import routes from './routes/products.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/healtcheck', (req, res) => res.send('OK'))

app.use('/api', routes)

;(async () => {
  await migrate(db, { migrationsFolder: 'drizzle' })

  console.log('Already in db')

  app.listen(4000, () => console.log('API on port 4000'))
})()
