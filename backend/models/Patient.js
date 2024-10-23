// models/Patient.js
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  profileImage: { type: String }, // URL or base64
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  address: { type: String },
  zipCode: { type: String },
});

module.exports = mongoose.model('Patient', patientSchema);