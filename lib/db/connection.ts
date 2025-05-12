import knex from 'knex'
import config from '../../knexfile'

const environment = process.env.NODE_ENV || 'development'
const connection = knex({
  ...config[environment],
  client: 'sqlite3',
  useNullAsDefault: true,
})

export default connection
