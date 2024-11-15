const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Like a post
router.post('/:postId/like', async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  try {
    await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
    res.send('Post liked successfully');
  } catch (err) {
    res.status(500).send('Error liking post');
  }
});

// Comment on a post
router.post('/:postId/comment', async (req, res) => {
  const userId = req.userId;
  const postId = req.params.postId;
  const { text } = req.body;
  try {
    await Post.findByIdAndUpdate(postId, { $push: { comments: { user: userId, text } } });
    res.send('Comment added successfully');
  } catch (err) {
    res.status(500).send('Error commenting on post');
  }
});

module.exports = router;
