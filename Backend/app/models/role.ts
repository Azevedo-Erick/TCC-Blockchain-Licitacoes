import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Permission from './permission.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  @column()
  public name: string = '';

  @manyToMany(() => User, {
    pivotTable: 'role_user',
  })
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Permission, {
    pivotTable: 'permission_role',
  })
  declare permissions: ManyToMany<typeof Permission>

}