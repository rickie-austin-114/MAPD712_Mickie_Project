// index.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const User = require("./models/User"); // Assuming you'll create a User model
const Patient = require("./models/Patient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const PatientRecord = require("./models/PatientRecord");

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET = process.env.SECRET || "093rhufbigeryq3498rweihougotyhpq39reouwh";

const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

async function isCritical(id) {
  // Check if the patient exists
  const patient = await Patient.findById(id);

  // Fetch the latest records for blood pressure and blood oxygen level
  const bloodPressureRecord = await PatientRecord.findOne({
    patient: id,
    datatype: "blood pressure",
  }).sort({ measurementDate: -1 });
  const bloodOxygenRecord = await PatientRecord.findOne({
    patient: id,
    datatype: "blood oxygen level",
  }).sort({ measurementDate: -1 });
  const respiratoryRateRecord = await PatientRecord.findOne({
    patient: id,
    datatype: "respiratory rate",
  }).sort({ measurementDate: -1 });
  const heartBeatRateRecord = await PatientRecord.findOne({
    patient: id,
    datatype: "heart beat rate",
  }).sort({ measurementDate: -1 });

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
    return "Critical";
  } else {
    return "Normal";
  }
}

// MongoDB connection
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/api/register", async (req, res) => {
  const { name, introduction, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    introduction,
    email,
    password: hashedPassword,
  });
  await user.save();
  res.status(201).json({ message: "User registered!" });
});

// User login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Endpoints

// GET all patients
app.get("/api/patients", async (req, res) => {
  try {
    const search = req.query.search ?? ""
/*
    if (!search) {
      search = ""
    }
*/
    const patients = await Patient.find({ name: { $regex: new RegExp(`^${search}`, 'i') } }); // 'i' for case-insensitive

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single patient by id
app.get("/api/patients/:id", async (req, res) => {
  try {
    let patient = await Patient.findOne({ _id: req.params.id });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    patient = patient.toObject();
    const crit = await isCritical(req.params.id);
    patient.condition = crit;

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET a single patient by id
app.get("/api/patients/:id", async (req, res) => {
  try {


    let patient = await Patient.findOne({ _id: req.params.id });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    patient = patient.toObject();
    const crit = await isCritical(req.params.id);
    patient.condition = crit;

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET all patients with condition "Critical"
app.get("/api/critical", async (req, res) => {
  try {

    let search = req.query.search ?? ""

    const patients = await Patient.find({ condition: "Critical", name: { $regex: new RegExp(`^${search}`, 'i') } });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
app.post("/api/patients", async (req, res) => {
  const { name, age, gender, address, zipCode, profilePicture } = req.body;

  const patient = new Patient({
    name,
    age,
    gender,
    address,
    zipCode,
    profilePicture,
  });

  try {
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ message: "Patient with this name already exists" });
    }
    res.status(500).json({ message: err.message });
  }
});

// PUT update a patient by name
app.put("/api/patients/:id", async (req, res) => {
  try {
    const { name, age, gender, address, zipCode, profilePicture } = req.body;

    const updateData = {
      updatedAt: Date.now(),
      name,
      age,
      gender,
      address,
      zipCode,
      profilePicture,
    };

    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: req.params.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient)
      return res.status(404).json({ message: "Patient not found" });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
app.delete("/api/patients/:id", async (req, res) => {
  try {
    const result = await Patient.findByIdAndDelete(req.params.id);
    if (result) {
      return res
        .status(200)
        .json({ message: `Successfully deleted patient with id` });
    } else {
      return res.status(400).json({ error: "patient not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: "error" });
  }
  return res.status(400).json({ error: "patient not found" });
});

// GET all patients record
app.get("/api/record", async (req, res) => {
  try {
    const patientRecords = await PatientRecord.find();
    res.json(patientRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET patients record by patient id
app.get("/api/patient/record/:id", async (req, res) => {
  try {
    const record = await PatientRecord.find({
      patient: req.params.id,
    }).populate("patient");
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET patients record by record id
app.get("/api/record/:id", async (req, res) => {
  try {
    const record = await PatientRecord.find({ _id: req.params.id }).populate(
      "patient"
    );
    if (!record) return res.status(404).json({ message: "Record not found" });
    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add record
app.post("/api/record", async (req, res) => {
  try {
    const { measurementDate, patient, datatype, readingValue } = req.body;

    if (!patient || !datatype || !readingValue) {
      return res.status(400).json({ message: "invalid input" });
    }
    if (datatype == "blood pressure") {
      if (readingValue < 0 || readingValue > 500) {
        return res.status(400).json({ message: "invalid input" });
      }
    } else if (datatype == "respiratory rate") {
      if (readingValue < 0 || readingValue > 90) {
        return res.status(400).json({ message: "invalid input" });
      }
    } else if (datatype == "blood oxygen level") {
      if (readingValue < 10 || readingValue > 100) {
        return res.status(400).json({ message: "invalid input" });
      }
    } else if (datatype == "heart beat rate") {
      if (readingValue < 0 || readingValue > 500) {
        return res.status(400).json({ message: "invalid input" });
      }
    } else {
      return res.status(400).json({ message: "invalid input" });
    }
    const patientRecord = new PatientRecord({
      measurementDate,
      patient,
      datatype,
      readingValue,
    });
    const savedPatientRecord = await patientRecord.save();

    const condition = await isCritical(patient);
    console.log(condition);
    console.log(patient);

    const updatedPatient = await Patient.findOneAndUpdate(
      { _id: patient },
      { condition },
      { new: true, runValidators: true }
    );

    console.log(updatedPatient);

    return res.status(201).json(savedPatientRecord);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Invalid input" });
    }
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
