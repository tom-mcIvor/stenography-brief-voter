exports.up = function (knex) {
  return knex.schema.createTable('words', (table) => {
    table.increments('id')
    table.integer('user_id')
    table.string('word')
    table.timestamp('created_at')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('words')
}