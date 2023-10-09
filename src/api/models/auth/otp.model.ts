import { DataTypes, Model } from 'sequelize'
import sequelize from '~/models'
import { syncModel } from '..'

const { INTEGER, DATE, STRING } = DataTypes

export interface OTP {
  otpID?: number
  email: string
  otp: string
  expiryDate: string
  orderNumber?: number
}

export interface OTPInstance extends Model<OTP>, OTP {}

const OTPSchema = sequelize.define<OTPInstance>('otp', {
  otpID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: { type: STRING },
  otp: { type: STRING },
  orderNumber: { type: INTEGER, defaultValue: 0 },
  expiryDate: { type: STRING }
})

syncModel(OTPSchema)

export default OTPSchema
