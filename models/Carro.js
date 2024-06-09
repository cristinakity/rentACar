const mongoose = require('mongoose');

const CarroSchema = new mongoose.Schema({
  codigo: String,
  placa: String,
  marca: String,
  modelo: String,
  anio: Number,
  color: String
});

module.exports = mongoose.model('Carro', CarroSchema);
