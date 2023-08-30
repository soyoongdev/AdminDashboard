import express from 'express'
import * as logging from '~/utils/logging'
import userRoute from '~/routes/user.route'

const router = express.Router()
const NAMESPACE = '[routes/index]'

router.use('/users', userRoute)

router.use((req, res) => {
  res.status(404).end()
  res.send('<h1>Wrong Route!</h1>')
  logging.error(NAMESPACE, 'Wrong route with error: ' + res)
})

export default router
