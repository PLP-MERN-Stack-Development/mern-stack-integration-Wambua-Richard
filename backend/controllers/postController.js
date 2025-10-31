// server/controllers/postController.js
const Post = require('../models/Post');
const Category = require('../models/Category');
const mongoose = require('mongoose');

exports.getAllPosts = async (req, res, next) => {
  try {
    // optional pagination & filters could be added
    const posts = await Post.find()
      .populate('categories', 'name') // populate category names
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid post id' });
    const post = await Post.findById(id).populate('categories', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, slug, content, author, categories = [], published } = req.body;

    // ensure referenced categories exist
    if (categories.length) {
      const count = await Category.countDocuments({ _id: { $in: categories } });
      if (count !== categories.length) {
        return res.status(400).json({ message: 'One or more categories are invalid' });
      }
    }

    const post = new Post({ title, slug, content, author, categories, published });
    await post.save();
    await post.populate('categories', 'name'); // populate for response
    res.status(201).json(post);
  } catch (err) {
    // handle uniqueness duplicate slug
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Post with that slug already exists';
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid post id' });

    const updates = req.body;

    // if categories provided, verify them
    if (updates.categories && updates.categories.length) {
      const count = await Category.countDocuments({ _id: { $in: updates.categories } });
      if (count !== updates.categories.length) {
        return res.status(400).json({ message: 'One or more categories are invalid' });
      }
    }

    const post = await Post.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).populate('categories', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Duplicate value error';
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ message: 'Invalid post id' });

    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted', id: post._id });
  } catch (err) {
    next(err);
  }
};
