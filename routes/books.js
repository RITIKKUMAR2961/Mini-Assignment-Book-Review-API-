const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');

router.post('/books', auth, async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});

router.get('/books', async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const query = {};
  if (author) query.author = new RegExp(author, 'i');
  if (genre) query.genre = genre;
  const books = await Book.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
});

router.get('/books/:id', async (req, res) => {
  const book = await Book.findById(req.params.id).populate({
    path: 'reviews',
    options: { sort: { createdAt: -1 }, limit: 10 }
  });
  const avgRating = book.reviews.reduce((sum, r) => sum + r.rating, 0) / (book.reviews.length || 1);
  res.json({ ...book.toObject(), avgRating });
});

router.get('/search', async (req, res) => {
  const { q } = req.query;
  const books = await Book.find({
    $or: [
      { title: new RegExp(q, 'i') },
      { author: new RegExp(q, 'i') }
    ]
  });
  res.json(books);
});

module.exports = router;
