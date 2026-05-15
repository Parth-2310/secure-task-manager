require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const app = express();

app.use(helmet());
app.use(cors({ origin: ['http://localhost:5173','http://127.0.0.1:5173'], credentials: true }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());  
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
}));
app.use(morgan('dev'));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

app.get('/', (req, res) => {
  res.json({ message: 'Secure Task Manager API - running' });
});

const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});