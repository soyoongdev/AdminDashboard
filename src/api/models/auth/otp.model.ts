import { DataTypes, Model } from 'sequelize'
import { Column, Table } from 'sequelize-typescript'

const { INTEGER } = DataTypes

export interface OTP {
  otpID?: number
  email: string
  otp: string
  expiryDate: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'carts',
  modelName: 'Cart'
})
class OTPSchema extends Model<OTP> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare otpID: number

  @Column({ type: INTEGER })
  declare email: string

  @Column({ type: INTEGER })
  declare otp: number

  @Column({ type: INTEGER })
  declare expiryDate: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

export default OTPSchema
