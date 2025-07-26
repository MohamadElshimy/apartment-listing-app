import express from 'express';
import { getApartments, getApartmentById, addApartment } from '../controllers/apartmentController';

const router = express.Router();

/**
 * @route GET /api/apartments
 * @desc Get all apartments with optional search and filter
 * @query search - Search by unitName or unitNumber
 * @query project - Filter by project name
 * @query minPrice - Filter by minimum price
 * @query maxPrice - Filter by maximum price
 */
router.get('/', getApartments);

/**
 * @route GET /api/apartments/:id
 * @desc Get apartment details by ID
 */
router.get('/:id', getApartmentById);

/**
 * @route POST /api/apartments
 * @desc Add a new apartment
 * @body Apartment object
 */
router.post('/', addApartment);

export default router;