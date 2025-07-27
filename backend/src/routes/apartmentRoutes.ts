import { Router } from 'express';
import { 
  getApartments, 
  getApartmentById, 
  addApartment
} from '../controllers/apartmentController';

const router = Router();

/**
 * @route   GET /api/apartments
 * @desc    Get all apartments with optional filtering
 * @access  Public
 * 
 * Query Parameters:
 * - search: Search term for unit name or unit number
 * - project: Filter by project name  
 * - minPrice: Minimum price filter
 * - maxPrice: Maximum price filter
 * 
 * Example: GET /api/apartments?search=luxury&minPrice=100000&maxPrice=500000
 */
router.get('/', getApartments);

/**
 * @route   GET /api/apartments/:id
 * @desc    Get a single apartment by ID
 * @access  Public
 * 
 * URL Parameters:
 * - id: Apartment ID (MongoDB ObjectId)
 * 
 * Example: GET /api/apartments/507f1f77bcf86cd799439011
 */
router.get('/:id', getApartmentById);

/**
 * @route   POST /api/apartments
 * @desc    Create a new apartment listing
 * @access  Public
 * 
 * Request Body:
 * {
 *   "unitName": "Luxury Penthouse Suite",
 *   "unitNumber": "A101",
 *   "project": "Downtown Heights",
 *   "price": 450000,
 *   "bedrooms": 3,
 *   "bathrooms": 2,
 *   "size": 1500,
 *   "description": "Beautiful luxury apartment with city views",
 *   "imageUrl": "https://example.com/image.jpg" // Optional
 * }
 */
router.post('/', addApartment);



export default router;