import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'

const { INTEGER, STRING } = DataTypes

export interface CartProduct {
  cartProductID?: number
  cartID: number
  productID: number
  quantity: number
  status: 'available' | 'unavailable'
  modifiedOn?: string
  orderNumber?: number
}

export interface CartProductInstance extends Model<CartProduct>, CartProduct {}

const CartProductSchema = sequelize.define<CartProductInstance>('cart_products', {
  cartProductID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartID: {
    type: INTEGER
  },
  productID: {
    type: INTEGER
  },
  status: {
    type: STRING,
    defaultValue: 'available'
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0
  },
  modifiedOn: {
    type: STRING,
    defaultValue: new Date().toISOString()
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(CartProductSchema)

export default CartProductSchema
