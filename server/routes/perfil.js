const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');



// Obtener el perfil
router.get('/:usuarioId', perfilController.getPerfil);

// Crear o actualizar perfil manualmente //no usarlo de momemto
router.post('/save', perfilController.saveOrUpdatePerfil);

// Crear perfil nuevo automático tras calibración
router.post('/', perfilController.crearPerfil);


// POST /api/perfil/:id/predefinido
router.post('/perfil/:id/predefinido',perfilController.crearPerfilPredefinido);

module.exports = router;
