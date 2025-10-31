// server/routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const validate = require('../middleware/validate');
const Joi = require('joi');
const mongoose = require('mongoose');

// Joi custom for objectId
const objectId = Joi.string().custom((value, helpers) => {
  if (!mongoose.isValidObjectId(value)) return helpers.error('any.invalid');
  return value;
}, 'ObjectId validation');

const createPostSchema = Joi.object({
  title: Joi.string().min(3).max(200).required(),
  slug: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(1).required(),
  author: Joi.string().max(100).optional(),
  categories: Joi.array().items(objectId).optional(),
  published: Joi.boolean().optional(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(3).max(200).optional(),
  slug: Joi.string().min(3).max(200).optional(),
  content: Joi.string().min(1).optional(),
  author: Joi.string().max(100).optional(),
  categories: Joi.array().items(objectId).optional(),
  published: Joi.boolean().optional(),
});

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', validate(createPostSchema), postController.createPost);
router.put('/:id', validate(updatePostSchema), postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
