const PerfilCalibracion = require('../models/PerfilCalibracion');

const getPerfil = async (req, res) => {

  console.log('Obteniendo el Perfil de Calibracion ...')
  try {
    const { usuarioId } = req.params;
    const perfil = await PerfilCalibracion.findOne({ usuarioId });

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    res.json(perfil);
    console.log('Se ha guardado correctamente el perfil de calibracion')
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener perfil' });
  }
};

const saveOrUpdatePerfil = async (req, res) => {

  console.log('Actualizando  ...')
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

const crearPerfil = async (req, res) => {

  console.log("Creando perfil de calibracion")
  //Prueba de alterncia y blinking
  console.log("BODY RECIBIDO:", req.body);

  try {
    const nuevoPerfil = new PerfilCalibracion(req.body);
    await nuevoPerfil.save();
    res.status(201).json({ message: "Perfil de calibración creado correctamente." });
    console.log("Perfil creado correctamente y guardado")
  } catch (error) {
    console.error("Error al crear perfil:", error);
    res.status(500).json({ error: "Error al crear perfil de calibración." });
  }
};

const actualizarTipo = async (req, res) => {

  console.log('Actualizando Perfil de Calibracion del Usuario ...')
  try {
    const { id } = req.params;
    const { tipo } = req.body;

    const perfil = await PerfilCalibracion.findOne({ usuarioId: id });

    if (!perfil) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    perfil.tipo = tipo;
    await perfil.save();

    res.status(200).json(perfil);
    console.log('Actualizado correctamente')
  } catch (err) {
    console.error("Error al actualizar tipo de perfil:", err);
    res.status(500).json({ message: 'Error al actualizar tipo de perfil' });
  }
};


// Exportamos todos correctamente
module.exports = { getPerfil, saveOrUpdatePerfil, crearPerfil, actualizarTipo };
