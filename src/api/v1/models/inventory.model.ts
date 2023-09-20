import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, JSON } = DataTypes

export interface Inventory {
  inventoryID?: number
  brandID: number
  productID: number
  quantity: number
  reservations: []
  orderNumber?: number
}

const InventorySchema = sequelize.define<Model<Inventory>>('inventories', {
  inventoryID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brandID: {
    type: INTEGER
  },
  productID: {
    type: INTEGER
  },
  reservations: {
    type: JSON
  },
  quantity: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(InventorySchema)

export default InventorySchema
