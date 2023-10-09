import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import { Product } from './product.model'
import TransitionSchema from './transaction.model'

const { INTEGER, STRING, DOUBLE, JSON } = DataTypes

export interface Order {
  orderID?: number
  transitionID: number
  cartID: number
  userID: number
  shipping: object
  products?: Product[]
  orderNumber?: number
}

export interface OrderInstance extends Model<Order>, Order {}

const OrderSchema = sequelize.define<OrderInstance>('orders', {
  orderID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartID: {
    type: INTEGER
  },
  userID: {
    type: INTEGER
  },
  transitionID: {
    type: INTEGER
  },
  shipping: {
    type: JSON
  },
  products: { type: JSON, defaultValue: [], allowNull: false },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

OrderSchema.belongsTo(TransitionSchema, { foreignKey: 'transitionID' })

syncModel(OrderSchema)

export default OrderSchema
