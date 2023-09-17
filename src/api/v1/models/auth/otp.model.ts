import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '..'

const { INTEGER, DATE, STRING } = DataTypes

export interface OTP extends Model {
  otpID: number
  email: string
  otp: string
  orderNumber?: number
  expiryDate: string
}

const OTPSchema = sequelize.define<OTP>('otp', {
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
