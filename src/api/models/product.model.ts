import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Product {
  productID?: number
  categoryID: number
  rateID?: number
  itemID?: number
  code?: string
  name?: string
  desc?: string
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
  name: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  images: { type: JSON, allowNull: true },
  releaseDate: { type: STRING, allowNull: true },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(ProductSchema)

export default ProductSchema
