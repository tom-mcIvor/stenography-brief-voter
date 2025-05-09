const knex = require('knex')
const config = require('./knexfile')

// Use the appropriate environment configuration
const environment = process.env.NODE_ENV || 'development'
const dbConfig = {
  ...config[environment],
  client: 'sqlite3', // Explicitly set SQLite as the client
}

// Create the database connection
const db = knex(dbConfig)

module.exports = db
