import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Licitacao from './licitacao.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations';

export default class Candidato extends BaseModel {
  @column({ isPrimary: true })
  public id: string = '';

  @column()
  public licitacaoId: string = '';

  @column()
  public endereco: string = '';

  @column()
  public hashCandidatura: string = '';

  @column.dateTime()
  public timestampEnvio: DateTime = DateTime.local();

  @belongsTo(() => Licitacao)
  public licitacao!: BelongsTo<typeof Licitacao>;
}