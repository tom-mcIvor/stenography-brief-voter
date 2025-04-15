import { prisma } from '../lib/prisma'
import { initializeDatabase, closeDatabase } from '../lib/db'

describe('Database Operations', () => {
  beforeAll(async () => {
    await initializeDatabase()
  })

  afterAll(async () => {
    await closeDatabase()
  })

  test('should create a new word', async () => {
    const word = await prisma.word.create({
      data: {
        word: 'test',
        description: 'test description',
        examples: 'test examples',
        userId: 1,
        briefs: {
          create: {
            brief: 'TEFT',
            theory: 'phoenix',
            votes: 0
          }
        }
      },
      include: {
        briefs: true
      }
    })

    expect(word).toHaveProperty('id')
    expect(word.word).toBe('test')
    expect(word.briefs[0].brief).toBe('TEFT')
  })

  test('should retrieve words', async () => {
    const words = await prisma.word.findMany({
      include: {
        briefs: true
      }
    })

    expect(Array.isArray(words)).toBe(true)
    expect(words.length).toBeGreaterThan(0)
  })

  test('should update a word', async () => {
    const word = await prisma.word.findFirst()
    if (!word) return

    const updatedWord = await prisma.word.update({
      where: { id: word.id },
      data: { description: 'updated description' }
    })

    expect(updatedWord.description).toBe('updated description')
  })

  test('should delete a word', async () => {
    const word = await prisma.word.findFirst()
    if (!word) return

    await prisma.word.delete({
      where: { id: word.id }
    })

    const deletedWord = await prisma.word.findUnique({
      where: { id: word.id }
    })

    expect(deletedWord).toBeNull()
  })
}) 