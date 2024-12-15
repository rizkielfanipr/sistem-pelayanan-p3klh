const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel');

// Register Route
exports.register = async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;

  // Validasi input
  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, username, and password are required' });
  }

  try {
    // Cek apakah email sudah ada
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Admin registered successfully', adminId: newAdmin.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering admin', error: error.message });
  }
};

// Login Route
exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Generate JWT token
  const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Generate Refresh Token
  const refreshToken = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // Simpan refresh token di database
  admin.refresh_token = refreshToken;
  await admin.save();

  res.json({
    message: 'Login successful',
    token,
    refresh_token: refreshToken,
  });
};

// Refresh Token Route
exports.refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  // Cari admin berdasarkan refresh token yang disimpan di database
  const admin = await Admin.findOne({ where: { refresh_token } });
  if (!admin) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }

  try {
    // Verifikasi refresh token
    const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET);

    // Generate new access token
    const newToken = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ newToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token', error: error.message });
  }
};
