import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/sequelize.config'
import { syncModel } from '..'

const { INTEGER, DATE, STRING } = DataTypes

export interface OTP {
  otpID?: number
  email?: string
  otp?: string
  orderNumber?: number
  expiryDate: string
}

const OTPSchema = sequelize.define<Model<OTP>>('otp', {
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
