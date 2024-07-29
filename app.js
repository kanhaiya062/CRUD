const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/user');
const path = require('path');
//for implement purpose
//const Comment = require('../models/Comment');
//const Item = require('../models/Item');
//const Item = require('../models/Item');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));
///
app.get('/', (req, res) => {
    res.render('home');  // home
  });


// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));