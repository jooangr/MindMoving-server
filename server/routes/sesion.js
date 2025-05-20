// server/routes/sesion.js
const express = require('express');
const router = express.Router();
const { guardarSesion, obtenerSesionesUsuario } = require('../controllers/sesionController');

router.post('/sesiones', guardarSesion);
router.get('/sesiones/:usuarioId', obtenerSesionesUsuario);

module.exports = router;
