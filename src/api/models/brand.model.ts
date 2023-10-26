import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, JSON } = DataType

export interface Brand {
  brandID?: number
  brandType: 'standard' | 'verified'
  name: string
  desc?: string
  logo?: string
  phone?: string
  address?: string
  email: string
  password: string
  website?: string
  policy?: string
  orderNumber?: number
}

@Table({
  timestamps: true,
  tableName: 'brands',
  modelName: 'Brand'
})
class BrandSchema extends Model<Brand> {
  @Column({
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  declare brandID: number

  @Column({ type: STRING, values: ['standard', 'verified'] })
  declare brandType: string

  @Column({ type: STRING })
  declare name: string

  @Column({ type: STRING })
  declare logo: string

  @Column({ type: STRING })
  declare desc?: string

  @Column({ type: INTEGER })
  declare phone?: number

  @Column({ type: STRING })
  declare address?: string

  @Column({ type: STRING })
  declare email: string

  @Column({ type: STRING })
  declare password: string

  @Column({ type: STRING })
  declare website?: string

  @Column({ type: STRING })
  declare policy?: string

  @Column({ type: INTEGER })
  declare orderNumber?: number
}

export default BrandSchema
