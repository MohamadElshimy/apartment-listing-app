import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import apartmentRoutes from './routes/apartmentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.json());

connectDB();

app.use('/api/apartments', apartmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});