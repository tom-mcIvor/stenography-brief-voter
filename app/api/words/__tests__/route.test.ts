import { jest } from '@jest/globals'
import { POST } from '../route'
import knex from '@/lib/db/connection.js'

// Mock the database connection
jest.mock('@/lib/db/connection', () => {
  const mockKnex = {
    insert: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    first: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    into: jest.fn().mockReturnThis(),
  }
  return {
    __esModule: true,
    default: mockKnex,
  }
})

describe('Words API Route', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  test('should create a new word with brief vote', async () => {
    // Mock successful database operations
    const mockWordId = 1
    const mockWord = {
      id: mockWordId,
      word: 'test',
      description: 'Test description',
      examples: JSON.stringify(['example1', 'example2']),
      user_id: 1,
      created_at: new Date(),
    }
    const mockBriefVotes = [
      {
        id: 1,
        word_id: mockWordId,
        user_id: 1,
        brief: 'T-',
        theory: 'phoenix',
        votes: 0,
        created_at: new Date(),
      },
    ]

    // Setup mocks with proper chaining
    const mockKnex = (knex as unknown as jest.Mocked<NonNullable<typeof knex>>)!
    mockKnex.insert.mockReturnThis()
    mockKnex.where.mockReturnThis()
    mockKnex.first.mockReturnThis()
    mockKnex.select.mockReturnThis()
    mockKnex.from.mockReturnThis()
    mockKnex.into.mockReturnThis()

    // Setup return values
    mockKnex.into.mockResolvedValueOnce([mockWordId])
    mockKnex.into.mockResolvedValueOnce([1])
    mockKnex.first.mockResolvedValueOnce(mockWord)
    mockKnex.select.mockResolvedValueOnce(mockBriefVotes)

    // Create request
    const request = new Request('http://localhost:3000/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: 'test',
        description: 'Test description',
        examples: ['example1', 'example2'],
        initialBrief: 'T-',
      }),
    })

    // Call the route handler
    const response = await POST(request)
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(201)
    expect(data).toMatchObject({
      ...mockWord,
      briefs: mockBriefVotes,
    })
    expect(mockKnex.insert).toHaveBeenCalledTimes(2) // Once for word, once for brief vote
  })

  test('should return 400 when required fields are missing', async () => {
    // Create request with missing fields
    const request = new Request('http://localhost:3000/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: 'test',
        // Missing description, examples, and initialBrief
      }),
    })

    // Call the route handler
    const response = await POST(request)
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(400)
    expect(data).toHaveProperty('error', 'Missing required fields')
    expect((knex as NonNullable<typeof knex>).insert).not.toHaveBeenCalled()
  })

  test('should return 500 when database operation fails', async () => {
    // Mock database error
    const mockKnex = (knex as unknown as jest.Mocked<NonNullable<typeof knex>>)!
    mockKnex.insert.mockReturnThis()
    mockKnex.into.mockRejectedValueOnce(new Error('Database error'))

    // Create request
    const request = new Request('http://localhost:3000/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: 'test',
        description: 'Test description',
        examples: ['example1', 'example2'],
        initialBrief: 'T-',
      }),
    })

    // Call the route handler
    const response = await POST(request)
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(500)
    expect(data).toHaveProperty('error', 'Failed to add word')
  })

  test('should properly handle examples as JSON string', async () => {
    const mockWordId = 1
    const examples = ['example1', 'example2']

    // Setup mocks with proper chaining
    const mockKnex = (knex as unknown as jest.Mocked<NonNullable<typeof knex>>)!
    mockKnex.insert.mockReturnThis()
    mockKnex.where.mockReturnThis()
    mockKnex.first.mockReturnThis()
    mockKnex.select.mockReturnThis()
    mockKnex.from.mockReturnThis()
    mockKnex.into.mockReturnThis()

    // Setup return values
    mockKnex.into.mockResolvedValueOnce([mockWordId])
    mockKnex.into.mockResolvedValueOnce([1])
    mockKnex.first.mockResolvedValueOnce({
      id: mockWordId,
      word: 'test',
      description: 'Test description',
      examples: JSON.stringify(examples),
      user_id: 1,
      created_at: new Date(),
    })
    mockKnex.select.mockResolvedValueOnce([])

    // Create request
    const request = new Request('http://localhost:3000/api/words', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word: 'test',
        description: 'Test description',
        examples,
        initialBrief: 'T-',
      }),
    })

    // Call the route handler
    const response = await POST(request)
    const data = await response.json()

    // Assertions
    expect(response.status).toBe(201)
    expect(mockKnex.insert).toHaveBeenCalledWith(
      expect.objectContaining({
        examples: JSON.stringify(examples),
      })
    )
  })
})
