import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = `mongodb://${process.env.MONGO_USER || 'admin'}:${process.env.MONGO_PASSWORD || 'password'}@${process.env.MONGO_HOST || 'mongo'}:${process.env.MONGO_PORT || '27017'}/${process.env.MONGO_DB || 'apartments'}?authSource=admin`;
    
    await mongoose.connect(mongoUri);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};