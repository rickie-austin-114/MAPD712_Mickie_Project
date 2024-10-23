// models/Patient.js
const mongoose = require('mongoose');
// Patient schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, default: null },
  gender: { type: String, default: null },
  address: { type: String, default: null },
  zipCode: { type: String, default: null },
  profilePicture: { type: String, default: null },
  bloodPressure: { type: String, default: null },
  respiratoryRate: { type: String, default: null },
  bloodOxygenLevel: { type: String, default: null },
  heartbeatRate: { type: String, default: null },
  condition: { type: String, enum: ['Normal', 'Critical'], default: null }, // Add condition field
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Patient', patientSchema);