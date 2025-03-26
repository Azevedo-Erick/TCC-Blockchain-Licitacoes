import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeSave, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Account from './account.js'
import type { BelongsTo, ExtractModelRelations, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { Hash } from '@adonisjs/core/hash'
import Role from './role.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  @hasOne(() => Account, {
    foreignKey: 'userId',
  })
  public account!: HasOne<typeof Account>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
  @column()
  declare roleId: number

  public async hasPermission(permissionName: string): Promise<boolean> {
    const role = this.role;

    return role.permissions.some((permission) => permission.name === permissionName)
  }

  public async loadRolesWithPermissions(): Promise<void> {
    /* await this.load((user) => user.roles as ExtractModelRelations<this>, (roleQuery) => {
      roleQuery.preload((role) => role.permissions as ExtractModelRelations<Role>)
    }) */
  }

}