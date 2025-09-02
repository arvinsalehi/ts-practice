// models/Session.ts
import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  loginId: { type: String, required: true },
  buildNumber: { type: Number, required: true },
  numberOfParts: { type: Number, default: 0 },
  timePerPart: { type: Number, default: 0 },
  startTime: { type: Number, default: Date.now },
  totalPausedTime: { type: Number, default: 0 },
  defects: { type: Number, default: 0 },
  totalParts: { type: Number, default: 0 },
  interactions: [{ type: mongoose.Schema.Types.Mixed }],
  submittedBy: { 
    type: String, 
    enum: ['manual', 'auto'], 
    default: null 
  },
  totalActiveTime: { type: Number, default: 0 },
  totalInactiveTime: { type: Number, default: 0 }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

export const Session = mongoose.model('Session', sessionSchema);
