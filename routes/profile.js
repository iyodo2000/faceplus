const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const router = express.Router();

// Multer setup for image uploads
const upload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload an image file (jpg, jpeg, png)'));
    }
    cb(null, true);
  }
});

// Upload profile picture
router.post('/upload-profile-picture', upload.single('profilePicture'), async (req, res) => {
  const userId = req.userId;  // Assuming userId is extracted from token
  const profilePicture = req.file.buffer;
  try {
    await User.findByIdAndUpdate(userId, { profilePicture });
    res.send('Profile picture uploaded successfully');
  } catch (err) {
    res.status(500).send('Error uploading profile picture');
  }
});

module.exports = router;
