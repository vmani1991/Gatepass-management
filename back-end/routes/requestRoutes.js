// routes/requestRoutes.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request'); // Make sure you have models/Request.js

// ✅ Generate short unique code
const generateCode = () => {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
};

// ---------------------------
// Create a new student request
// POST /api/requests
// ---------------------------
router.post('/', async (req, res, next) => {
  try {
    const { studentName, reason } = req.body;
    if (!studentName || !reason) return res.status(400).json({ message: 'Missing fields' });

    const code = generateCode();
    const newRequest = await Request.create({ studentName, reason, code });
    res.status(201).json(newRequest);
  } catch (err) {
    next(err);
  }
});

// ---------------------------
// Get all requests (HOD view)
// GET /api/requests
// ---------------------------
router.get('/', async (req, res, next) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
});

// ---------------------------
// Update status (HOD approve/reject)
// PUT /api/requests/:id/status
// ---------------------------
router.put('/:id/status', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending','Approved','Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const updated = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Request not found' });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ---------------------------
// Get request by code (Security check)
// GET /api/requests/code/:code
// ---------------------------
router.get('/code/:code', async (req, res, next) => {
  try {
    const { code } = req.params;
    const request = await Request.findOne({ code });
    if (!request) return res.status(404).json({ message: 'Request not found' });

    res.json(request);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
