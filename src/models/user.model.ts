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
      type: INTEGER,
      allowNull: true
    },
    username: {
      type: STRING,
      allowNull: true
    },
    fullname: { type: STRING, allowNull: true },
    email: { type: STRING, allowNull: true },
    password: { type: STRING, allowNull: true },
    avatar: { type: STRING, allowNull: true },
    phone: { type: STRING, allowNull: true },
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
