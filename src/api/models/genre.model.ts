import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface Genre {
  genreID?: number
  title: string
  desc?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'genres',
  modelName: 'Genre'
})
class GenreSchema extends Model<Genre> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare genreID: number

  @Column({ type: STRING })
  declare title: string

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// GenreSchema.hasMany(CategorySchema, { foreignKey: 'genreID' })

export default GenreSchema
