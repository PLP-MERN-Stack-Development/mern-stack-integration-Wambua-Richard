// server/server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Mount API routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

// simple root
app.get('/', (req, res) => res.send('Blog API is running'));

// Error handling middleware (should be after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
