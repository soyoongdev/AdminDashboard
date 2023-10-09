import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import GenreSchema from './genre.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataTypes

export interface Category {
  categoryID?: number
  genreID: number
  options?: any[]
  title: string
  desc?: string
  orderNumber?: number
}

export interface CategoryInstance extends Model<Category>, Category {}

const CategorySchema = sequelize.define<CategoryInstance>('categories', {
  categoryID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  genreID: {
    type: INTEGER
  },
  title: {
    type: STRING
  },
  desc: {
    type: STRING,
    allowNull: true
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

CategorySchema.hasMany(ProductSchema, { foreignKey: 'categoryID' })
CategorySchema.belongsTo(GenreSchema, { foreignKey: 'genreID' })

syncModel(CategorySchema)

export default CategorySchema
