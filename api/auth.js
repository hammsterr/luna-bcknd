const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

let users = [];
const JWT_SECRET = 'your_jwt_secret';

router.post('/register', (req, res) => {
  const { login, password } = req.body;
  if (users.some(u => u.login === login)) return res.status(400).send('User exists');
  
  const user = { id: uuidv4(), login, password, posts: [], following: [] };
  users.push(user);
  res.json({ token: jwt.sign(user.id, JWT_SECRET) });
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');
  res.json({ token: jwt.sign(user.id, JWT_SECRET) });
});

module.exports = router;