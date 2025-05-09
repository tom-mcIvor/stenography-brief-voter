const connection = require('./connection')

function getWords(db = connection) {
  return db('words').select('id', 'word', 'user_id', 'created_at')
}

function getWordById(id, db = connection) {
  return db('words')
    .where('id', id)
    .select('id', 'word', 'user_id', 'created_at')
    .first()
}

function addWord(newWord, db = connection) {
  return db('words').insert({
    word: newWord.word,
    user_id: newWord.userId,
    created_at: new Date().toISOString(),
  })
}

function updateWord(id, word, db = connection) {
  return db('words').where('id', id).update({
    word: word.word,
    user_id: word.userId,
  })
}

function deleteWord(id, db = connection) {
  return db('words').where('id', id).del()
}

function getBriefVotesByWordId(wordId, db = connection) {
  return db('brief_votes')
    .select('id', 'word_id', 'user_id', 'brief', 'theory', 'created_at')
    .where('word_id', wordId)
}

function addBriefVote(newVote, db = connection) {
  return db('brief_votes').insert({
    word_id: newVote.wordId,
    user_id: newVote.userId,
    brief: newVote.brief,
    theory: newVote.theory,
    created_at: new Date().toISOString(),
  })
}

function updateBriefVote(id, vote, db = connection) {
  return db('brief_votes').where('id', id).update({
    brief: vote.brief,
    theory: vote.theory,
  })
}

function deleteBriefVote(id, db = connection) {
  return db('brief_votes').where('id', id).del()
}

module.exports = {
  getWords,
  getWordById,
  addWord,
  updateWord,
  deleteWord,
  getBriefVotesByWordId,
  addBriefVote,
  updateBriefVote,
  deleteBriefVote,
}
