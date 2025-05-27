// server/controllers/sesionController.js
const SesionEEG = require('../models/SesionEEG');



const guardarSesion = async (req, res) => {
  try {
    const sesion = new SesionEEG(req.body);
    await sesion.save();
    res.status(201).json({ message: 'Sesión guardada correctamente' });
  } catch (err) {
    console.error('Error al guardar sesión:', err);
    res.status(500).json({ message: 'Error al guardar la sesión' });
  }
};

const obtenerSesionesUsuario = async (req, res) => {
  try {
    const sesiones = await SesionEEG.find({ usuarioId: req.params.usuarioId });
    res.json(sesiones);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener sesiones' });
  }
};

module.exports = { guardarSesion, obtenerSesionesUsuario };
