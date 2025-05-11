/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('brief_votes', (table) => {
    table.increments('id')
    table.integer('word_id').notNullable()
    table.integer('user_id').notNullable()
    table.string('brief').notNullable()
    table.string('theory').notNullable()
    table.integer('votes').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('brief_votes')
}
