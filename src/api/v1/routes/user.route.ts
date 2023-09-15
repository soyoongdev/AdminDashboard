import { Router } from 'express'
import * as controller from '~/api/v1/controllers/user.controller'

const router = Router()

router.post('/', controller.createNew)
router.get('/find/:id', controller.getByID)
router.get('/find', controller.getAll)
router.put('/:id', controller.updateByID)
router.patch('/:id', controller.partialUpdateByID)
router.delete('/:id', controller.deleteByID)

export default router
