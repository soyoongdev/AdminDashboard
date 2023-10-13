import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import CartSchema from './cart.model'
import TransitionTypeSchema from './transition_type.model'
import UserSchema from './user.model'

const { INTEGER, STRING } = DataType

export interface Transition {
  transitionID?: number
  userID: number
  cartID: number
  transitionTypeID: number
  amount: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'transitions',
  modelName: 'Transition'
})
class TransitionSchema extends Model<Transition> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare transitionID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  @Column({ type: INTEGER })
  declare userID: number

  @BelongsTo(() => CartSchema, { foreignKey: 'cartID' })
  @Column({ type: INTEGER })
  declare cartID: number

  @BelongsTo(() => TransitionTypeSchema, { foreignKey: 'transitionTypeID' })
  @Column({ type: INTEGER })
  declare transitionTypeID: number

  @Column({ type: INTEGER })
  declare amount: number

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// TransitionSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
// TransitionSchema.belongsTo(CartSchema, { foreignKey: 'cartID' })
// TransitionSchema.belongsTo(TransitionTypeSchema, { foreignKey: 'transitionTypeID' })
// TransitionSchema.hasOne(OrderSchema, { foreignKey: 'transitionID' })

syncModel(TransitionSchema)

export default TransitionSchema
