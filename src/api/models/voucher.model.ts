import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import BrandSchema from './brand.model'
import VoucherTypeSchema from './voucher_type.model'

const { INTEGER, STRING } = DataType

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

@Table({
  timestamps: true,
  tableName: 'vouchers',
  modelName: 'Voucher'
})
class VoucherSchema extends Model<Voucher> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare voucherID: number

  @BelongsTo(() => BrandSchema, { foreignKey: 'brandID' })
  @Column({ type: INTEGER })
  declare brandID: number

  @BelongsTo(() => VoucherTypeSchema, { foreignKey: 'voucherTypeID' })
  @Column({ type: INTEGER })
  declare voucherTypeID: number

  @Column({ type: STRING })
  declare code: number

  @Column({ type: STRING })
  declare value: number

  @Column({ type: STRING })
  declare expiredDate: number

  @Column({ type: STRING })
  declare title: number

  @Column({ type: STRING })
  declare desc: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// VoucherSchema.belongsTo(VoucherTypeSchema, { foreignKey: 'voucherTypeID' })
// VoucherSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

export default VoucherSchema
