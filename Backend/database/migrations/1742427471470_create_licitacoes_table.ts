import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'licitacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('titulo').notNullable()
      table.text('descricao').notNullable()
      table.string('hash_etp').notNullable()
      table.string('hash_edital').notNullable()
      table.string('hash_contrato').notNullable() // Hash do contrato na blockchain
      table.timestamp('data_inicio').notNullable()
      table.timestamp('data_inicio_candidaturas').notNullable()
      table.timestamp('data_fim_candidaturas').notNullable()
      table.enum('estagio', ['registro', 'candidatura', 'finalizado']).defaultTo('registro')

      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}