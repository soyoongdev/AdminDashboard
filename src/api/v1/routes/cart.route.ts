import { Router } from 'express'
import { body } from 'express-validator'
import * as controller from '~/v1/controllers/cart.controller'
import { requestValidationFields, requestValidationRules } from '../middleware/request-validator'

const router = Router()
// 'userID', 'status', 'products'
router.post(
  '/',
  requestValidationRules([
    body('userID')
      .notEmpty()
      .withMessage('`userID` can not be empty!')
      .isInt()
      .withMessage('`userID` must be `integer` value type!'),
    body('status')
      .notEmpty()
      .withMessage('`status` can not be empty!')
      .isString()
      .withMessage('`status` must be `string` value type!'),
    body('products')
      .isArray()
      .withMessage('`products` là một mảng')
      .notEmpty()
      .withMessage('`products` can not be empty!')
  ]),
  controller.createNew
)
router.get('/find/:id', requestValidationFields(['cartID']), controller.getByID)
router.get('/find', controller.getAll)
router.put('/:id', controller.updateByID)
router.delete('/:id', controller.deleteByID)

export default router
