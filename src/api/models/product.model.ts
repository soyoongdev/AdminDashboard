'use strict'

import { DataType, Model } from 'sequelize-typescript'
import sequelize, { syncModel } from '~/models'
import CartSchema from './cart.model'
import CartProductSchema from './cart_product.model'
import CategorySchema from './category.model'
import FavoriteSchema from './favorite.model'
import InventorySchema from './inventory.model'
import RateSchema from './rate.model'

const { INTEGER, STRING, JSON } = DataType

export interface Product {
  productID?: number
  categoryID: number
  inventoryID: number
  code?: string
  name?: string
  desc?: string
  releaseDate?: string
  orderNumber?: number
}

export interface ProductInstance extends Model<Product>, Product {}

const ProductSchema = sequelize.define<ProductInstance>('products', {
  productID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  categoryID: {
    type: INTEGER
  },
  inventoryID: {
    type: INTEGER
  },
  code: {
    type: STRING
  },
  name: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  releaseDate: { type: STRING, allowNull: true, defaultValue: Date.now() },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

ProductSchema.belongsToMany(CartSchema, {
  through: {
    model: CartProductSchema
  },
  foreignKey: 'productID'
})
ProductSchema.hasMany(FavoriteSchema, { foreignKey: 'productID' })
ProductSchema.hasMany(RateSchema, { foreignKey: 'productID' })
ProductSchema.belongsTo(CategorySchema, { foreignKey: 'categoryID' })
ProductSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })

syncModel(ProductSchema)

export default ProductSchema
