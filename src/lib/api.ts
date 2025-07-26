import { Apartment } from '@/types/apartment';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const fetchApartments = async (search: string = '', project: string = '', minPrice?: string, maxPrice?: string) => {
  const params: any = {};
  if (search) params.search = search;
  if (project) params.project = project;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;
  
  const response = await axios.get(`${API_URL}/apartments`, { params });
  return response.data;
};

export const fetchApartmentById = async (id: string) => {
  const response = await axios.get(`${API_URL}/apartments/${id}`);
  return response.data;
};

export const addApartment = async (apartment: Omit<Apartment, '_id'>) => {
  const response = await axios.post(`${API_URL}/apartments`, apartment);
  return response.data;
};