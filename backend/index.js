const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require('mongoose');
// Use Express's built-in body parsing methods
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// Import routes
const userRoute = require('./routes/UserRoute');
const messageRoute = require('./routes/MessageRoute');
const artRoute = require('./routes/ArtRoute');
const categoryRoute = require('./routes/CategoryRoute');

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB:', err));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

// Define routes
app.use('/api/user', userRoute);
app.use('/api/message', messageRoute);
app.use('/api/art', artRoute);
app.use('/api/art/category', categoryRoute);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
