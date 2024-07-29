const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // application,
  if (username === 'admin' && password === 'password') {
    req.session.isAuthenticated = true;
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
});

module.exports = router;