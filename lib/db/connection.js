const knex = require('knex')
const path = require('path')

// Only create the connection on the server side
const connection =
  typeof window === 'undefined'
    ? knex({
        client: 'sqlite3',
        connection: {
          filename: path.join(__dirname, 'dev.sqlite3'),
        },
        useNullAsDefault: true,
      })
    : null

module.exports = connection
