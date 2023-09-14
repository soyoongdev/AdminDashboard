import cors from 'cors'
import express, { Express } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { responseEnhancer } from '~/api/v1/middleware/express-formatter'
import routes from '~/api/v1/routes'

const app: Express = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
// HTTP request logger middleware for node.js
app.use(morgan('dev'))
app.use(cors())
// Formatter response express middleware for node.js
app.use(responseEnhancer())

/* ROUTES */
app.use('/api', routes)

export default app
