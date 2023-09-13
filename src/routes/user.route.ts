import { Router } from 'express'
import * as controller from '~/controllers/user.controller'

const router = Router()

router.get('/find/:id', controller.getByID)
router.post('/find', controller.getAll)
router.post('/', controller.createNew)
router.put('/:id', controller.updateByID)
router.delete('/:id', controller.deleteByID)

export default router
