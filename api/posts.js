const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

let posts = [];

router.get('/', (req, res) => {
  res.json(posts);
});

router.post('/', (req, res) => {
  const { content, authorId } = req.body;
  const post = { id: uuidv4(), content, authorId, likes: 0, createdAt: new Date() };
  posts.push(post);
  res.json(post);
});

module.exports = router;