import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'

const { STRING, INTEGER } = DataTypes

export interface User {
  userID?: number
  roleID: number
  username: string
  fullname?: string
  email: string
  password: string
  avatar?: string
  phone?: string
  address?: string
  birthday?: string
  orderNumber: number
}

const UserSchema = sequelize.define<Model<User>>(
  'user',
  {
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
    orderNumber: { type: INTEGER, defaultValue: 0 }
  },
  {
    timestamps: true
  }
)

// Define associations

// Function to synchronize a model
;(async () => {
  await UserSchema.sync()
})()

export default UserSchema
