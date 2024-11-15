const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User');
const router = express.Router();

// Get feed
router.get('/', async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const following = user.following;
    const posts = await Post.find({ user: { $in: following } }).sort({ createdAt: -1 }).limit(10);
    res.send(posts);
  } catch (err) {
    res.status(500).send('Error fetching feed');
  }
});

module.exports = router;
