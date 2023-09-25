import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

const { INTEGER, BOOLEAN, STRING } = DataTypes

export interface User {
  userID?: number
  roleID?: number
  username?: string
  fullname?: string
  email?: string
  password?: string
  avatar?: string
  phone?: string
  address?: string
  birthday?: string
  orderNumber?: number
  isTemp?: boolean
}

const UserSchema = sequelize.define<Model<User>>('user', {
  userID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleID: {
    type: INTEGER
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