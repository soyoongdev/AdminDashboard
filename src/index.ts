import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import apiRoutes from './routes'
import keys from './utils/keys'
import * as logging from './utils/logging'

const app = express()
const NAMESPACE = 'APP'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(cors())

/* ROUTES */
app.use('/api', apiRoutes)

/* DB CONNECTION */
mongoose
  .connect(keys.mongodb.url)
  .then(() => {
    app.listen(keys.port, () => logging.info(NAMESPACE, `MongoDB Connected \n Server listening on port ${keys.port}`))
  })
  .catch(() => logging.error(NAMESPACE, `No connection`))
