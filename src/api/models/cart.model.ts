import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Cart {
  cartID?: number
  userID: number
  status: string // (active | deactive | sale ) Để kiểm tra đơn hàng này đã hết hạn hay chưa (Nếu đang sale up)
  modifiedOn?: string //.
  products: { productID: number; quantity: number }[]
  orderNumber?: number
}

const CartSchema = sequelize.define<Model<Cart>>('carts', {
  cartID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: INTEGER
  },
  status: {
    type: STRING,
    defaultValue: 'active'
  },
  modifiedOn: {
    type: STRING,
    defaultValue: new Date().toISOString()
  },
  products: { type: JSON, allowNull: false, defaultValue: [] },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(CartSchema)

export default CartSchema
