import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'

const { INTEGER, STRING, JSON } = DataTypes

export interface Media {
  mediaID?: number
  mediableID: number
  url: string
  mediaType: string
  orderNumber?: number
}

export interface MediaInstance extends Model<Media>, Media {}

const MediaSchema = sequelize.define<MediaInstance>('medias', {
  mediaID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mediableID: {
    type: INTEGER
  },
  url: {
    type: JSON,
    defaultValue: [],
    allowNull: true
  },
  mediaType: {
    type: STRING
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(MediaSchema)

export default MediaSchema
