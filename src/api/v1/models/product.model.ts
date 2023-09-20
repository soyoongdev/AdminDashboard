import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Product {
  productID?: number
  categoryID: number
  inventoryID: number
  rateID?: number
  itemID?: number
  code: string
  images?: any[]
  releaseDate?: string
  orderNumber?: number
}

const ProductSchema = sequelize.define<Model<Product>>('products', {
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
  rateID: {
    type: INTEGER,
    allowNull: true
  },
  itemID: {
    type: INTEGER,
    allowNull: true
  },
  code: {
    type: STRING
  },
  images: { type: JSON, allowNull: true },
  releaseDate: { type: STRING },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(ProductSchema)

export default ProductSchema
