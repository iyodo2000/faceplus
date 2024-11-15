const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  text: String,
  media: { data: Buffer, contentType: String },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now },
      replies: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          text: String,
          createdAt: { type: Date, default: Date.now }
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Post', postSchema);
