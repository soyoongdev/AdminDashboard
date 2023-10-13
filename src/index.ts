import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { responseEnhancer } from '~/middleware/express-formatter/index'
import routes from '~/routes/index'
dotenv.config()

const { PORT } = process.env

const app: Express = express()

// Accept json body request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// (helmet) helps secure Express apps by setting HTTP response headers.
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
// (morgan) HTTP request logger middleware for node.js
app.use(morgan('dev'))
// (cors) Provide some options Headers for accept others localhost to allow request
app.use(cors())
// Handle custom formatter response express (middleware)
app.use(responseEnhancer())

/* ROUTES */
app.use('/api', routes)

try {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT} : localhost:${PORT}`)
  })
} catch (error) {
  console.log(`Server start error: ${error}`)
}
