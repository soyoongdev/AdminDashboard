import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING, JSON } = DataTypes

export interface Rate {
  rateID?: number
  productID: number
  userID: number
  media?: { id: number; url: string; orderNumber: number }[]
  title: string
  like: number
  desc?: string
  orderNumber?: number
}

export interface RateInstance extends Model<Rate>, Rate {}

const RateSchema = sequelize.define<RateInstance>('rates', {
  rateID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productID: {
    allowNull: false,
    type: INTEGER
  },
  userID: {
    type: INTEGER
  },
  media: {
    type: JSON,
    allowNull: true,
    defaultValue: []
  },
  title: {
    allowNull: false,
    type: STRING
  },
  like: {
    type: INTEGER,
    defaultValue: 0
  },
  desc: {
    type: STRING,
    allowNull: true
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(RateSchema)

export default RateSchema
