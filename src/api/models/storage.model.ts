import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

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

syncModel(StorageSchema)

export default StorageSchema
