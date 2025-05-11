const db = require('./db')

async function testDatabase() {
  try {
    // Add a test word
    const newWord = {
      word: 'test',
      userId: 1,
    }
    const addedWord = await db.addWord(newWord)
    console.log('Added word:', addedWord)

    // Get all words to verify
    const words = await db.getWords()
    console.log('All words:', words)

    // Add a brief vote for the word
    const newVote = {
      wordId: 1,
      userId: 1,
      brief: 'T',
      theory: 'phoenix',
    }
    const addedVote = await db.addBriefVote(newVote)
    console.log('Added brief vote:', addedVote)

    // Get brief votes for the word
    const votes = await db.getBriefVotesByWordId(1)
    console.log('Brief votes for word:', votes)
  } catch (error) {
    console.error('Error testing database:', error)
  }
}

testDatabase()
