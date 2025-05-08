/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('brief_votes', (table) => {
    table.increments('id')
    table.integer('word_id')
    table.integer('user_id')
    table.string('brief')
    table.string('theory')
    table.timestamp('created_at')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('brief_votes')
}
