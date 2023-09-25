import express from 'express'
import { body } from 'express-validator'
import * as controller from '~/controllers/auth/auth.controller'
import { requestValidationRules } from '~/v1/middleware/request-validator'

const router = express.Router()

router.post(
  '/login',
  requestValidationRules([
    body('username').not().isEmpty().withMessage('Username can not be empty'),
    body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    body('password').not().isEmpty().withMessage('Password can not be empty')
  ]),
  controller.login
)
router.post(
  '/register',
  requestValidationRules([
    body('username').not().isEmpty().withMessage('Username can not be empty'),
    body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    body('password').not().isEmpty().withMessage('Password can not be empty'),
    body('roleID').not().isEmpty().withMessage('Role ID can not be empty')
  ]),
  controller.register
)
router.post(
  '/verify-otp',
  requestValidationRules([
    body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid'),
    body('otp').not().isEmpty().withMessage('OTP can not be empty')
  ]),
  controller.verifyOTP
)
router.post(
  '/resend-otp',
  requestValidationRules([
    body('email').not().isEmpty().withMessage('Email can not be empty').isEmail().withMessage('Email is invalid')
  ]),
  controller.resendOTP
)

export default router
