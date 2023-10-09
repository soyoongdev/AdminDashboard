import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING, JSON } = DataTypes

export interface Brand {
  brandID?: number
  brandType: 'standard' | 'verified'
  name: string
  desc?: string
  logo?: string
  phone?: string
  address?: string
  email: string
  password?: string
  website?: string
  policy?: string
  orderNumber?: number
}

export interface BrandInstance extends Model<Brand>, Brand {}

const BrandSchema = sequelize.define<BrandInstance>('brands', {
  brandID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  brandType: {
    type: STRING,
    defaultValue: 'standard'
  },
  name: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  logo: {
    type: STRING
  },
  phone: {
    type: STRING
  },
  address: {
    type: STRING
  },
  email: {
    type: STRING
  },
  password: {
    type: STRING
  },
  website: {
    type: STRING
  },
  policy: {
    type: STRING
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(BrandSchema)

export default BrandSchema
