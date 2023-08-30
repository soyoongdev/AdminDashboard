import express from 'express'
import * as controller from '~/controllers/user.controller'

const router = express.Router()

router.get('/:id', controller.getByID)
router.get('/', controller.getAll)
router.post('/', controller.createNew)
router.put('/:id', controller.updateByID)
router.delete('/:id', controller.deleteByID)

export default router
