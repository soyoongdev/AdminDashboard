import { Request, Response } from 'express'
import { User } from '~/v1/models/user.model'
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
  const userRequest: User = {
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.password,
    avatar: req.body.avatar,
    phone: req.body.phone,
    address: req.body.address,
    birthday: req.body.birthday,
    roleID: req.body.roleID,
    orderNumber: req.body.orderNumber
  }
  try {
    const user = await registerUser(userRequest)
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
