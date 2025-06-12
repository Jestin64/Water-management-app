import mongoose, { Schema, Document } from 'mongoose';
import { IWaterReading } from '../interfaces/IWaterReading';

export interface IWaterReadingDocument extends IWaterReading, Document {}

const WaterReadingSchema: Schema = new Schema({
  meterId: { type: Schema.Types.ObjectId, ref: 'WaterMeter', required: true },
  reading: { type: Number, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
  flowRate: { type: Number, required: true },
  isAlert: { type: Boolean, required: true, default: false },
  alertReason: { type: String }
}, {
  timestamps: true
});

// Index for efficient querying of readings by meter and time
WaterReadingSchema.index({ meterId: 1, timestamp: -1 });

export default mongoose.model<IWaterReadingDocument>('WaterReading', WaterReadingSchema); 