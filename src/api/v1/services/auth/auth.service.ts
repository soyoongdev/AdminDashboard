import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import UserSchema from '~/v1/models/user.model'
import logging from '~/v1/utils/logging'
import { generateAndSaveOTP, verifyAndDeleteOTP } from './otp.service'
// import bcrypt from 'bcrypt'

const NAMESPACE = 'services/auth'

export const registerUser = async (email: string): Promise<ResponseStory> => {
  try {
    const user = await UserSchema.findOne({ where: { email: email } })
    if (user) {
      return {
        status: 400,
        message: 'This email is already registered'
      }
    } else {
      return await generateAndSaveOTP(email)
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}

export const verifyOTPCode = async (email: string, otpCheck: string): Promise<ResponseStory> => {
  try {
    return await verifyAndDeleteOTP(email, otpCheck)
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}
