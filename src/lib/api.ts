import { Apartment, ApartmentQueryParams, ApiResponse } from '@/types/apartment';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchApartments = async (
  search: string = '', 
  project: string = '', 
  minPrice?: string, 
  maxPrice?: string
): Promise<Apartment[]> => {
  const params: ApartmentQueryParams = {};
  
  if (search) params.search = search;
  if (project) params.project = project;
  if (minPrice) params.minPrice = minPrice;
  if (maxPrice) params.maxPrice = maxPrice;

  const response = await apiClient.get<ApiResponse<Apartment[]>>('/apartments', { params });
  
  if (response.data.success && response.data.data) {
    return response.data.data;
  }
  
  throw new Error(response.data.error || 'Failed to fetch apartments');
};

export const fetchApartmentById = async (id: string): Promise<Apartment> => {
  const response = await apiClient.get<ApiResponse<Apartment>>(`/apartments/${id}`);
  
  if (response.data.success && response.data.data) {
    return response.data.data;
  }
  
  throw new Error(response.data.error || 'Failed to fetch apartment');
};

export const addApartment = async (apartmentData: Omit<Apartment, '_id' | 'createdAt' | 'updatedAt'>): Promise<Apartment> => {
  const response = await apiClient.post<ApiResponse<Apartment>>('/apartments', apartmentData);
  
  if (response.data.success && response.data.data) {
    return response.data.data;
  }
  
  throw new Error(response.data.error || 'Failed to create apartment');
};

