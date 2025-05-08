const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

let users = [];
const JWT_SECRET = 'your_secret_key';

router.post('/register', (req, res) => {
  const { login, password } = req.body;
  if (users.some(u => u.login === login)) return res.status(400).json({ error: 'User exists' });
  
  const user = { 
    id: uuidv4(), 
    login, 
    password, 
    avatar: '', 
    posts: [], 
    following: [], 
    followers: [] 
  };
  users.push(user);
  res.json({ token: jwt.sign(user.id, JWT_SECRET) });
});

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  const user = users.find(u => u.login === login && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ token: jwt.sign(user.id, JWT_SECRET) });
});

module.exports = router;
