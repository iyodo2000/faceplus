require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const followRoutes = require('./routes/follow');
const postRoutes = require('./routes/Posts');
const feedRoutes = require('./routes/feed');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); 

// Database Connection
mongoose.connect('mongodb://localhost:27017/faceplus', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/auth', authRoutes); 
app.use('/profile', authMiddleware, profileRoutes);
app.use('/follow', authMiddleware, followRoutes); 
app.use('/posts', authMiddleware, postRoutes); 
app.use('/feed', authMiddleware, feedRoutes); 

// Error Handling Middleware
app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send({ message: err.message });
  }
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
