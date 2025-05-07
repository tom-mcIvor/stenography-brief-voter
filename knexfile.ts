import type { Knex } from 'knex'

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/database.sqlite',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations',
    },
  },
}

export default config
