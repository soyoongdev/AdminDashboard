import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, JSON } = DataTypes

export interface Inventory {
  inventoryID?: number
  brandID: number
  productID: number
  quantity: number
  initCount: number
  reservations: { userID: number; quantity: number }[] // { userID, quantity }
  orderNumber?: number
}

export interface InventoryInstance extends Model<Inventory>, Inventory {}

const InventorySchema = sequelize.define<InventoryInstance>(
  'inventories',
  {
    inventoryID: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    brandID: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    productID: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    reservations: {
      type: JSON,
      defaultValue: '[]',
      allowNull: true
    },
    quantity: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: true
    },
    initCount: {
      type: INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
  },
  {
    hooks: {
      beforeSave: (self, options) => {
        const totalValue = self.getDataValue('reservations').reduce((prev, curr, index, arr) => {
          return prev + curr.quantity
        }, 0)
        self.setDataValue('quantity', self.getDataValue('initCount') - totalValue)
      }
    }
  }
)

syncModel(InventorySchema)

export default InventorySchema
