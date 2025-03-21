<<<<<<< HEAD
import mongoose from 'mongoose';
=======
const mongoose = require("mongoose")
>>>>>>> a8ef868685245126149c2fec8e19685b6b4fdd95

const patientRecordSchema = new mongoose.Schema({
  measurementDate: {
    type: Date,
    default: Date.now
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  datatype: {
    type: String,
    enum: ['blood pressure', 'respiratory rate', 'blood oxygen level', 'heart beat rate'],
    required: true
  },
  readingValue: {
    type: Number,
    required: true,
<<<<<<< HEAD
    min: 0
  }
});

const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);
export default PatientRecord;
=======
    min: 0,
    max: 1000
  }
});

module.exports = mongoose.model('PatientRecord', patientRecordSchema);
>>>>>>> a8ef868685245126149c2fec8e19685b6b4fdd95
