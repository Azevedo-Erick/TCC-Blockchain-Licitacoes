import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Candidato from './candidato.js'
import Transacao from './transacao.js'
import type { HasMany } from '@adonisjs/lucid/types/relations';

export default class Licitacao extends BaseModel {
  public static table = 'licitacoes'

  @column({ isPrimary: true })
  public id: string = '';

  @column()
  public titulo: string = '';

  @column()
  public descricao: string = '';

  @column()
  public hashEtp: string = '';

  @column()
  public hashEdital: string = '';

  @column()
  public hashContrato: string = '';

  @column.dateTime()
  public dataInicio: DateTime = DateTime.local()

  @column.dateTime()
  public dataInicioCandidaturas: DateTime = DateTime.local()

  @column.dateTime()
  public dataFimCandidaturas: DateTime = DateTime.local()

  @column()
  public estagio: 'registro' | 'candidatura' | 'finalizado' = 'registro'

  @hasMany(() => Candidato)
  public candidatos!: HasMany<typeof Candidato>;

  @hasMany(() => Transacao)
  public transacoes!: HasMany<typeof Transacao>;
}