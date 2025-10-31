// server/controllers/categoryController.js
const Category = require('../models/Category');

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // create, uniqueness enforced by model
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    // duplicate key handling
    if (err.code === 11000) {
      err.status = 409;
      err.message = 'Category already exists';
    }
    next(err);
  }
};
