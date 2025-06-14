const express = require('express');
const router = express.Router();
const perfilController = require('../controllers/perfilController');

// Obtener el perfil
router.get('/:usuarioId', perfilController.getPerfil);

// Crear o actualizar perfil manualmente //no usarlo de momemto
router.post('/save', perfilController.saveOrUpdatePerfil);

// Crear perfil nuevo automático tras calibración
router.post('/', perfilController.crearPerfil);

router.patch('/perfil/:id/tipo', async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  try {
    const perfil = await PerfilCalibracion.findOne({ usuarioId: id });
    if (!perfil) return res.status(404).json({ message: 'Perfil no encontrado' });

    perfil.tipo = tipo;
    await perfil.save();

    res.json({ message: 'Tipo actualizado', perfil });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar tipo de perfil' });
  }
});


module.exports = router;
