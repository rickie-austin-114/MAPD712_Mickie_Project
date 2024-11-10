import mongoose from 'mongoose';

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
    min: 0
  }
});

const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);
export default PatientRecord;
