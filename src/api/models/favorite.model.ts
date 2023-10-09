import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING } = DataTypes

export interface Favorite {
  favoriteID?: number
  productID: number
  userID: number
  orderNumber?: number
}

export interface FavoriteInstance extends Model<Favorite>, Favorite {}

const FavoriteSchema = sequelize.define<FavoriteInstance>('favorites', {
  favoriteID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productID: {
    type: INTEGER
  },
  userID: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(FavoriteSchema)

export default FavoriteSchema
