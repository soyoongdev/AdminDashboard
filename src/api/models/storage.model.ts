import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import BrandSchema from './brand.model'

const { INTEGER, STRING, JSON } = DataType

export interface Storage {
  storageID?: number
  brandID: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'storages',
  modelName: 'Storage'
})
class StorageSchema extends Model<Storage> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare storageID: number

  @BelongsTo(() => BrandSchema, { foreignKey: 'brandID' })
  @Column({ type: INTEGER })
  declare brandID: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// StorageSchema.hasMany(InventorySchema, { foreignKey: 'storageID' })
// StorageSchema.belongsTo(BrandSchema, { foreignKey: 'brandID' })

export default StorageSchema
