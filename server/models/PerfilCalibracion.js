const mongoose = require('mongoose');

const perfilCalibracionSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  tipo: { 
    type: String, 
    enum: ['Equilibrado', 'Predominantemente Atento', 'Predominantemente Meditativo'], 
    default: 'Equilibrado' 
},
  valoresAtencion: {
    media: Number,
    minimo: Number,
    maximo: Number,
    variabilidad: Number
  },
  valoresMeditacion: {
    media: Number,
    minimo: Number,
    maximo: Number,
    variabilidad: Number
  },
  alternancia: {
    tiempoAtencion: Number,
    tiempoMeditacion: Number
  },
  blinking: {
    maxPestaneos: Number,
    tiempoVentana: Number
  }
});

module.exports = mongoose.model('PerfilCalibracion', perfilCalibracionSchema);
