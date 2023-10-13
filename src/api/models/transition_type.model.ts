import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'

const { INTEGER, STRING } = DataType

export interface TransitionType {
  transitionTypeID?: number
  title: string
  desc?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'transition_types',
  modelName: 'TransitionType'
})
class TransitionTypeSchema extends Model<TransitionType> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare transitionTypeID: number

  @Column({ type: STRING })
  declare title: string

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

// TransitionTypeSchema.hasMany(TransitionSchema, { foreignKey: 'transitionTypeID' })

syncModel(TransitionTypeSchema)

export default TransitionTypeSchema
