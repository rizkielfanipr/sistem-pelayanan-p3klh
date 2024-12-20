const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/Database');
const serviceRoutes = require('./routes/serviceRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const newsRoutes = require('./routes/newsRoutes');
const discussionRoutes = require('./routes/discussionRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const path = require('path'); 

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Middleware untuk melayani file statis dari folder 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Use Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/service', serviceRoutes); // Pastikan rute ini sesuai
app.use('/announcement', announcementRoutes);
app.use('/news', newsRoutes);
app.use('/discussions', discussionRoutes);
app.use('/consultations', consultationRoutes);

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
