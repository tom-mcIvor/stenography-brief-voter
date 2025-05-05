exports.seed = async (knex) => {
    await knex('words').del()
    await knex('brief-votes').del()
  }