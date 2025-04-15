import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { initializeDatabase } from './lib/db.js'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // Initialize database connection
  await initializeDatabase()

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
}) 