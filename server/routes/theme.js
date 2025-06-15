const express = require('express');
const router = express.Router();
const { obtenerTemaUsuario, actualizarTemaUsuario } = require('../controllers/themeController');

// GET /users/:id/theme
router.get('/:id/theme', obtenerTemaUsuario);

// PUT /users/:id/theme
router.put('/:id/theme', actualizarTemaUsuario);

module.exports = router;
