import { NextFunction, Request, Response, Router } from 'express'
import logEvent from '~/helpers/log-event'
import authRoute from '~/routes/auth/auth.route'
import cartRoute from '~/routes/cart.route'
import inventoryRoute from '~/routes/inventory.route'
import orderRoute from '~/routes/order.route'
import productRoute from '~/routes/product.route'
import userRoute from '~/routes/user.route'
import logging from '~/utils/logging'

const router = Router()
const NAMESPACE = 'routes/index'

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoute)
router.use('/orders', orderRoute)
router.use('/inventories', inventoryRoute)

// eslint-disable-next-line no-unused-vars
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logEvent(err.message)
  logging.error(NAMESPACE, 'Not found with error: ' + err.message)
  return res.formatter.notFound({})
})

export default router
