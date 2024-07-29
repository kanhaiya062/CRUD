const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const Comment = require('../models/comment');

// View all items
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.render('userItems', { items });
});

// View item details
router.get('/items/:id', async (req, res) => {
  try { const item = await Item.findById(req.params.id);
  const comments = await Comment.find({ item: req.params.id });
  res.render('itemDetails', { item, comments });
  } catch (error) {
    console.error('Error fetching item details:', error);
    res.status(500).send('Error fetching item details');
  }
});

// Add a comment
router.post('/items/:id/comment', async (req, res) => {
  const newComment = new Comment({
    item: req.params.id,
    text: req.body.text
  });
  await newComment.save();
  res.redirect(`/items/${req.params.id}`);
});

// Rate an item
router.post('/items/:id/rate', async (req, res) => {
  const item = await Item.findById(req.params.id);
  const newRating = parseInt(req.body.rating);
  item.rating = ((item.rating * item.ratingCount) + newRating) / (item.ratingCount + 1);
  item.ratingCount += 1;
  await item.save();
  res.redirect(`/items/${req.params.id}`);
});

module.exports = router;