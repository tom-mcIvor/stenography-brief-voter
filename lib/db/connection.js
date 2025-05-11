const knex = require('knex')
const config = require('./knexfile')

// Only create the connection on the server side
const connection =
  typeof window === 'undefined'
    ? knex(config[process.env.NODE_ENV || 'development'])
    : null

module.exports = connection
