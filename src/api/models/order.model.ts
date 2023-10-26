import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import CartSchema, { Cart } from './cart.model'
import ProductSchema, { Product } from './product.model'
import TransitionSchema from './transaction.model'
import UserSchema, { User } from './user.model'

const { INTEGER, STRING, JSON } = DataType

export interface Order {
  orderID?: number
  transitionID: number
  cart: Cart
  user: User
  products: Product[]
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'orders',
  modelName: 'Order'
})
class OrderSchema extends Model<Order> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare orderID: number

  @Column({ type: JSON })
  declare cart: CartSchema

  @Column({ type: JSON })
  declare user: UserSchema

  @BelongsTo(() => TransitionSchema, { foreignKey: 'transitionID' })
  @Column({ type: INTEGER })
  declare transitionID: number

  @Column({ type: JSON })
  declare products: ProductSchema[]

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// OrderSchema.belongsTo(TransitionSchema, { foreignKey: 'transitionID' })

export default OrderSchema
