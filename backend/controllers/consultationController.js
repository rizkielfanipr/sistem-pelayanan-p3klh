const Consultation = require('../models/ConsultationModel');
const path = require('path');

// Helper function to generate random code
function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Controller for creating a new consultation
async function createConsultation(req, res) {
  try {
    const { service, date, session, content } = req.body;

    // Validate required fields
    if (!service || !date || !session || !content) {
      return res.status(400).json({ message: 'Required fields are missing.' });
    }

    // Handle file upload
    let filePath = null;
    if (req.file) {
      filePath = path.join('uploads', req.file.filename);
    }

    // Generate random code
    const code = generateRandomCode(7);

    // Create new consultation entry
    const newConsultation = await Consultation.create({
      service,
      date,
      session,
      content,
      file: filePath, // Save file path to database
      code,
    });

    // Respond with success and the generated code
    res.status(201).json({
      message: 'Consultation successfully created.',
      code: newConsultation.code,
      file: filePath || 'No file uploaded',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the consultation.' });
  }
}

module.exports = { createConsultation };
