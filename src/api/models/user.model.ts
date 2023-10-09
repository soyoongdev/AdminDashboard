import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import CartSchema from './cart.model'
import FavoriteSchema from './favorite.model'
import FollowerSchema from './follow.model'
import RateSchema from './rate.model'
import ReservationSchema from './reservation.model'
import TransitionSchema from './transaction.model'

const { INTEGER, BOOLEAN, STRING } = DataTypes

export interface User {
  userID?: number
  role: 'user' | 'admin'
  username: string
  fullname?: string
  email: string
  password: string
  avatar?: string
  phone: string
  address: string
  birthday?: string
  orderNumber?: number
  isTemp?: boolean
}

export interface UserInstance extends Model<User>, User {}

const UserSchema = sequelize.define<UserInstance>('users', {
  userID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  role: {
    type: STRING,
    defaultValue: 'user'
  },
  username: {
    type: STRING
  },
  fullname: { type: STRING, allowNull: true },
  email: { type: STRING },
  password: { type: STRING },
  avatar: { type: STRING, allowNull: true },
  phone: { type: STRING, allowNull: true },
  address: { type: STRING },
  birthday: { type: STRING, allowNull: true },
  orderNumber: { type: INTEGER, defaultValue: 0 },
  isTemp: { type: BOOLEAN, allowNull: true, defaultValue: false }
})

UserSchema.hasMany(CartSchema, { foreignKey: 'userID' })
UserSchema.hasMany(FavoriteSchema, { foreignKey: 'userID' })
UserSchema.hasMany(RateSchema, { foreignKey: 'userID' })
UserSchema.hasMany(FollowerSchema, { foreignKey: 'userID' })
UserSchema.hasMany(TransitionSchema, { foreignKey: 'userID' })
UserSchema.hasMany(ReservationSchema, { foreignKey: 'userID' })

syncModel(UserSchema)

export default UserSchema
