import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidatoes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('licitacao_id').references('id').inTable('licitacoes').onDelete('CASCADE')
      table.string('endereco').notNullable() // Endereço do candidato na blockchain
      table.string('hash_candidatura').notNullable()
      table.timestamp('timestamp_envio').notNullable()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}