import mongoose from 'mongoose';

export const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const mongoUri = process.env.MONGO_URI || 'mongodb://admin:password@mongo:27017/apartments?authSource=admin';
      await mongoose.connect(mongoUri, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
      });
      console.log('Connected to MongoDB');
      return;
    } catch (error) {
      retries++;
      console.error(`MongoDB connection attempt ${retries} failed:`, error);
      if (retries === maxRetries) {
        console.error('Max retries reached. Exiting...');
        process.exit(1);
      }
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10s
    }
  }
};