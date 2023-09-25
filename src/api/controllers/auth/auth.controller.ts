import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import UserSchema, { User } from '~/models/user.model'
import { registerUser } from '~/services/auth/auth.service'
import { generateAndSaveOTP, verifyAndDeleteOTP } from '~/services/auth/otp.service'
import logging from '~/utils/logging'

const NAMESPACE = 'controller/auth'

// Get by id
export const login = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  try {
    const findUser = await UserSchema.findOne({
      where: {
        [Op.or]: [{ email: email || '' }, { username: username || '' }]
      }
    })

    if (findUser) {
      const matchedPassword = await bcrypt.compare(password, findUser.dataValues.password!)
      if (matchedPassword) {
        return res.formatter.ok({ message: 'Login success!', data: findUser })
      } else {
        return res.formatter.badRequest({ message: 'Login failed!' })
      }
    }
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
    const register = await registerUser(userRequest)
    return res.formatter.dynamicFind(register)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest({ message: `${error}` })
  }
}

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body
  try {
    const result = await verifyAndDeleteOTP(email, otp)
    return res.formatter.dynamicFind(result)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest({ message: `${error}` })
  }
}

export const resendOTP = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const result = await generateAndSaveOTP(email)
    return res.formatter.dynamicFind(result)
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    return res.formatter.badRequest({ message: `${error}` })
  }
}
