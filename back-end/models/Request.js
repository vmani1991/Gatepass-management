const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  reason: { type: String, required: true },
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
  code: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Request', RequestSchema);
