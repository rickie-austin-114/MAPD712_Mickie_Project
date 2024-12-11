// models/Patient.js
const mongoose = require('mongoose');
// Patient schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, default: null },
  gender: { type: String, default: null },
  address: { type: String, default: null },
  zipCode: { type: String, default: null },
  profilePicture: { type: String, default: null },
  condition: { type: String, default: "Normal" },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);