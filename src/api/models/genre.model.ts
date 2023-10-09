import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'

const { INTEGER, STRING } = DataTypes

export interface Genre {
  genreID?: number
  title: string
  desc?: string
  orderNumber?: number
}

export interface GenreInstance extends Model<Genre>, Genre {}

const GenreSchema = sequelize.define<GenreInstance>('categories', {
  genreID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
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

syncModel(GenreSchema)

export default GenreSchema
