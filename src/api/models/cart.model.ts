import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING, JSON } = DataTypes

export interface Cart {
  cartID?: number
  userID: number
  orderNumber?: number
}

export interface CartInstance extends Model<Cart>, Cart {}

const CartSchema = sequelize.define<CartInstance>('carts', {
  cartID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(CartSchema)

export default CartSchema
