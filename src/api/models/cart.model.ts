import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import CartProductSchema from './cart_product.model'
import ProductSchema from './product.model'
import TransitionSchema from './transaction.model'
import UserSchema from './user.model'

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

CartSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
CartSchema.belongsToMany(ProductSchema, {
  through: {
    model: CartProductSchema
  },
  foreignKey: 'cartID'
})
CartSchema.hasMany(TransitionSchema, { foreignKey: 'cartID' })

syncModel(CartSchema)

export default CartSchema
