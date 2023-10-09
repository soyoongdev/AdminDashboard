import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING } = DataTypes

export interface TransitionType {
  transitionTypeID?: number
  title: string
  desc?: string
  orderNumber?: number
}

export interface TransitionTypeInstance extends Model<TransitionType>, TransitionType {}

const TransitionTypeSchema = sequelize.define<TransitionTypeInstance>('transition_types', {
  transitionTypeID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: STRING
  },
  desc: {
    type: STRING
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(TransitionTypeSchema)

export default TransitionTypeSchema
