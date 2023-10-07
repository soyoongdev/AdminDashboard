import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Voucher {
  voucherID?: number
  brandID: number
  voucherTypeID: number
  code: string
  value: number
  expiredDate: string
  title: string
  desc?: string
  orderNumber?: number
}

export interface VoucherInstance extends Model<Voucher>, Voucher {}

const VoucherSchema = sequelize.define<VoucherInstance>('vouchers', {
  voucherID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brandID: {
    type: INTEGER
  },
  voucherTypeID: {
    type: INTEGER
  },
  code: {
    type: STRING
  },
  value: {
    type: INTEGER
  },
  expiredDate: {
    type: STRING
  },
  title: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(VoucherSchema)

export default VoucherSchema
