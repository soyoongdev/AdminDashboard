import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface VoucherType {
  voucherTypeID?: number
  title: string
  desc?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'transition_types',
  modelName: 'TransitionType'
})
class VoucherTypeSchema extends Model<VoucherType> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare voucherTypeID: number

  @Column({ type: STRING })
  declare title: string

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

export default VoucherTypeSchema
