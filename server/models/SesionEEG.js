const mongoose = require('mongoose');

const sesionEEGSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fechaHora: { type: Date, required: true },
  duracion: { type: Number, required: true },
  valorMedioAtencion: { type: Number, required: true },
  valorMedioRelajacion: { type: Number, required: true },
  valorMedioPestaneo: { type: Number, required: true },
  comandosEjecutados: { type: String }
});

module.exports = mongoose.model('SesionEEG', sesionEEGSchema);
