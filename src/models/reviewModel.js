const pool = require('../config/db');

const createReview = async (bookId, userId, rating, comment) => {
  const result = await pool.query(
    'INSERT INTO reviews (book_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *',
    [bookId, userId, rating, comment]
  );
  return result.rows[0];
};

const findReviewByBookAndUser = async (bookId, userId) => {
  const result = await pool.query(
    'SELECT * FROM reviews WHERE book_id = $1 AND user_id = $2',
    [bookId, userId]
  );
  return result.rows[0];
};

const updateReview = async (id, rating, comment) => {
  const result = await pool.query(
    'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *',
    [rating, comment, id]
  );
  return result.rows[0];
};

const deleteReview = async (id) => {
  await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
};

const findReviewById = async (id) => {
  const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = {
  createReview,
  findReviewByBookAndUser,
  updateReview,
  deleteReview,
  findReviewById,
};