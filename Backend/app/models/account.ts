import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import User from './user.js';
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations';
import { randomUUID } from 'node:crypto';

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string = randomUUID()

  @column()
  public address: string = '';

  @column()
  public privateKeyHash: string = '';

  @column()
  public canSendTransactions: boolean = false;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime = DateTime.local()

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime = DateTime.local()

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>
}