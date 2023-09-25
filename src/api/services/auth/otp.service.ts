import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'
import logEvent from '~/helpers/log-event'
import { ResponseStory } from '~/middleware/express-formatter'
import OTPSchema from '~/models/auth/otp.model'
import UserSchema from '~/models/user.model'
import logging from '~/utils/logging'
import { createExpiryDate, isExpiredDate } from '~/utils/timer'

const NAMESPACE = 'services/otp'

export const generateAndSaveOTP = async (emailCheck: string): Promise<ResponseStory> => {
  try {
    // Generate otp code..
    const otpGenerated = otpGenerator
      .generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
      .toString()
    // Hash otp code..
    const salt = await bcrypt.genSalt(10)
    const otpHashed = await bcrypt.hash(otpGenerated, salt)
    const expiryDate = createExpiryDate().toISOString()
    const otpFind = await OTPSchema.findOne({ where: { email: emailCheck } })
    if (otpFind) {
      if (isExpiredDate(new Date(otpFind.dataValues.expiryDate))) {
        // Resend otp
        otpFind.set({ ...otpFind, otp: otpHashed, expiryDate: expiryDate })
        await otpFind.save()
        return {
          status: 200,
          message: 'OTP has been regenerated!',
          data: otpFind
        }
      } else {
        return {
          status: 400,
          message: 'The otp code is still available'
        }
      }
    } else {
      // Generate new
      // Insert otp to database..
      const userFind = await UserSchema.findOne({ where: { email: emailCheck } })
      if (userFind) {
        if (userFind.dataValues.isTemp === false) {
          return {
            status: 400,
            message: `${emailCheck} is already registered!`
          }
        } else {
          const newOtp = await OTPSchema.create({ email: emailCheck, otp: otpHashed, expiryDate: expiryDate })
          return {
            status: newOtp ? 200 : 400,
            message: newOtp ? 'Otp has been generated!' : 'There was a problem saving the otp code!',
            data: newOtp,
            meta: userFind
          }
        }
      } else {
        return {
          status: 404,
          message: `${emailCheck} is not found!`
        }
      }
    }
  } catch (e) {
    logEvent(`${e}`)
    logging.error(NAMESPACE, `${e}`)
    throw new Error(`${e}`)
  }
}

// Get all
export const verifyAndDeleteOTP = async (emailCheck: string, otpCheck: string): Promise<ResponseStory> => {
  try {
    const otpFind = await OTPSchema.findOne({
      where: {
        email: emailCheck,
        otp: otpCheck
      }
    })
    const userFind = await UserSchema.findOne({ where: { email: emailCheck } })

    if (otpFind) {
      if (isExpiredDate(new Date(otpFind.dataValues.expiryDate))) {
        return {
          status: 408,
          message: 'Your OTP code has expired, please resend the OTP code'
        }
      } else {
        if (userFind) {
          // await updateUserByEmail({ ...userFind, isTemp: false })
          userFind.set({ ...userFind, isTemp: false })
          await userFind.save()
        }
        await otpFind.destroy()
        return {
          status: 200,
          message: 'OTP has been verified!'
        }
      }
    } else {
      if (userFind) {
        if (userFind.dataValues.isTemp === false) {
          return {
            status: 400,
            message: `${emailCheck} is already registered!`
          }
        } else {
          return {
            status: 400,
            message: 'Please send otp code for user authentication'
          }
        }
      } else {
        return {
          status: 404,
          message: `Can not find otp and ${emailCheck}`
        }
      }
    }
  } catch (e) {
    logging.error(NAMESPACE, `${e}`)
    logEvent(`${e}`)
    throw new Error(`${e}`)
  }
}
