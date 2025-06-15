const express = require('express');
const router = express.Router();
const {
  actualizarUsuario,
  verificarPassword,
  obtenerUsuario,
  eliminarUsuario
} = require('../controllers/userController');

// PATCH
router.patch('/update-user/:id', actualizarUsuario);

// POST
router.post('/verificar-password/:id', verificarPassword);

// GET
router.get('/users/:id', obtenerUsuario);

// DELETE
router.delete('/users/:id', eliminarUsuario);

module.exports = router;
