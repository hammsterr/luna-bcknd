const express = require('express');
const router = express.Router();

let users = [];

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).send('Not found');
  res.json(user);
});

module.exports = router;
