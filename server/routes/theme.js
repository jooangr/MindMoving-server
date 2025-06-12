const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Obtener el tema del usuario
router.get('/:id/theme', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.json({ theme: user.theme || 'light' });
  } catch (err) {
    res.status(500).send("Error del servidor");
  }
});

// Actualizar el tema del usuario
router.put('/:id/theme', async (req, res) => {
  const { theme } = req.body;
  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).send("Tema inválido. Usa 'light' o 'dark'.");
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { theme },
      { new: true }
    );
    if (!user) return res.status(404).send("Usuario no encontrado");
    res.json({ message: "Tema actualizado", theme: user.theme });
  } catch (err) {
    res.status(500).send("Error al actualizar el tema");
  }
});

module.exports = router;
