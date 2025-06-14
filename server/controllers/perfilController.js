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

const crearPerfil = async (req, res) => {

  console.log("Creando perfil de calirabcion")
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

const PerfilCalibracion = require('../models/PerfilCalibracion');

const crearPerfilPredefinido = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  const perfilesPredefinidos = {
    "Equilibrado": {
      tipo: "Equilibrado",
      valoresAtencion: { media: 60, maximo: 85, minimo: 45, variabilidad: 10 },
      valoresMeditacion: { media: 60, maximo: 80, minimo: 40, variabilidad: 10 },
      alternancia: { tiempoAtencion: 7, tiempoMeditacion: 8 },
      blinking: { maxPestaneos: 20, tiempoVentana: 30 }
    },
    "Predominantemente Atento": {
      tipo: "Predominantemente Atento",
      valoresAtencion: { media: 75, maximo: 95, minimo: 55, variabilidad: 5 },
      valoresMeditacion: { media: 30, maximo: 50, minimo: 10, variabilidad: 15 },
      alternancia: { tiempoAtencion: 15, tiempoMeditacion: 3 },
      blinking: { maxPestaneos: 20, tiempoVentana: 30 }
    },
    "Predominantemente Meditativo": {
      tipo: "Predominantemente Meditativo",
      valoresAtencion: { media: 40, maximo: 60, minimo: 20, variabilidad: 15 },
      valoresMeditacion: { media: 75, maximo: 95, minimo: 55, variabilidad: 5 },
      alternancia: { tiempoAtencion: 5, tiempoMeditacion: 20 },
      blinking: { maxPestaneos: 20, tiempoVentana: 30 }
    }
  };

  const config = perfilesPredefinidos[tipo];

  if (!config) {
    return res.status(400).json({ message: "Tipo de perfil inválido" });
  }

  try {
    const existente = await PerfilCalibracion.findOne({ usuarioId: id });
    if (existente) {
      return res.status(409).json({ message: "El perfil ya existe" });
    }

    const perfil = new PerfilCalibracion({ usuarioId: id, ...config });
    await perfil.save();
    res.status(201).json({ message: "Perfil creado", perfil });

  } catch (err) {
    console.error("❌ Error al crear perfil:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
};




module.exports = { getPerfil, saveOrUpdatePerfil, crearPerfil, crearPerfilPredefinido };

