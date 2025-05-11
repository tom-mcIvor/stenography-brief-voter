const knex = require('knex')

// Only create the connection on the server side
const connection =
  typeof window === 'undefined'
    ? knex({
        client: 'sqlite3',
        connection: {
          filename: './lib/db/dev.sqlite3',
        },
        useNullAsDefault: true,
        migrations: {
          directory: './lib/db/migrations',
        },
        seeds: {
          directory: './lib/db/seeds',
        },
      })
    : null

module.exports = connection
