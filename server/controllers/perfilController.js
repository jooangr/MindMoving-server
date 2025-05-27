const PerfilCalibracion = require('../models/PerfilCalibracion');

const getPerfil = async (req, res) => {
  try {
    const { usuarioId } = req.params;
    const perfil = await PerfilCalibracion.findOne({ usuarioId });

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(perfil);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

const saveOrUpdatePerfil = async (req, res) => {
  try {
    const { usuarioId, tipo, valoresAtencion, valoresMeditacion, alternancia, blinking } = req.body;

    let perfil = await PerfilCalibracion.findOne({ usuarioId });

    if (perfil) {
      perfil.tipo = tipo;
      perfil.valoresAtencion = valoresAtencion;
      perfil.valoresMeditacion = valoresMeditacion;
      perfil.alternancia = alternancia;
      perfil.blinking = blinking;
    } else {
      perfil = new PerfilCalibracion({
        usuarioId,
        tipo,
        valoresAtencion,
        valoresMeditacion,
        alternancia,
        blinking
      });
    }

    await perfil.save();
    res.status(200).json({ message: 'Perfil guardado correctamente', perfil });

  } catch (err) {
    res.status(500).json({ message: 'Error al guardar perfil' });
  }
};

module.exports = { getPerfil, saveOrUpdatePerfil };
