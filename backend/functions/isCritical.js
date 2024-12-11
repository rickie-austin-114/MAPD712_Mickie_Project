import Patient from '../models/Patient.js';
import PatientRecord from '../models/PatientRecord.js';


// Endpoint to check if a patient is in critical condition
export async function isCritical(id) {


    // Check if the patient exists
    const patient = await Patient.findById(id);

    // Fetch the latest records for blood pressure and blood oxygen level
    const bloodPressureRecord = await PatientRecord.findOne({ patient: id, datatype: 'blood pressure' })
      .sort({ measurementDate: -1 });
    const bloodOxygenRecord = await PatientRecord.findOne({ patient: id, datatype: 'blood oxygen level' })
      .sort({ measurementDate: -1 });
    const respiratoryRateRecord = await PatientRecord.findOne({ patient: id, datatype: 'respiratory rate' })
      .sort({ measurementDate: -1 });
    const heartBeatRateRecord = await PatientRecord.findOne({ patient: id, datatype: 'heart beat rate' })
      .sort({ measurementDate: -1 });

      console.log(bloodPressureRecord)
      console.log(bloodOxygenRecord)
      console.log(respiratoryRateRecord)
      console.log(heartBeatRateRecord)
    

    // Default to normal if no records are found
    let isCritical = false;

    // Check blood pressure
    if (bloodPressureRecord) {
      const bloodPressureValue = bloodPressureRecord.readingValue;
      if (bloodPressureValue < 20 || bloodPressureValue > 120) {
        isCritical = true;
      }
    }

    // Check blood oxygen level
    if (bloodOxygenRecord) {
      const bloodOxygenValue = bloodOxygenRecord.readingValue;
      if (bloodOxygenValue < 95 || bloodOxygenValue > 100) {
        isCritical = true;
      }
    }
    
    if (respiratoryRateRecord) {
      const respiratoryRateValue = respiratoryRateRecord.readingValue;
      if (respiratoryRateValue < 12 || respiratoryRateValue > 25) {
        isCritical = true;
      }
    }

    if (heartBeatRateRecord) {
      const heartBeatRateValue = heartBeatRateRecord.readingValue;
      if (heartBeatRateValue < 60 || heartBeatRateValue > 100) {
        isCritical = true;
      }
    }


    if (isCritical) {
      return "Critical"
    } else {
      return "Normal"
    }
};