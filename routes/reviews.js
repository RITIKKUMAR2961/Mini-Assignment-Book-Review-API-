const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

router.post('/books/:id/reviews', auth, async (req, res) => {
  const existing = await Review.findOne({ user: req.user.id, book: req.params.id });
  if (existing) return res.status(400).json({ message: 'You already reviewed this book' });

  const review = new Review({ ...req.body, user: req.user.id, book: req.params.id });
  await review.save();

  await Book.findByIdAndUpdate(req.params.id, { $push: { reviews: review._id } });
  res.status(201).json(review);
});

router.put('/reviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not allowed' });

  Object.assign(review, req.body);
  await review.save();
  res.json(review);
});

router.delete('/reviews/:id', auth, async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review || review.user.toString() !== req.user.id)
    return res.status(403).json({ message: 'Not allowed' });

  await review.remove();
  await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });
  res.json({ message: 'Review deleted' });
});

module.exports = router;
