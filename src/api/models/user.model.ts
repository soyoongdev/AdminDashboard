import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, BOOLEAN, STRING } = DataType

export interface User {
  userID?: number
  role: 'user' | 'admin'
  username: string
  fullname?: string
  email: string
  password: string
  avatar?: string
  phone: string
  address: string
  birthday?: string
  orderNumber?: number
  isTemp?: boolean
}

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User'
})
class UserSchema extends Model<User> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare userID: number

  @Column({ type: STRING, values: ['user', 'admin'] })
  declare role: string

  @Column({ type: STRING })
  declare username: string

  @Column({ type: STRING })
  declare fullname: string

  @Column({ type: STRING })
  declare email: string

  @Column({ type: STRING })
  declare password: string

  @Column({ type: STRING })
  declare avatar: string

  @Column({ type: STRING })
  declare phone: string

  @Column({ type: STRING })
  declare address: string

  @Column({ type: STRING })
  declare birthday: string

  @Column({ type: INTEGER })
  declare orderNumber: number

  @Column({ type: BOOLEAN })
  declare isTemp: boolean
}

// UserSchema.addHook('beforeSave', (self) => {})
// UserSchema.hasMany(CartSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FavoriteSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(RateSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FollowerSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(TransitionSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(ReservationSchema, { foreignKey: 'userID' })

export default UserSchema
