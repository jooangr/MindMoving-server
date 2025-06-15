const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

// Obtener el perfil
router.get('/:usuarioId', perfilController.getPerfil);

// Crear o actualizar perfil manualmente //no usarlo de momemto
router.post('/save', perfilController.saveOrUpdatePerfil);

// Crear perfil nuevo tras calibración
router.post('/', perfilController.crearPerfil);

//Actualizar el tipo de perfil segun el enum del front
router.patch('/:id/tipo', perfilController.actualizarTipo);


module.exports = router;
