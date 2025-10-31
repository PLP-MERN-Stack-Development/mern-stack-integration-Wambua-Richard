// server/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error(err);
  
    const status = err.status || 500;
    const response = {
      message: err.message || 'Internal Server Error',
    };
  
    // Include validation / details if present (non-sensitive)
    if (err.details) response.details = err.details;
  
    res.status(status).json(response);
  };
  
  module.exports = errorHandler;
  