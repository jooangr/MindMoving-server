const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const sesionRoutes = require('./routes/sesion');
const perfilRoutes = require('./routes/perfil');
const themeRoutes = require('./routes/theme');

const app = express();
const PORT = process.env.PORT || 3000;

connectDB(); // Conectar a base de datos

app.use(cors());
app.use(express.json());

// Rutas agrupadas
app.use('/api', authRoutes);
app.use('/api/users', themeRoutes);
app.use('/api', userRoutes);
app.use('/api', sesionRoutes);
app.use('/api/perfil', perfilRoutes);


// Solo una llamada a listen
app.listen(PORT, () => {
  console.log('Servidor corriendo !!');
});
