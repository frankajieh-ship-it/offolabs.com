// server/src/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  targetDate: {
    type: Date,
    required: true
  },
  actualDate: Date,
  type: {
    type: String,
    enum: ['restaurant', 'retail', 'office', 'industrial', 'residential'],
    default: 'restaurant'
  },
  status: {
    type: String,
    enum: ['planning', 'in_progress', 'delayed', 'completed', 'cancelled'],
    default: 'planning'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  team: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: String,
    permissions: [String]
  }],
  tags: [String],
  budget: Number,
  customFields: mongoose.Schema.Types.Mixed,
  metadata: {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    lastModifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }
}, {
  timestamps: true
});

// Indexes
projectSchema.index({ owner: 1, status: 1 });
projectSchema.index({ location: '2dsphere' });

export default mongoose.model('Project', projectSchema);
