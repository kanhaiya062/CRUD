const express = require('express');
const router = express.Router();
const Item = require('../models/item');


// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect('/auth/login');
  }
};

router.use(isAuthenticated);

// Dashboard
router.get('/dashboard', async (req, res) => {
  const itemCount = await Item.countDocuments();
  res.render('dashboard', { itemCount });
});

// CRUD operations
router.get('/items', async (req, res) => {
  const items = await Item.find();
  res.render('items', { items });
});

router.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.redirect('/admin/items');
});

router.get('/items/:id', async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.json(item);
});

router.put('/items/:id', async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Item updated successfully' });
});

router.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted successfully' });
});

module.exports = router;