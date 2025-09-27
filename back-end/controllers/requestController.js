// controllers/requestController.js
const mongoose = require('mongoose');
const Request = require('../models/Request');

const generateCode = () => {
  // small, readable unique code (no extra package)
  return Date.now().toString(36) + Math.random().toString(36).slice(2,8);
};

exports.createRequest = async (req, res, next) => {
  try {
    const { studentName, reason } = req.body;
    if (!studentName || !reason) return res.status(400).json({ message: 'Missing fields' });
    const code = generateCode();
    const request = await Request.create({ studentName, reason, code });
    res.status(201).json(request);
  } catch (err) {
    next(err);
  }
};

exports.getRequests = async (req, res, next) => {
  try {
    const requests = await Request.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    next(err);
  }
};

exports.getRequestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const request = await Request.findById(id);
    if (!request) return res.status(404).json({ message: 'Not found' });
    res.json(request);
  } catch (err) { next(err); }
};

exports.getRequestByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const request = await Request.findOne({ code });
    if (!request) return res.status(404).json({ message: 'Not found' });
    res.json(request);
  } catch (err) { next(err); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending','Approved','Rejected'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const updated = await Request.findByIdAndUpdate(id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};
