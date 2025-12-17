// server/src/models/Inspection.js
import mongoose from 'mongoose';

const inspectionSchema = new mongoose.Schema({
  permit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permit',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  actualDate: Date,
  status: {
    type: String,
    enum: ['scheduled', 'in_progress', 'completed', 'passed', 'failed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  inspector: {
    name: String,
    agency: String,
    contact: String,
    externalId: String
  },
  location: {
    address: String,
    meetingPoint: String,
    instructions: String
  },
  checklist: [{
    item: String,
    requirement: String,
    status: { type: String, enum: ['pending', 'pass', 'fail', 'na'] },
    notes: String,
    photos: [String],
    timestamp: Date
  }],
  findings: [{
    type: String,
    description: String,
    severity: { type: String, enum: ['critical', 'major', 'minor'] },
    correctiveAction: String,
    dueDate: Date,
    status: { type: String, enum: ['open', 'in_progress', 'resolved'] }
  }],
  attendees: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: String,
    confirmed: Boolean
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  notes: String,
  followUpRequired: Boolean,
  nextInspectionDate: Date
}, {
  timestamps: true
});

export default mongoose.model('Inspection', inspectionSchema);
