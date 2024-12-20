const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// MongoDB connection URL
const mongoURL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose.connect(mongoURL);

// Get the default connection
const db = mongoose.connection;

// Define event listeners for the database connection
db.on('connected', () => {
  console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected. Exiting process...');
  process.exit(1); // Exit process on disconnection
});

// Export the mongoose object for use in other modules
module.exports = mongoose;
