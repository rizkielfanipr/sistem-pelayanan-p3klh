const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/Database');
const authRoutes = require('./routes/authRoutes');
const articleRoutes = require('./routes/articleRoutes');  // Tambahkan artikel routes

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Use Routes
app.use('/api', authRoutes);  // Prefix all auth routes with /api
app.use('/art', articleRoutes);  // Prefix artikel routes dengan /api

// Start server
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Sync Sequelize models with database
  try {
    await sequelize.sync();
    console.log('Sequelize models synced');
  } catch (error) {
    console.error('Error syncing Sequelize models:', error);
  }
});
