import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import CategorySchema from './category.model'
import InventorySchema from './inventory.model'

const { INTEGER, STRING, JSON } = DataType

export interface Product {
  productID?: number
  categoryID: number
  inventoryID: number
  code: string
  name: string
  desc?: string
  releaseDate?: string
  orderNumber?: number
}

export interface ProductInstance extends Model<Product>, Product {}

@Table({
  timestamps: true,
  tableName: 'products',
  modelName: 'Product'
})
class ProductSchema extends Model<Product> {
  @Column({ type: INTEGER, autoIncrement: true, primaryKey: true })
  declare productID: number

  @BelongsTo(() => CategorySchema, { foreignKey: 'categoryID' })
  @Column({ type: INTEGER })
  declare categoryID: number

  @BelongsTo(() => InventorySchema, { foreignKey: 'inventoryID' })
  @Column({ type: INTEGER })
  declare inventoryID: number

  @Column({ type: STRING })
  declare code: string

  @Column({ type: STRING })
  declare name: string

  @Column({ type: STRING })
  declare desc: string

  @Column({ type: STRING })
  declare releaseDate: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// ProductSchema.belongsToMany(CartSchema, {
//   through: {
//     model: CartProductSchema
//   },
//   foreignKey: 'productID'
// })
// ProductSchema.hasMany(FavoriteSchema, { foreignKey: 'productID' })
// ProductSchema.hasMany(RateSchema, { foreignKey: 'productID' })
// ProductSchema.belongsTo(CategorySchema, { foreignKey: 'categoryID' })
// ProductSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })

syncModel(ProductSchema)

export default ProductSchema
