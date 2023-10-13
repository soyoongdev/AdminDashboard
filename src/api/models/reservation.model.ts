import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'
import InventorySchema from './inventory.model'
import UserSchema from './user.model'

const { INTEGER, STRING, JSON } = DataType

export interface Reservation {
  reservationID?: number
  inventoryID: number
  userID: number
  quantity: number
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'reservations',
  modelName: 'Reservation'
})
class ReservationSchema extends Model<Reservation> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare reservationID: number

  @BelongsTo(() => InventorySchema, { foreignKey: 'inventoryID' })
  @Column({ type: INTEGER })
  declare inventoryID: number

  @BelongsTo(() => UserSchema, { foreignKey: 'userID' })
  @Column({ type: INTEGER })
  declare userID: number

  @Column({ type: INTEGER })
  declare quantity: number

  @Column({ type: INTEGER })
  declare orderNumber?: number
}

syncModel(ReservationSchema)

export default ReservationSchema
