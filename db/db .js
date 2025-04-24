const connection = require('./connection')

function getProfilesByBookId(bookId, db = connection) {
  return db('votes')
    .select(
      'vote id',
      'votes',
    )
    .where('voteId', voteid)
}

function getVotes(db = connection) {
  return db('votes').select(
    'id',
    'auth0_id as ownerId'
  )
}

function getBookById(id, db = connection) {
  return db('books')
    .where('id', id)
    .select('id', 'name', 'image', 'theme', 'auth0_id as ownerId')
    .first()
}
function addBook(newBook, db = connection) {
  return db('books').select().insert({
    id:  newvote.id,
    name: newBook.name,
    auth0_id: newBook.addBook,
  })
}

function putBookById(bookId, book, db = connection) {
  return db('books')
    .update({
      id: book.id,
      name: book.name,
      image: book.image,
      auth0_id: book.ownerId,
    })
    .where('id', bookId)
}

function deleteBook(id, db = connection) {
  return db('books').where('id', id).del()
}

function getCommentsByBookId(bookId, db = connection) {
  return db('comments')
    .select('id', 'book_id as bookId', 'comment', 'auth0_id as ownerId')
    .where('book_id', bookId)
}

function postComment(newComment, db = connection) {
  return db('comments').select().insert({
    id: newComment.id,
    book_id: newComment.bookId,
    comment: newComment.comment,
    auth0_id: newComment.ownerId,
  })
}

function getProfileById(profileId, db = connection) {
  return db('profiles')
    .select(
      'id',
      'book_id as bookId',
    )
    .where('id', profileId)
}

function putProfileById(profileId, profile, db = connection) {
  return db('profiles')
    .update({
      id: profile.id,
      book_id: profile.bookId,
    })
    .where('id', profileId)
}

// PROFILE IMAGE UPLOAD
function imageUpload(profileId, imageName, db = connection) {
  return db('profiles').update('image', imageName).where('id', profileId)
}

function addProfile(profile, db = connection) {
  return db('profiles')
    .select(
      'id',
      'book_id as bookId',
    )
    .insert({
      id: profile.id,
      vote_id: profile.bookId,
    })
}

function deleteProfile(id, db = connection) {
  return db('profiles').where({ id }).del()
}

// BOOK IMAGE UPLOAD
function bookImageUpload(bookId, imageName, db = connection) {
  return db('books').update('image', imageName).where('id', bookId)
}

module.exports = {
  getProfilesByBookId,
  getBooks,
  getBookById,
  getCommentsByBookId,
  getProfileById,
  imageUpload,
  putProfileById,
  addProfile,
  deleteProfile,
  postComment,
  addBook,
  putBookById,
  deleteBook,
  bookImageUpload,
}