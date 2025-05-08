/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Insert sample brief votes
  await knex('brief_votes').insert([
    {
      word_id: 1,
      user_id: 1,
      brief: 'T',
      theory: 'phoenix',
      created_at: new Date().toISOString(),
    },
    {
      word_id: 1,
      user_id: 2,
      brief: 'THE',
      theory: 'stened',
      created_at: new Date().toISOString(),
    },
    {
      word_id: 2,
      user_id: 1,
      brief: 'B',
      theory: 'phoenix',
      created_at: new Date().toISOString(),
    },
    {
      word_id: 2,
      user_id: 3,
      brief: 'BE',
      theory: 'magnum',
      created_at: new Date().toISOString(),
    },
    {
      word_id: 3,
      user_id: 2,
      brief: 'TO',
      theory: 'stened',
      created_at: new Date().toISOString(),
    },
    {
      word_id: 4,
      user_id: 1,
      brief: '-F',
      theory: 'lapwing',
      created_at: new Date().toISOString(),
    },
  ])
}
