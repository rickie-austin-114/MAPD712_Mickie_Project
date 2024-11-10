import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // Import body-parser
import cors from "cors"

import patientRoutes from './routes/patientRoutes.js';
import patientRecordRoutes from './routes/patientRecordRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(cors())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Connected to MongoDB");
}).catch(error => {
  console.error("Error connecting to MongoDB:", error);
});


// Routes
app.use('/api/patients', patientRoutes);
app.use('/api/patientRecords', patientRecordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
