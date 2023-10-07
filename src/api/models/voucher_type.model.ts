import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface VoucherType {
  voucherTypeID?: number
  title: string
  desc?: string
  orderNumber?: number
}

export interface VoucherTypeInstance extends Model<VoucherType>, VoucherType {}

const VoucherTypeSchema = sequelize.define<VoucherTypeInstance>('voucher_types', {
  voucherTypeID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(VoucherTypeSchema)

export default VoucherTypeSchema
