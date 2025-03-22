import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Licitante from './licitante.js';
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class RamoAtividade extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string;

  @hasMany(() => Licitante)
  declare licitantes: HasMany<typeof Licitante>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}