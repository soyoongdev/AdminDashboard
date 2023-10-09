import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

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

syncModel(UserSchema)

export default UserSchema
