// server/routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middleware/validate');
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  description: Joi.string().allow('', null),
});

router.get('/', categoryController.getAllCategories);
router.post('/', validate(createCategorySchema), categoryController.createCategory);

module.exports = router;
