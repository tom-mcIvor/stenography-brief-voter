import { prisma } from './prisma.js'

export async function initializeDatabase() {
  try {
    // This will create the database if it doesn't exist
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error
  }
}

export async function closeDatabase() {
  await prisma.$disconnect()
}

// Helper function to execute raw SQL queries if needed
export async function executeQuery(query, params = []) {
  try {
    const result = await prisma.$executeRawUnsafe(query, ...params)
    return result
  } catch (error) {
    console.error('Error executing query:', error)
    throw error
  }
} 