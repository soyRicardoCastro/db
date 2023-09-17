import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes/products.js'

dotenv.config()

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.get('/healtcheck', (req, res) => res.send('OK'))

app.use('/api', routes)

;(async () => {
  app.listen(process.env.PORT, () => console.log(`App running on port: ${process.env.PORT}`))
})()
