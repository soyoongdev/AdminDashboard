import { DataTypes, Model } from 'sequelize'
import sequelize, { syncModel } from '~/models'
import InventorySchema from './inventory.model'
import UserSchema from './user.model'

const { INTEGER, STRING, JSON } = DataTypes

export interface Reservation {
  reservationID?: number
  inventoryID: number
  userID: number
  quantity: number
  orderNumber?: number
}

export interface ReservationInstance extends Model<Reservation>, Reservation {}

const ReservationSchema = sequelize.define<ReservationInstance>('reservations', {
  reservationID: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inventoryID: {
    type: INTEGER
  },
  userID: {
    type: INTEGER
  },
  quantity: {
    type: INTEGER
  },
  orderNumber: { type: INTEGER, allowNull: true, defaultValue: 0 }
})

ReservationSchema.belongsTo(UserSchema, { foreignKey: 'userID' })
ReservationSchema.belongsTo(InventorySchema, { foreignKey: 'inventoryID' })

syncModel(ReservationSchema)

export default ReservationSchema
