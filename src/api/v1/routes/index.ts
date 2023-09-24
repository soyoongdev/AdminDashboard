import { NextFunction, Request, Response, Router } from 'express'
import logEvent from '~/v1/helpers/log-event'
import authRoute from '~/v1/routes/auth/auth.route'
import productRoute from '~/v1/routes/product.route'
import cartRoute from '~/v1/routes/cart.route'
import orderRoute from '~/v1/routes/order.route'
import inventoryRoute from '~/v1/routes/inventory.route'
import userRoute from '~/v1/routes/user.route'
import logging from '~/v1/utils/logging'

const router = Router()
const NAMESPACE = 'routes/index'

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)
router.use('/orders', orderRoute)
router.use('/inventories', inventoryRoute)

router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logEvent(err.message)
  logging.error(NAMESPACE, 'Not found with error: ' + err.message)
  return res.formatter.notFound({})
})

export default router
