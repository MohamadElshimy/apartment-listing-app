import mongoose, { Schema } from 'mongoose';
import { Apartment } from '../types/apartment';

const apartmentSchema = new Schema<Apartment>({
  unitName: { type: String, required: true },
  unitNumber: { type: String, required: true },
  project: { type: String, required: true },
  price: { type: Number, required: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  size: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
}, { timestamps: true });

apartmentSchema.index({ unitName: 1 });
apartmentSchema.index({ unitNumber: 1 });
apartmentSchema.index({ project: 1 });

export const ApartmentModel = mongoose.model<Apartment>('Apartment', apartmentSchema);