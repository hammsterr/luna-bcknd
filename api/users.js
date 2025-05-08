const express = require('express');
const router = express.Router();

router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.post('/:id/follow', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  const follower = users.find(u => u.id === req.body.followerId);
  
  if (!user || !follower) return res.status(404).json({ error: 'User not found' });
  
  user.followers.push(follower.id);
  follower.following.push(user.id);
  res.json({ success: true });
});

module.exports = router;
