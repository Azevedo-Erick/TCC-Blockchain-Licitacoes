import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'licitantes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table.string('nome_fantasia').notNullable()
      table.string('razao_social').notNullable()
      table.string('cnpj').notNullable().unique()

      table
        .integer('representante_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
        .nullable()

      table
        .integer('ramo_atividade_id')
        .unsigned()
        .references('id')
        .inTable('ramo_atividades')
        .onDelete('SET NULL')
        .nullable()

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}