import { DataTypes, Model } from 'sequelize'
import { sequelize } from '~/config/database.config'
import { syncModel } from '.'

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

syncModel(ReservationSchema)

export default ReservationSchema
