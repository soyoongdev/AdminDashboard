import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import UserSchema, { User } from '~/v1/models/user.model'
import { createNewUser } from '~/v1/services/user.service'
import logging from '~/v1/utils/logging'
import { generateAndSaveOTP, verifyAndDeleteOTP } from './otp.service'
// import bcrypt from 'bcrypt'

const NAMESPACE = 'services/auth'

export const registerUser = async (user: User): Promise<ResponseStory> => {
  try {
    const userFind = await UserSchema.findOne({ where: { email: user.email } })
    if (userFind) {
      return {
        status: 400,
        message: 'This email is already registered'
      }
    } else {
      const userTemp = await createNewUser({ ...user, isTemp: true })
      if (userTemp) {
        return await generateAndSaveOTP(user.email)
      } else {
        return {
          status: 400,
          message: 'An error register occurred'
        }
      }
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}

export const verifyOTPCode = async (email: string, otpCheck: string): Promise<ResponseStory> => {
  try {
    const verified = await verifyAndDeleteOTP(email, otpCheck)
    const userFind = await UserSchema.findOne({ where: { email: email } })

    if (userFind) {
      if (verified.status === 200) {
        userFind.set({ isTemp: false })
        await userFind.save()
        return {
          status: 200,
          message: 'OTP verified successfully'
        }
      } else {
        await userFind.destroy()
        return {
          ...verified,
          status: verified.status,
          message: verified.message
        }
      }
    } else {
      return {
        status: 404,
        message: `Can not find user with email: ${email}`
      }
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}
