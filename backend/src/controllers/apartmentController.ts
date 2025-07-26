import { Request, Response, NextFunction } from 'express';
import { ApartmentModel } from '../models/apartment';
import { Apartment } from '../types/apartment';
import Joi from 'joi';

const apartmentSchema = Joi.object({
  unitName: Joi.string().required(),
  unitNumber: Joi.string().required(),
  project: Joi.string().required(),
  price: Joi.number().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  size: Joi.number().required(),
  description: Joi.string().required(),
  imageUrl: Joi.string().uri().optional(),
});

export const getApartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, project, minPrice, maxPrice } = req.query;
    let query: any = {};

    if (search) {
      query.$or = [
        { unitName: { $regex: search, $options: 'i' } },
        { unitNumber: { $regex: search, $options: 'i' } },
      ];
    }

    if (project) {
      query.project = { $regex: project, $options: 'i' };
    }

    // Add price range filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const apartments = await ApartmentModel.find(query).sort({ createdAt: -1 });
    res.json(apartments);
  } catch (error) {
    next(error);
  }
};

export const getApartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apartment = await ApartmentModel.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (error) {
    next(error);
  }
};

export const addApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = apartmentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const apartment = new ApartmentModel(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    next(error);
  }
};