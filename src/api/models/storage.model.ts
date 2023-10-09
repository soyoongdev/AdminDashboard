import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import BrandSchema from './brand.model'
import InventorySchema from './inventory.model'

const { INTEGER, STRING, JSON } = DataTypes

export interface Storage {
  storageID?: number
  brandID: number
  orderNumber?: number
}

export interface StorageInstance extends Model<Storage>, Storage {}

const StorageSchema = sequelize.define<StorageInstance>('storages', {
  storageID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brandID: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

StorageSchema.hasMany(InventorySchema, { foreignKey: 'storageID' })
StorageSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

syncModel(StorageSchema)

export default StorageSchema
