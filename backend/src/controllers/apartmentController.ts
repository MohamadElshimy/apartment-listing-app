import { Request, Response, NextFunction } from 'express';
import { ApartmentModel } from '../models/apartment';
import { Apartment, ApartmentQueryParams } from '../types/apartment';
import Joi from 'joi';

const apartmentSchema = Joi.object({
  unitName: Joi.string().required().trim().max(100),
  unitNumber: Joi.string().required().trim().max(20),
  project: Joi.string().required().trim().max(100),
  price: Joi.number().required().min(0),
  bedrooms: Joi.number().required().min(0).max(20),
  bathrooms: Joi.number().required().min(0).max(20),
  size: Joi.number().required().min(0),
  description: Joi.string().required().trim().max(2000),
  imageUrl: Joi.string().allow('', null).optional().trim().max(500)
});

export const getApartments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, project, minPrice, maxPrice } = req.query as ApartmentQueryParams;
    
    const query: any = {};
    
    if (search) {
      query.$or = [
        { unitName: { $regex: search, $options: 'i' } },
        { unitNumber: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (project) {
      query.project = { $regex: project, $options: 'i' };
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const apartments = await ApartmentModel.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: apartments,
      count: apartments.length
    });
  } catch (error) {
    next(error);
  }
};

export const getApartmentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    
    const apartment = await ApartmentModel.findById(id);
    
    if (!apartment) {
      return res.status(404).json({
        success: false,
        error: 'Apartment not found'
      });
    }
    
    res.json({
      success: true,
      data: apartment
    });
  } catch (error) {
    next(error);
  }
};

export const addApartment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error, value } = apartmentSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: error.details[0].message
      });
    }
    
    if (value.imageUrl && value.imageUrl.trim() !== '') {
      try {
        new URL(value.imageUrl);
      } catch {
        return res.status(400).json({
          success: false,
          error: 'Invalid image URL'
        });
      }
    } else {
      value.imageUrl = '';
    }
    
    const apartment = new ApartmentModel(value);
    await apartment.save();
    
    res.status(201).json({
      success: true,
      data: apartment
    });
  } catch (error) {
    next(error);
  }
};

