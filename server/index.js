// index.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;
const sesionRoutes = require('./routes/sesion');

connectDB(); // Conectar a base de datos

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', sesionRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
