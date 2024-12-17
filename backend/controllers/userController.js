const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

// Register User
exports.register = async (req, res) => {
  console.log(req.body);
  const { username, email, password, name } = req.body;  // Menambahkan 'name'

  if (!username || !email || !password || !name) {  // Memastikan 'name' ada
    return res.status(400).json({ message: 'Username, email, password, and name are required' });
  }

  try {
    // Cek jika email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,  // Menyimpan 'name' ke dalam database
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login User
exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verifikasi password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Generate Refresh Token
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Simpan refresh token ke database
    user.refresh_token = refreshToken;
    await user.save();

    res.json({
      message: 'Login successful',
      token,
      refresh_token: refreshToken,
      name: user.name,  // Kirim 'name' dalam response
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  try {
    // Cari user berdasarkan refresh token
    const user = await User.findOne({ where: { refresh_token } });
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    // Verifikasi refresh token
    jwt.verify(refresh_token, process.env.JWT_SECRET);

    // Generate access token baru
    const newToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ newToken });
  } catch (error) {
    res.status(403).json({ message: 'Invalid refresh token', error: error.message });
  }
};
