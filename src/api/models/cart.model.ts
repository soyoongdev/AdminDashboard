import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import UserSchema from './user.model'

const { INTEGER, STRING, JSON } = DataType

export interface Cart {
  cartID?: number
  userID: number
  total: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'carts',
  modelName: 'Cart'
})
class CartSchema extends Model<Cart> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare cartID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  @Column({ type: INTEGER })
  declare userID: number

  @Column({ type: INTEGER })
  declare total: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// CartSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// CartSchema.belongsToMany(ProductSchema, {
//   through: {
//     model: CartProductSchema
//   },
//   foreignKey: 'cartID'
// })
// CartSchema.hasMany(TransitionSchema, { foreignKey: 'cartID' })

syncModel(CartSchema)

export default CartSchema
