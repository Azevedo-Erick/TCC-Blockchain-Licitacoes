import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onDelete('CASCADE')

      table.string('cep')
      table.string('logradouro')
      table.string('numero')
      table.string('complemento')
      table.string('bairro')
      table.string('referencia')
      table.string('rua')
      table.string('quadra')
      table.string('lote')

      table
        .integer('licitante_id')
        .unsigned()
        .references('id')
        .inTable('licitantes')
        .onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}