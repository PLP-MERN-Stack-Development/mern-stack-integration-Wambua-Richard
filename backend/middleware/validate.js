// server/middleware/validate.js
const Joi = require('joi');

const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], { abortEarly: false, stripUnknown: true });
  if (error) {
    // create a readable errors object
    const details = error.details.map(d => ({ message: d.message, path: d.path }));
    return res.status(400).json({ error: 'ValidationError', details });
  }
  // replace the validated data (safe)
  req[property] = value;
  next();
};

module.exports = validate;
