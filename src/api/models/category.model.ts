import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import GenreSchema from './genre.model'

const { INTEGER, STRING } = DataType

export interface Category {
  categoryID?: number
  genreID: number
  title: string
  desc?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'categories',
  modelName: 'Category'
})
class CategorySchema extends Model<Category> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare categoryID: number

  @Column({ type: INTEGER })
  @BelongsTo(() => GenreSchema, { foreignKey: 'genreID' })
  declare genreID: number

  @Column({ type: STRING })
  declare title: string

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// CategorySchema.belongsTo(GenreSchema, { foreignKey: 'genreID' })
// CategorySchema.hasMany(ProductSchema, { foreignKey: 'categoryID' })

syncModel(CategorySchema)

export default CategorySchema
