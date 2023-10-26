import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'

import ProductSchema from './product.model'
import UserSchema from './user.model'

const { INTEGER, STRING } = DataType

export interface Favorite {
  favoriteID?: number
  productID: number
  userID: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'favorites',
  modelName: 'Favorite'
})
class FavoriteSchema extends Model<Favorite> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare favoriteID: number

  @BelongsTo(() => ProductSchema, { foreignKey: 'productID' })
  @Column({ type: INTEGER })
  declare productID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  @Column({ type: INTEGER })
  declare userID: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// FavoriteSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// FavoriteSchema.belongsTo(ProductSchema, { foreignKey: 'productID' })

export default FavoriteSchema
