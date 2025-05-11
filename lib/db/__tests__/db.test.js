const knex = require('knex')
const config = require('../knexfile')
const db = require('../db')

describe('Database Tests', () => {
  let testDb

  beforeAll(async () => {
    testDb = knex(config.test)
    await testDb.migrate.latest()
    await testDb.seed.run()
  })

  afterAll(async () => {
    await testDb.destroy()
  })

  describe('Words Table', () => {
    test('should insert a new word', async () => {
      const newWord = {
        word: 'test',
        userId: 1,
      }

      const [id] = await db.addWord(newWord, testDb)
      const insertedWord = await db.getWordById(id, testDb)

      expect(insertedWord.word).toBe(newWord.word)
      expect(insertedWord.user_id).toBe(newWord.userId)
    })

    test('should retrieve all words', async () => {
      const words = await db.getWords(testDb)
      expect(words.length).toBeGreaterThan(0)
      expect(words[0]).toHaveProperty('word')
      expect(words[0]).toHaveProperty('user_id')
    })

    test('should update a word', async () => {
      const wordId = 1
      const updatedWord = {
        word: 'updated',
        userId: 1,
      }

      await db.updateWord(wordId, updatedWord, testDb)
      const result = await db.getWordById(wordId, testDb)

      expect(result.word).toBe(updatedWord.word)
    })

    test('should delete a word', async () => {
      const wordId = 1
      await db.deleteWord(wordId, testDb)
      const result = await db.getWordById(wordId, testDb)
      expect(result).toBeUndefined()
    })
  })

  describe('Brief Votes Table', () => {
    test('should insert a new brief vote', async () => {
      const newVote = {
        wordId: 1,
        userId: 1,
        brief: 'T-',
        theory: 'Test theory',
      }

      const [id] = await db.addBriefVote(newVote, testDb)
      const votes = await db.getBriefVotesByWordId(1, testDb)
      const insertedVote = votes.find((v) => v.id === id)

      expect(insertedVote).toBeDefined()
      expect(insertedVote.brief).toBe(newVote.brief)
      expect(insertedVote.theory).toBe(newVote.theory)
    })

    test('should update a brief vote', async () => {
      const voteId = 1
      const updatedVote = {
        brief: 'UPD',
        theory: 'Updated theory',
      }

      await db.updateBriefVote(voteId, updatedVote, testDb)
      const votes = await db.getBriefVotesByWordId(1, testDb)
      const result = votes.find((v) => v.id === voteId)

      expect(result.brief).toBe(updatedVote.brief)
      expect(result.theory).toBe(updatedVote.theory)
    })

    test('should delete a brief vote', async () => {
      const voteId = 1
      await db.deleteBriefVote(voteId, testDb)
      const votes = await db.getBriefVotesByWordId(1, testDb)
      const result = votes.find((v) => v.id === voteId)
      expect(result).toBeUndefined()
    })

    test('should get all votes for a word', async () => {
      const wordId = 1
      const votes = await db.getBriefVotesByWordId(wordId, testDb)

      expect(Array.isArray(votes)).toBe(true)
      votes.forEach((vote) => {
        expect(vote.word_id).toBe(wordId)
      })
    })
  })
})
