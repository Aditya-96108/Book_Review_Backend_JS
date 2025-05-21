const {
  createReview,
  findReviewByBookAndUser,
  updateReview,
  deleteReview,
  findReviewById,
} = require('../models/reviewModel');
const ApiError = require('../utils/error');

const submitReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;
    const userId = req.user.id;

    if (!rating) {
      throw new ApiError(400, 'Rating is required');
    }

    const existingReview = await findReviewByBookAndUser(bookId, userId);
    if (existingReview) {
      throw new ApiError(409, 'You have already reviewed this book');
    }

    const review = await createReview(bookId, userId, rating, comment);
    res.status(201).json(review);
  } catch (error) {
    next(error);
  }
};

const updateUserReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await findReviewById(reviewId);
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    if (review.user_id !== userId) {
      throw new ApiError(403, 'You can only update your own review');
    }

    const updatedReview = await updateReview(reviewId, rating, comment);
    res.json(updatedReview);
  } catch (error) {
    next(error);
  }
};

const deleteUserReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await findReviewById(reviewId);
    if (!review) {
      throw new ApiError(404, 'Review not found');
    }
    if (review.user_id !== userId) {
      throw new ApiError(403, 'You can only delete your own review');
    }

    await deleteReview(reviewId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { submitReview, updateUserReview, deleteUserReview };