import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Endereco from './endereco.js'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import RamoAtividade from './ramo_atividade.js'
import Contato from './contato.js'

export default class Licitante extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomeFantasia: string

  @column()
  declare razaoSocial: string

  @column()
  declare cnpj: string

  @hasMany(() => Contato)
  declare contatos: HasMany<typeof Contato>

  @hasOne(() => Endereco)
  declare endereco: HasOne<typeof Endereco>

  @belongsTo(() => User)
  declare representante: BelongsTo<typeof User>

  @column()
  declare representanteId: number

  @belongsTo(() => RamoAtividade)
  declare ramoAtividade: BelongsTo<typeof RamoAtividade>;

  @column()
  declare ramoAtividadeId: number

  @column()
  declare contractAddress: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}