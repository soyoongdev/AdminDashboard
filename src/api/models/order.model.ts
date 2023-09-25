import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, DOUBLE, JSON } = DataTypes

export interface Order {
  orderID?: number
  cartID: number
  userID: number
  statusID: number
  paymentMethodID: number
  shipping: object
  payment: any
  amount: number
  products?: []
  orderNumber?: number
}

const PaymentSchema = sequelize.define<Model<Order>>('orders', {
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
  statusID: {
    type: INTEGER
  },
  paymentMethodID: {
    type: INTEGER
  },
  shipping: {
    type: JSON
  },
  amount: {
    type: DOUBLE
  },
  payment: {
    type: JSON
  },
  products: { type: JSON, allowNull: false },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(PaymentSchema)

export default PaymentSchema
