require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const meetingRoutes = require('./routes/meetingRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Koneksi ke Database MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route dasar / Health Check
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Selamat datang di REST API Notulensi Rapat (MoM) & Manajemen Task/Jobdesk!',
    endpoints: {
      meetings: '/api/meetings',
      tasks: '/api/tasks',
    },
  });
});

// Mounting Routes
app.use('/api/meetings', meetingRoutes);
app.use('/api/tasks', taskRoutes);

// Handling 404 untuk route yang tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint tidak ditemukan (404 Not Found)',
  });
});

// Menjalankan Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
