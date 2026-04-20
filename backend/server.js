const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000', // Адрес вашего Next.js приложения
  credentials: true // Важно для передачи кук
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Interior Planner API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});