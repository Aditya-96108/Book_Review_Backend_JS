// const express = require('express');
// const {
//   submitReview,
//   updateUserReview,
//   deleteUserReview,
// } = require('../controllers/reviewController');
// const authenticateToken = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/:id/reviews', authenticateToken, submitReview);
// router.put('/:id', authenticateToken, updateUserReview);
// router.delete('/:id', authenticateToken, deleteUserReview);

// module.exports = router;
const express = require('express');
const {
  updateUserReview,
  deleteUserReview,
} = require('../controllers/reviewController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.put('/:id', authenticateToken, updateUserReview);
router.delete('/:id', authenticateToken, deleteUserReview);

module.exports = router;