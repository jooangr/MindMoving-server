const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sesionRoutes = require('./routes/sesion');
const perfilRoutes = require('./routes/perfil');

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

connectDB(); // Conectar a base de datos

app.use(cors());
app.use(express.json());

// Rutas agrupadas
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', sesionRoutes);
app.use('/api/perfil', perfilRoutes);




app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
