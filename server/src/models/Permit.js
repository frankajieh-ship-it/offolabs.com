// server/src/models/Permit.js
import mongoose from 'mongoose';

const permitSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['health', 'fire', 'zoning', 'building', 'environmental', 'alcohol', 'signage', 'other'],
    required: true
  },
  jurisdiction: {
    agency: String,
    department: String,
    municipality: String,
    externalId: String  // ID in government system
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'under_review', 'approved', 'rejected', 'expired', 'renewal_required'],
    default: 'draft'
  },
  priority: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low'],
    default: 'medium'
  },
  timeline: {
    applicationDate: Date,
    submissionDate: Date,
    estimatedApprovalDate: Date,
    actualApprovalDate: Date,
    expiryDate: Date,
    renewalDate: Date
  },
  documents: [{
    name: String,
    url: String,
    uploadedAt: Date,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['pending', 'approved', 'rejected'] }
  }],
  requirements: [{
    description: String,
    isCompleted: Boolean,
    completedAt: Date,
    completedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  inspector: {
    name: String,
    agency: String,
    contact: String,
    externalId: String
  },
  fees: [{
    description: String,
    amount: Number,
    paid: Boolean,
    paymentDate: Date
  }],
  notes: [{
    text: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: Date
  }],
  automatedTracking: {
    lastSynced: Date,
    syncStatus: String,
    externalStatus: String,
    data: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

export default mongoose.model('Permit', permitSchema);
