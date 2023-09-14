import { DataTypes } from 'sequelize'
import { sequelize } from '~/config/database'

const { STRING, INTEGER } = DataTypes

const UserSchema = sequelize.define(
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

;(async () => {
  await UserSchema.sync()
})()

export default UserSchema
