import { NextFunction, Request, Response, Router } from 'express'
import logEvent from '~/helpers/log-event'
import userRoute from '~/routes/user.route'
import logging from '~/utils/logging'

const router = Router()
const NAMESPACE = 'routes/index'

router.use('/users', userRoute)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logEvent(err.message)
  logging.error(NAMESPACE, 'Not found with error: ' + err.message)
  return res.formatter.notFound()
})

export default router
