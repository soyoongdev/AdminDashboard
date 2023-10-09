import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, JSON } = DataTypes

export interface Inventory {
  inventoryID?: number
  storageID: number
  productID: number
  quantity: number
  initQuantity: number
  orderNumber?: number
}

export interface InventoryInstance extends Model<Inventory>, Inventory {}

const InventorySchema = sequelize.define<InventoryInstance>('inventories', {
  inventoryID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  storageID: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  productID: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  quantity: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  initQuantity: {
    type: INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(InventorySchema)

export default InventorySchema
