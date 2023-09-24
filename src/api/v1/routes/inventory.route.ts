import { Router } from 'express'
import * as controller from '~/v1/controllers/inventory.controller'

const router = Router()

router.post('/', controller.createNew)
router.get('/find/:id', controller.getByID)
router.get('/find', controller.getAll)
router.put('/:id', controller.updateByID)
router.delete('/:id', controller.deleteByID)

export default router
