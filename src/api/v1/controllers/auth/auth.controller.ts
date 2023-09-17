import { Request, Response } from 'express'
import { registerUser, verifyOTPCode } from '~/v1/services/auth/auth.service'
import logging from '~/v1/utils/logging'

const NAMESPACE = 'controller/auth'

// Get by id
export const login = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    return res.formatter.ok({})
  } catch (error) {
    return res.formatter.badRequest({ message: `${error}` })
  }
}

// Get all
export const register = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const user = await registerUser(email)
    return res.formatter.dynamicFind(user)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest({ message: `${error}` })
  }
}

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body
  try {
    const result = await verifyOTPCode(email, otp)
    return res.formatter.dynamicFind(result)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest({ message: `${error}` })
  }
}
