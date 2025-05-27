const express = require('express');
const router = express.Router();
const { actualizarUsuario } = require('../controllers/userController');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Ruta PATCH para actualizar usuario
router.patch('/update-user/:id', actualizarUsuario);

// Ruta POST para verificar contraseña
router.post('/verificar-password/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "Usuario no encontrado" });

    const valid = await bcrypt.compare(password, user.password);
    res.json({ success: valid });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error al verificar contraseña" });
  }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id).select('-password'); // opcional: excluye contraseña
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
  
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener datos del usuario' });
    }
  });
  

module.exports = router;
