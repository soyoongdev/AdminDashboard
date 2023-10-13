import { BelongsTo, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import BrandSchema from './brand.model'
import ProductSchema from './product.model'

const { INTEGER, JSON } = DataType

export interface Inventory {
  inventoryID?: number
  storageID: number
  productID: number
  quantity: number
  initQuantity: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'inventories',
  modelName: 'Inventory'
})
class InventorySchema extends Model<Inventory> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare inventoryID: number

  @BelongsTo(() => BrandSchema, { foreignKey: 'storageID' })
  @Column({ type: INTEGER })
  declare storageID: number

  @HasMany(() => ProductSchema, { foreignKey: 'productID' })
  @Column({ type: INTEGER })
  declare productID: number

  @Column({ type: INTEGER })
  declare quantity: number

  @Column({ type: INTEGER })
  declare initQuantity: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// InventorySchema.hasMany(ReservationSchema, { foreignKey: 'inventoryID' })
// InventorySchema.hasMany(ProductSchema, { foreignKey: 'inventoryID' })
// InventorySchema.belongsTo(StorageSchema, { foreignKey: 'storageID' })

syncModel(InventorySchema)

export default InventorySchema
