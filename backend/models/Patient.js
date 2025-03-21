import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  address: String,
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other']
  },
  dateOfBirth: Date,
=======
  name: { type: String, required: true },
  age: { type: Number, default: null },
  gender: { type: String, default: null },
  address: { type: String, default: null },
  zipCode: { type: String, default: null },
  profilePicture: { type: String, default: null },
  condition: { type: String, default: "Normal" },
  updatedAt: { type: Date, default: Date.now }
>>>>>>> a8ef868685245126149c2fec8e19685b6b4fdd95
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
