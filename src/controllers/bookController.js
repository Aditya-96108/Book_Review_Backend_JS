const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
} = require('../models/bookModel');
const ApiError = require('../utils/error');

const addBook = async (req, res, next) => {
  try {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
      throw new ApiError(400, 'All fields are required');
    }

    const book = await createBook(title, author, genre);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;
    const books = await getAllBooks(
      parseInt(page),
      parseInt(limit),
      author,
      genre
    );
    res.json(books);
  } catch (error) {
    next(error);
  }
};

const getBookDetails = async (req, res, next) => {
  try {
    const book = await getBookById(req.params.id);
    if (!book) {
      throw new ApiError(404, 'Book not found');
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      throw new ApiError(400, 'Search query is required');
    }
    const books = await searchBooks(q);
    res.json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = { addBook, getBooks, getBookDetails, search };