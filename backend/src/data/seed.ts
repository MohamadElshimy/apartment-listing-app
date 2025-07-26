import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApartmentModel } from '../models/apartment';

dotenv.config();

const seedData = [
  {
    unitName: 'Luxury Suite',
    unitNumber: 'A101',
    project: 'Sky Towers',
    price: 250000,
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    description: 'Modern apartment with city views',
    imageUrl: 'https://www.fourseasons.com/alt/img-opt/~75.701.0,0000-10,7500-3000,0000-1687,5000/publish/content/dam/fourseasons/images/web/PAL/PAL_1393_original.jpg',
  },
  {
    unitName: 'Penthouse View',
    unitNumber: 'B501',
    project: 'Sky Towers',
    price: 450000,
    bedrooms: 3,
    bathrooms: 3,
    size: 1800,
    description: 'Spacious penthouse with panoramic views',
    imageUrl: 'https://www.michaelzingraf.com/storage/images/vYgLD0a9HMIiaJ2JP1ZKj9YKwxUd8DWwCOZVxrIJ.jpeg',
  },
  {
    unitName: 'Cozy Retreat',
    unitNumber: 'C203',
    project: 'Green Valley',
    price: 150000,
    bedrooms: 1,
    bathrooms: 1,
    size: 800,
    description: 'Compact apartment perfect for singles',
    imageUrl: 'https://pictures.escapia.com/FirstAccom/162799/0305820292.jpg',
  },
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://admin:password@mongo:27017/apartments?authSource=admin';
    await mongoose.connect(mongoUri);
    await ApartmentModel.deleteMany({});
    await ApartmentModel.insertMany(seedData);
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seed(); 