import { DataTypes, Model } from 'sequelize'
import { BelongsTo, Column, Table } from 'sequelize-typescript'

import BrandSchema from './brand.model'
import UserSchema from './user.model'

const { INTEGER, STRING, JSON } = DataTypes

export interface Follower {
  followerID?: number
  brandID: number
  userID: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'followers',
  modelName: 'Follower'
})
class FollowerSchema extends Model<Follower> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare followerID: number

  @BelongsTo(() => BrandSchema, { foreignKey: 'brandID' })
  @Column({ type: INTEGER })
  declare brandID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  @Column({ type: INTEGER })
  declare userID: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

export default FollowerSchema
