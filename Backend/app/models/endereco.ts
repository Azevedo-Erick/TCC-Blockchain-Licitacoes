import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Cidade from './cidade.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Licitante from './licitante.js'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Cidade)
  declare cidade: BelongsTo<typeof Cidade>

  @column()
  declare cidadeId: number

  @column()
  declare cep: string

  @column()
  declare logradouro: string

  @column()
  declare numero: string

  @column()
  declare complemento: string

  @column()
  declare bairro: string

  @column()
  declare referencia: string

  @column()
  declare rua: string

  @column()
  declare quadra: string

  @column()
  declare lote: string

  @belongsTo(() => Licitante)
  declare licitante: BelongsTo<typeof Licitante>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}