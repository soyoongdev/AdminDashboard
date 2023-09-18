import express from 'express'
import * as controller from '~/v1/controllers/auth/auth.controller'

const router = express.Router()

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/verify-otp', controller.verifyOTP)
router.post('/resend-otp', controller.resendOTP)

export default router
