// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User'); // Assuming you'll create a User model
const Patient = require("./models/Patient")
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));




    app.post('/api/register', async (req, res) => {
        const { name, introduction, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, introduction, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered!' });
    });
  
  // User login
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });

// Endpoints

// GET all patients
app.get('/api/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single patient by name
app.get('/api/patients/:name', async (req, res) => {
  try {
    const patient = await Patient.findOne({ name: req.params.name });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET all patients with condition "Critical"
app.get('/api/critical', async (req, res) => {
  try {
    const criticalPatients = await Patient.find({ condition: 'Critical' });
    res.json(criticalPatients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new patient
app.post('/api/patients', async (req, res) => {
  const { name, age, gender, address, zipCode, bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate, condition } = req.body;

  const patient = new Patient({
    name,
    age,
    gender,
    address,
    zipCode,
    bloodPressure,
    respiratoryRate,
    bloodOxygenLevel,
    heartbeatRate,
    condition, // Include condition field
  });

  try {
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Patient with this name already exists' });
    }
    res.status(500).json({ message: err.message });
  }
});

// PUT update a patient by name
app.put('/api/patients/:name', async (req, res) => {
  try {
    const { age, gender, address, zipCode, bloodPressure, respiratoryRate, bloodOxygenLevel, heartbeatRate, condition } = req.body;

    const updateData = {
      updatedAt: Date.now(),
      ...(age !== undefined && { age }),
      ...(gender !== undefined && { gender }),
      ...(address !== undefined && { address }),
      ...(zipCode !== undefined && { zipCode }),
      ...(bloodPressure !== undefined && { bloodPressure }),
      ...(respiratoryRate !== undefined && { respiratoryRate }),
      ...(bloodOxygenLevel !== undefined && { bloodOxygenLevel }),
      ...(heartbeatRate !== undefined && { heartbeatRate }),
      ...(condition !== undefined && { condition }), // Update condition if provided
    };

    const updatedPatient = await Patient.findOneAndUpdate(
      { name: req.params.name },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) return res.status(404).json({ message: 'Patient not found' });
    res.json(updatedPatient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});