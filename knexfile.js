const path = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, 'lib/db/dev.sqlite3'),
    },
    migrations: {
      directory: path.join(__dirname, 'lib/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'lib/db/seeds'),
    },
    useNullAsDefault: true,
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:',
    },
    migrations: {
      directory: path.join(__dirname, 'lib/db/migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'lib/db/seeds'),
    },
    useNullAsDefault: true,
  },
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
    },
    useNullAsDefault: true,
  },
}
