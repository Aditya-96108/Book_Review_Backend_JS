const pool = require('../config/db');

const createBook = async (title, author, genre) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *',
    [title, author, genre]
  );
  return result.rows[0];
};

const getAllBooks = async (page, limit, author, genre) => {
  const offset = (page - 1) * limit;
  let query = 'SELECT * FROM books WHERE 1=1';
  const values = [];
  if (author) {
    values.push(`%${author}%`);
    query += ` AND author ILIKE $${values.length}`;
  }
  if (genre) {
    values.push(genre);
    query += ` AND genre = $${values.length}`;
  }
  query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
  values.push(limit, offset);
  const result = await pool.query(query, values);
  return result.rows;
};

const getBookById = async (id) => {
  const bookResult = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
  if (bookResult.rows.length === 0) return null;

  const avgRatingResult = await pool.query(
    'SELECT AVG(rating) as average_rating FROM reviews WHERE book_id = $1',
    [id]
  );
  const reviewsResult = await pool.query(
    'SELECT * FROM reviews WHERE book_id = $1 ORDER BY created_at DESC',
    [id]
  );

  return {
    ...bookResult.rows[0],
    average_rating: parseFloat(avgRatingResult.rows[0].average_rating) || 0,
    reviews: reviewsResult.rows,
  };
};

const searchBooks = async (query) => {
  const result = await pool.query(
    'SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1',
    [`%${query}%`]
  );
  return result.rows;
};

module.exports = { createBook, getAllBooks, getBookById, searchBooks };