import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import BrandSchema from './brand.model'
import VoucherTypeSchema from './voucher_type.model'

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

VoucherSchema.belongsTo(VoucherTypeSchema, { foreignKey: 'voucherTypeID' })
VoucherSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

syncModel(VoucherSchema)

export default VoucherSchema
