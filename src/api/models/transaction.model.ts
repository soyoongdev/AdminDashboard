import { DataTypes, Model } from 'sequelize'
import { sequelize, syncModel } from '~/config/sequelize.config'

const { INTEGER, STRING } = DataTypes

export interface Transition {
  transitionID?: number
  userID: number
  cartID: number
  transitionTypeID: number
  amount: number
  orderNumber?: number
}

export interface TransitionInstance extends Model<Transition>, Transition {}

const TransitionSchema = sequelize.define<TransitionInstance>('transitions', {
  transitionID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userID: {
    type: INTEGER
  },
  cartID: {
    type: INTEGER
  },
  transitionTypeID: {
    type: INTEGER
  },
  amount: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

syncModel(TransitionSchema)

export default TransitionSchema
