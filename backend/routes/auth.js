const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);
    
    User.create(email, hashedPassword, name, (err, user) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ message: 'User already exists' });
        }
        return res.status(500).json({ message: 'Server error' });
      }
      
      // Создаем токен и ставим куку
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // в продакшене только по HTTPS
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 дней
      });
      
      res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Логин
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  User.findByEmail(email, async (err, user) => {
    if (err) return res.status(500).json({ message: 'Server error' });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ user: { id: user.id, email: user.email, name: user.name } });
  });
});

// Проверка текущей сессии
router.get('/me', authMiddleware, (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err || !user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  });
});

// Выход
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
});

module.exports = router;