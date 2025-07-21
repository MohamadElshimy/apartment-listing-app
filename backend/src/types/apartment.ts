export interface Apartment {
  _id?: string;
  unitName: string;
  unitNumber: string;
  project: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  size: number;
  description: string;
  imageUrl?: string;
}