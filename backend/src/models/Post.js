// server/models/Post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true }, // optional
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // relationship
  published: { type: Boolean, default: false },
  publishedAt: { type: Date },
}, { timestamps: true });

// optional pre-save to set publishedAt
postSchema.pre('save', function(next) {
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Post', postSchema);
