const mongoose = require('mongoose');

const connectToDB = async (uri = process.env.MONGO_URI || 'mongodb://localhost:27017/blog') => {
  try {
    // Перевіряємо, чи вже є відкрите з'єднання
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } else {
      console.log('MongoDB already connected');
    }
  } catch (error) {
    console.error('Connection error:', error);
  }
};

module.exports = { connectToDB };
