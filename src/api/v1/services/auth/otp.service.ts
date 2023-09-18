import bcrypt from 'bcrypt'
import otpGenerator from 'otp-generator'
import logEvent from '~/v1/helpers/log-event'
import { ResponseStory } from '~/v1/middleware/express-formatter'
import OTPSchema from '~/v1/models/auth/otp.model'
import logging from '~/v1/utils/logging'
import { createExpiryDate, isExpiredDate } from '~/v1/utils/timer'

const NAMESPACE = 'services/otp'

export const generateOTP = async (): Promise<string> => {
  try {
    // Generate otp code..
    const otpGenerated = otpGenerator
      .generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
      .toString()
    // Hash otp code..
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(otpGenerated, salt)
  } catch (e) {
    logEvent(`${e}`)
    logging.error(NAMESPACE, `${e}`)
    throw new Error(`${e}`)
  }
}

export const saveOTP = async (email: string, otpHashed: string) => {
  try {
    const expiryDate = createExpiryDate()
    // Insert otp to database..
    return await OTPSchema.create({ email: email, otp: otpHashed, expiryDate: expiryDate.toISOString() })
  } catch (e) {
    logEvent(`${e}`)
    logging.error(NAMESPACE, `${e}`)
    throw new Error(`${e}`)
  }
}

export const generateAndSaveOTP = async (email: string) => {
  try {
    // Generate otp code..
    const otpGenerated = otpGenerator
      .generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
      .toString()
    // Hash otp code..
    const salt = bcrypt.genSaltSync(10)
    const otpHashed = bcrypt.hashSync(otpGenerated, salt)
    const expiryDate = createExpiryDate()
    // Insert otp to database..
    const otpCreated = await OTPSchema.create({ email: email, otp: otpHashed, expiryDate: expiryDate.toISOString() })
    return otpCreated
  } catch (e) {
    logEvent(`${e}`)
    logging.error(NAMESPACE, `${e}`)
    throw new Error(`${e}`)
  }
}

// Get all
export const sendMailOTPCode = async (otpCheck: string, hashOtp: string): Promise<ResponseStory> => {
  try {
    const isValid = bcrypt.compareSync(otpCheck, hashOtp)
    return {
      status: isValid ? 200 : 400,
      message: 'Send mail otp code..',
      meta: {
        isValid: isValid,
        originOtpCode: otpCheck,
        hashOtp: hashOtp
      }
    }
  } catch (e) {
    logging.error(NAMESPACE, `${e}`)
    logEvent(`${e}`)
    throw Error(`${e}`)
  }
}

// Get all
export const verifyAndDeleteOTPCode = async (emailCheck: string, otpCheck: string): Promise<ResponseStory> => {
  try {
    const otpRecord = await OTPSchema.findOne({
      where: {
        email: emailCheck,
        otp: otpCheck
      }
    })
    if (otpRecord) {
      const isExpired = isExpiredDate(new Date(otpRecord.expiryDate))
      if (isExpired) {
        return {
          status: 408,
          message: 'Expired date!'
        }
      } else {
        await otpRecord?.destroy()
        return {
          status: 200,
          message: 'OTP verified!'
        }
      }
    } else {
      return {
        status: 404,
        message: 'Can not find otp code!'
      }
    }
  } catch (e) {
    logging.error(NAMESPACE, `${e}`)
    logEvent(`${e}`)
    throw new Error(`${e}`)
  }
}

export const getOTPByEmail = async (email: string): Promise<ResponseStory> => {
  try {
    const otpFind = await OTPSchema.findOne({ where: { email: email } })
    return {
      status: otpFind ? 200 : 404,
      message: otpFind ? 'Founded' : 'Not found',
      data: otpFind ? otpFind.dataValues : null
    }
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    logEvent(`${error}`)
    throw error
  }
}
