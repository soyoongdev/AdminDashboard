import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, STRING, JSON } = DataTypes

export interface Follower {
  followerID?: number
  brandID: number
  userID: number
  orderNumber?: number
}

export interface FollowerInstance extends Model<Follower>, Follower {}

const FollowerSchema = sequelize.define<FollowerInstance>('followers', {
  followerID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brandID: {
    type: INTEGER
  },
  userID: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(FollowerSchema)

export default FollowerSchema
