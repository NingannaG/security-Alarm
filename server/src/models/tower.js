const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
  tower: Number,
  location: {
    latitude: Number,
    longitude: Number
  },
  temperature: Number,
  powerSource: String,
  fuelStatus: Number,
  time: Number,
  anomaly: Boolean,
  type: [Number]
});

const Tower = mongoose.model('Tower', towerSchema);

module.exports = Tower;
