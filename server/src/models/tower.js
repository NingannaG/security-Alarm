const mongoose = require("mongoose");

const towerSchema = new mongoose.Schema({
  tower: { type: Number, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  temperature: { type: Number, required: true },
  powerSource: { type: String, enum: ["DG", "Electric"], required: true },
  fuelStatus: { type: Number, required: true },
  time: { type: Date, required: true },
  anomaly: { type: String, enum: ["true", "false"], required: true },
  type: { type: String, required: true },
  city: { type: String, required: true },
});

const Tower = mongoose.model("Tower", towerSchema);

module.exports = Tower;
