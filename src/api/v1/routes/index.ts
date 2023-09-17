import { NextFunction, Request, Response, Router } from 'express'
import logEvent from '~/v1/helpers/log-event'
import authRoute from '~/v1/routes/auth/auth.route'
import userRoute from '~/v1/routes/user.route'
import logging from '~/v1/utils/logging'

const router = Router()
const NAMESPACE = 'routes/index'

router.use('/auth', authRoute)
router.use('/users', userRoute)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logEvent(err.message)
  logging.error(NAMESPACE, 'Not found with error: ' + err.message)
  return res.formatter.notFound({})
})

export default router
