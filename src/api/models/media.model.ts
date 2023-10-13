import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { syncModel } from '~/models/index'

const { INTEGER, STRING, JSON } = DataType

export interface Media {
  mediaID?: number
  mediableID: number
  url: string
  mediaType: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'inventories',
  modelName: 'Inventory'
})
class MediaSchema extends Model<Media> {
  @Column({ type: INTEGER })
  declare mediaID: number

  @Column({ type: INTEGER })
  declare mediableID: number

  @Column({ type: INTEGER })
  declare url: string

  @Column({ type: INTEGER })
  declare mediaType: string

  @Column({ type: INTEGER })
  declare orderNumber: number
}

syncModel(MediaSchema)

export default MediaSchema
