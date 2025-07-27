import mongoose, { Schema, Document } from 'mongoose';
import { Apartment } from '../types/apartment';

/**
 * Mongoose schema for apartment documents.
 * Defines the structure and validation rules for apartment data in MongoDB.
 */
const apartmentSchema = new Schema<Apartment>({
  unitName: { 
    type: String, 
    required: [true, 'Unit name is required'],
    trim: true,
    maxlength: [100, 'Unit name cannot exceed 100 characters']
  },
  unitNumber: { 
    type: String, 
    required: [true, 'Unit number is required'],
    trim: true,
    maxlength: [20, 'Unit number cannot exceed 20 characters']
  },
  project: { 
    type: String, 
    required: [true, 'Project name is required'],
    trim: true,
    maxlength: [100, 'Project name cannot exceed 100 characters']
  },
  price: { 
    type: Number, 
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  bedrooms: { 
    type: Number, 
    required: [true, 'Number of bedrooms is required'],
    min: [0, 'Number of bedrooms cannot be negative'],
    max: [20, 'Number of bedrooms cannot exceed 20']
  },
  bathrooms: { 
    type: Number, 
    required: [true, 'Number of bathrooms is required'],
    min: [0, 'Number of bathrooms cannot be negative'],
    max: [20, 'Number of bathrooms cannot exceed 20']
  },
  size: { 
    type: Number, 
    required: [true, 'Size is required'],
    min: [0, 'Size cannot be negative']
  },
  description: { 
    type: String, 
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  imageUrl: { 
    type: String,
    trim: true,
    maxlength: [500, 'Image URL cannot exceed 500 characters']
  },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create indexes for better query performance
apartmentSchema.index({ unitName: 1 });
apartmentSchema.index({ unitNumber: 1 });
apartmentSchema.index({ project: 1 });
apartmentSchema.index({ price: 1 });
apartmentSchema.index({ createdAt: -1 });

/**
 * Pre-save middleware to validate image URL if provided
 */
apartmentSchema.pre('save', function(next) {
  if (this.imageUrl && this.imageUrl.trim() !== '') {
    try {
      new URL(this.imageUrl);
    } catch (error) {
      return next(new Error('Invalid image URL format'));
    }
  }
  next();
});

export const ApartmentModel = mongoose.model<Apartment>('Apartment', apartmentSchema);