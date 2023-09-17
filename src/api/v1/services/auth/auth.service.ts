import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import UserSchema, { User } from '~/v1/models/user.model'
import { createNewUser } from '~/v1/services/user.service'
import logging from '~/v1/utils/logging'
import { generateAndSaveOTP, verifyOTP } from './otp.service'
// import bcrypt from 'bcrypt'

const NAMESPACE = 'services/auth'

export const loginUser = async (user: User): Promise<ResponseStory> => {
  try {
    return {}
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}

export const registerUser = async (user: User): Promise<ResponseStory> => {
  try {
    const userFind = await UserSchema.findOne({ where: { email: user.email } })
    if (userFind) {
      return {
        status: 400,
        message: 'This email is already registered'
      }
    } else {
      const otpGenerated = await generateAndSaveOTP(user.email)
      if (otpGenerated) {
        await createNewUser(user)
        return otpGenerated
      } else {
        return {
          status: 400,
          message: 'An error generated otp!'
        }
      }
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}

export const verifyOTPCode = async (emailCheck: string, otpCheck: string): Promise<ResponseStory> => {
  try {
    const verified = await verifyOTP(emailCheck, otpCheck)
    const userFind = await UserSchema.findOne({ where: { email: emailCheck } })
    if (verified.status === 200) {
      if (userFind) {
        userFind.set({ isTemp: false })
        await userFind.save()
      }
      return {
        status: 200,
        message: 'OTP verified successfully'
      }
    } else {
      if (userFind) {
        if (verified.status === 408) {
          if (userFind.dataValues.isTemp) {
            await userFind.destroy()
            return {
              ...verified,
              status: 200,
              message: 'User deleted'
            }
          } else {
            return {
              status: 400,
              message: 'OTP has been deleted'
            }
          }
        } else {
          return {
            status: verified.status,
            message: verified.message
          }
        }
      } else {
        return {
          status: 404,
          message: `Can not find email: ${emailCheck}`
        }
      }
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}
