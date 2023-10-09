import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import CartSchema from './cart.model'
import OrderSchema from './order.model'
import TransitionTypeSchema from './transition_type.model'
import UserSchema from './user.model'

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

TransitionSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
TransitionSchema.belongsTo(CartSchema, { foreignKey: 'cartID' })
TransitionSchema.belongsTo(TransitionTypeSchema, { foreignKey: 'transitionTypeID' })
TransitionSchema.hasOne(OrderSchema, { foreignKey: 'transitionID' })

syncModel(TransitionSchema)

export default TransitionSchema
