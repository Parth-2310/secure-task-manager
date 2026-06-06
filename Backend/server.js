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
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());  

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://secure-task-manager-rouge.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    }
    else if (origin && /^https?:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP'
}));
app.use(morgan('dev'));




app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

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