import { Request, Response } from 'express';
import { ApartmentModel } from '../models/apartment';
import { Apartment } from '../types/apartment';

export const getApartments = async (req: Request, res: Response) => {
  try {
    const { search, project } = req.query;
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

    const apartments = await ApartmentModel.find(query).sort({ createdAt: -1 });
    res.json(apartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const apartment = await ApartmentModel.findById(req.params.id);
    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }
    res.json(apartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addApartment = async (req: Request, res: Response) => {
  try {
    const apartment = new ApartmentModel(req.body);
    await apartment.save();
    res.status(201).json(apartment);
  } catch (error) {
    console.error('Error adding apartment:', error);
    res.status(400).json({ error: 'Invalid apartment data' });
  }
};