import mongoose, { Schema, Document } from 'mongoose';
import { IWaterMeter } from '../interfaces/IWaterMeter';

export interface IWaterMeterDocument extends IWaterMeter, Document {}

const WaterMeterSchema: Schema = new Schema({
  houseId: { type: String, required: true },
  meterNumber: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  installationDate: { type: Date, required: true },
  lastReading: { type: Number, required: true, default: 0 },
  lastReadingDate: { type: Date, required: true, default: Date.now },
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  threshold: { type: Number, required: true, default: 1000 } // default 1000 liters per hour
}, {
  timestamps: true
});

export default mongoose.model<IWaterMeterDocument>('WaterMeter', WaterMeterSchema); 