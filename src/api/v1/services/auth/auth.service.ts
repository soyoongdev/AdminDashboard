import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import OTPSchema from '~/v1/models/auth/otp.model'
import { User } from '~/v1/models/user.model'
import { generateAndSaveOTP } from '~/v1/services/auth/otp.service'
import logging from '~/v1/utils/logging'
import { isExpiredDate } from '~/v1/utils/timer'
import * as userService from '../user.service'
// import bcrypt from 'bcrypt'

const NAMESPACE = 'services/auth'

export const loginUser = async (user: User): Promise<ResponseStory> => {
  try {
    return {
      status: 0,
      message: ''
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}

export const registerUser = async (user: User) => {
  try {
    const userFind = await userService.getUserByEmail(user.email)
    const otpFind = await OTPSchema.findOne({ where: { email: user.email } })

    if (userFind) {
      if (userFind.dataValues.isTemp && otpFind && isExpiredDate(new Date(otpFind.dataValues.expiryDate))) {
        await otpFind.destroy().catch((err) => {
          throw new Error(err)
        })
        return await generateAndSaveOTP(user.email)
      } else {
        return new Error(`${user.email} is already registered`)
      }
    } else {
      await userService.createNewUser({ ...user, isTemp: true }).catch((err) => {
        throw new Error(err)
      })
      return await generateAndSaveOTP(user.email)
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}
