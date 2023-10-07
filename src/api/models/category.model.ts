import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

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

syncModel(CategorySchema)

export default CategorySchema
