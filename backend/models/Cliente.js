const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaSolicitud: { type: Date, required: true },
  numeroPersonas: { type: Number, required: true },
  tipoEvento: { type: String, required: true },
  plataforma: { type: String, required: true },
  vendedora: { type: String, required: true },
  estatus: {
    type: String,
    enum: ['pendiente', 'en revisión', 'descartado', 'cerrado'],
    default: 'pendiente'
  },
  observaciones: { type: String, required: true } // 👈 AGREGADO AQUÍ
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
