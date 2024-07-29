const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/admin-features', 
     // useNewUrlParser: true,
      //useUnifiedTopology: true,
    );
    console.log('MongoDB connected');
    mongoose.connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB connection disconnected');
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    
    process.exit(1);
  }
};

module.exports = { connectDB };