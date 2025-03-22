import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Estado from './estado.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'

export default class Cidade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare nome: string

  @belongsTo(() => Estado)
  declare estado: BelongsTo<typeof Estado>

  @hasMany(() => Endereco)
  declare enderecos: HasMany<typeof Endereco>

  @column()
  declare estadoId: number
}