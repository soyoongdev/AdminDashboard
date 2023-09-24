import { Router } from 'express'
import { body } from 'express-validator'
import * as controller from '~/v1/controllers/product.controller'
import { requestValidationRules } from '~/v1/middleware/request-validator'

const router = Router()

router.post(
  '/',
  requestValidationRules([
    body('categoryID')
      .isInt()
      .withMessage('`categoryID` must be `integer` value type!')
      .notEmpty()
      .withMessage('`categoryID` can not be empty!'),
    body('name')
      .notEmpty()
      .withMessage('`name` can not be empty!')
      .isString()
      .withMessage('`name` must be `string` value type!'),
    body('images')
      .isArray()
      .withMessage('`images` must be `array` value type!')
      .notEmpty()
      .withMessage('`images` can not be empty!'),
    body('name')
      .isString()
      .withMessage('`name` must be `string` value type!')
      .notEmpty()
      .withMessage('`name` can not be empty!'),
    body('desc').isString().withMessage('`desc` must be `string` value type!')
  ]),
  controller.createNew
)
router.get('/find/:id', controller.getByID)
router.get('/find', controller.getAll)
router.put('/:id', controller.updateByID)
router.delete('/:id', controller.deleteByID)

export default router
