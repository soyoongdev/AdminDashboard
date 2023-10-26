import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import ProductSchema from './product.model'
import UserSchema from './user.model'

const { INTEGER, STRING, JSON } = DataType

export interface Rate {
  rateID?: number
  productID: number
  userID: number
  title: string
  like: number
  desc?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'rates',
  modelName: 'Rate'
})
class RateSchema extends Model<Rate> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare rateID: number

  @BelongsTo(() => ProductSchema, { foreignKey: 'productID' })
  declare productID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  declare userID: number

  @Column({ type: STRING })
  declare title: string

  @Column({ type: INTEGER })
  declare like: number

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// RateSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// RateSchema.belongsTo(ProductSchema, { foreignKey: 'productID' })

export default RateSchema
