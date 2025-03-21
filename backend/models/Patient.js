import mongoose from 'mongoose';

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

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
