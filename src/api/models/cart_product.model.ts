import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import CartSchema from './cart.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export interface CartProduct {
  cartID: number
  productID: number
  quantity: number
  status: 'available' | 'unavailable'
  modifiedOn?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'cart_products',
  modelName: 'CartProduct'
})
class CartProductSchema extends Model<CartProduct> {
  @BelongsTo(() => CartSchema, { foreignKey: 'cartID' })
  @Column({ type: INTEGER })
  declare cartID: number

  @BelongsTo(() => ProductSchema, { foreignKey: 'productID' })
  @Column({ type: INTEGER })
  declare productID: number

  @Column({ type: STRING, values: ['available', 'unavailable'] })
  declare status: string

  @Column({ type: INTEGER })
  declare quantity: number

  @Column({ type: STRING })
  declare modifiedOn: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

syncModel(CartProductSchema)

export default CartProductSchema
