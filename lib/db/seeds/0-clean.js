/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('brief_votes').del()
  await knex('words').del()

  // Reset the auto-increment counters for SQLite
  await knex.raw('DELETE FROM sqlite_sequence WHERE name IN (?, ?)', [
    'brief_votes',
    'words',
  ])
}
