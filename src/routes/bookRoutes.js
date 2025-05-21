// const express = require('express');
// const {
//   addBook,
//   getBooks,
//   getBookDetails,
//   search,
// } = require('../controllers/bookController');
// const authenticateToken = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authenticateToken, addBook);
// router.get('/', getBooks);
// router.get('/search', search);
// router.get('/:id', getBookDetails);

// module.exports = router;
const express = require('express');
const {
  addBook,
  getBooks,
  getBookDetails,
  search,
} = require('../controllers/bookController');
const { submitReview } = require('../controllers/reviewController'); // Import submitReview
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Book-related routes
router.post('/', authenticateToken, addBook);
router.get('/', getBooks);
router.get('/search', search);
router.get('/:id', getBookDetails);

// Review-related route for a specific book
router.post('/:id/reviews', authenticateToken, submitReview);

module.exports = router;