// server/controllers/sesionController.js

const mongoose = require('mongoose');
const SesionEEG = require('../models/SesionEEG');
const User = require('../models/User'); // Asegúrate de tener este modelo correctamente definido

//  Guardar sesión EEG con validación
const guardarSesion = async (req, res) => {
  try {
    const {
      usuarioId,
      fechaHora,
      duracion,
      valorMedioAtencion,
      valorMedioRelajacion,
      valorMedioPestaneo,
      comandosEjecutados
    } = req.body;

    //  Validación de campos requeridos
    if (
      !usuarioId || !fechaHora || duracion == null ||
      valorMedioAtencion == null || valorMedioRelajacion == null || valorMedioPestaneo == null
    ) {
      return res.status(400).json({ message: 'Faltan campos requeridos en la sesión EEG.' });
    }

    //  Validación de ObjectId
    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ message: 'ID de usuario no válido.' });
    }

    //  Verificación de existencia del usuario
    const usuarioExiste = await User.findById(usuarioId);
    if (!usuarioExiste) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    //  Crear y guardar la sesión
    const sesion = new SesionEEG({
      usuarioId,
      fechaHora,
      duracion,
      valorMedioAtencion,
      valorMedioRelajacion,
      valorMedioPestaneo,
      comandosEjecutados
    });

    await sesion.save();

    res.status(201).json({ message: 'Sesión guardada correctamente' });

  } catch (err) {
    console.error('❌ Error al guardar sesión:', err);
    res.status(500).json({ message: 'Error al guardar la sesión' });
  }
};

//  Obtener sesiones EEG por ID de usuario
const obtenerSesionesUsuario = async (req, res) => {
  try {
    const { usuarioId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
      return res.status(400).json({ message: 'ID de usuario no válido.' });
    }

    const sesiones = await SesionEEG.find({ usuarioId });

    res.status(200).json(sesiones);

  } catch (err) {
    console.error('❌ Error al obtener sesiones:', err);
    res.status(500).json({ message: 'Error al obtener sesiones' });
  }
};

module.exports = {
  guardarSesion,
  obtenerSesionesUsuario
};
