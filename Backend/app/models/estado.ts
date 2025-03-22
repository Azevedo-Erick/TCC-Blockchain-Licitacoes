import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Cidade from './cidade.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Estado extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare nome: string

  @column()
  declare sigla: string

  @hasMany(() => Cidade)
  declare cidades: HasMany<typeof Cidade>
}