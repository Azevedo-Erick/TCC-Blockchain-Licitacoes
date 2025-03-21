import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transacoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('licitacao_id').references('id').inTable('licitacoes').onDelete('CASCADE')
      table.string('tipo_transacao').notNullable() // Ex: "licitacao_criada", "candidatura_enviada"
      table.timestamp('timestamp').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}