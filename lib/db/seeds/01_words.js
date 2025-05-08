/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Insert sample words
  await knex('words').insert([
    {
      id: 1,
      word: 'the',
      user_id: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 2,
      word: 'be',
      user_id: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: 3,
      word: 'to',
      user_id: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: 4,
      word: 'of',
      user_id: 1,
      created_at: new Date().toISOString(),
    },
  ])
}
