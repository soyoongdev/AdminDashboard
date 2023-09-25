import bcrypt from 'bcrypt'
import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import OTPSchema from '~/models/auth/otp.model'
import UserSchema, { User } from '~/models/user.model'
import { generateAndSaveOTP } from '~/services/auth/otp.service'
import logging from '~/utils/logging'
import { isExpiredDate } from '~/utils/timer'

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

export const registerUser = async (user: User): Promise<ResponseStory> => {
  try {
    const userFind = await UserSchema.findOne({ where: { email: user.email } })
    const otpFind = await OTPSchema.findOne({ where: { email: user.email } })

    if (userFind) {
      if (userFind.dataValues.isTemp) {
        if (otpFind) {
          if (isExpiredDate(new Date(otpFind.dataValues.expiryDate))) {
            return {
              status: 400,
              message: 'The otp code has expired, please resend the otp code'
            }
          } else {
            return {
              status: 400,
              message: 'Please verify otp code..'
            }
          }
        } else {
          return {
            status: 400,
            message: 'Please resend and verify otp code..'
          }
        }
      } else {
        return {
          status: 400,
          message: `${user.email} is already registered`
        }
      }
    } else {
      const salt = await bcrypt.genSalt(10)
      const passwordHashed = await bcrypt.hash(user.password!, salt)
      const userTemp = await UserSchema.create({ ...user, password: passwordHashed, isTemp: true })
      const otpGenerated = await generateAndSaveOTP(user.email!)
      return {
        status: 200,
        message: `We have sent the otp code to ${user.email} please check your mailbox!`,
        data: otpGenerated.data,
        meta: userTemp
      }
    }
  } catch (error) {
    logEvent(`${error}`)
    logging.error(NAMESPACE, `${error}`)
    throw Error(`${error}`)
  }
}
