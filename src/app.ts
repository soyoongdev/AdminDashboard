import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { responseEnhancer } from '~/api/v1/middleware/express-formatter'
import routes from '~/api/v1/routes'

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

export default app
