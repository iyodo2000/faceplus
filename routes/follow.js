const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Follow a user
router.post('/follow/:id', async (req, res) => {
  const userId = req.userId;
  const followId = req.params.id;
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } });
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });
    res.send('User followed successfully');
  } catch (err) {
    res.status(500).send('Error following user');
  }
});

// Unfollow a user
router.post('/unfollow/:id', async (req, res) => {
  const userId = req.userId;
  const unfollowId = req.params.id;
  try {
    await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });
    await User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } });
    res.send('User unfollowed successfully');
  } catch (err) {
    res.status(500).send('Error unfollowing user');
  }
});

module.exports = router;
