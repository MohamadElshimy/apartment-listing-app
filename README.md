# Apartment Listing App

A simple, full-stack apartment listing application built with Next.js, Node.js, and MongoDB. Features search, filtering, and responsive design.

## Features
- **Browse apartments** with search and filtering
- **View detailed information** for each apartment
- **Add new listings** with validation
- **Search by** unit name, unit number, or project
- **Filter by** price range
- **Responsive design** for all devices
- **Containerized** with Docker for easy deployment

## Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MohamadElshimy/apartment-listing-app.git
   cd apartment-listing-app
   ```
   
2. **Start all services:**
   ```bash
   docker-compose up --build
   ```

3. **Access the application:**
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5000](http://localhost:5000)
   - **Health Check**: [http://localhost:5000/health](http://localhost:5000/health)

4. **Database:**
   - Automatically seeded with sample data on first run

### Environment Variables
All environment variables are configured in `docker-compose.yml`:
- **Backend**: MongoDB connection, port configuration
- **Frontend**: API URL configuration

## API Endpoints

### List Apartments
```
GET /api/apartments?search=<query>&project=<project>&minPrice=<min>&maxPrice=<max>
```
- Query params:
  - `search`: Search by unit name or unit number
  - `project`: Filter by project name
  - `minPrice`: Filter by minimum price
  - `maxPrice`: Filter by maximum price

### Get Apartment Details
```
GET /api/apartments/:id
```

### Add Apartment
```
POST /api/apartments
Content-Type: application/json
{
  "unitName": "...",
  "unitNumber": "...",
  "project": "...",
  "price": 123456,
  "bedrooms": 2,
  "bathrooms": 2,
  "size": 1200,
  "description": "...",
  "imageUrl": "..." // optional
}
```

## Project Structure
```
apartment-listing-app/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   └── app.ts           # Express app setup
├── src/                     # Next.js frontend
│   ├── components/          # React components
│   ├── pages/               # Next.js pages
│   └── lib/                 # API client
└── docker-compose.yml       # Docker services
```

## Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose
- **Database**: MongoDB
- **Containerization**: Docker, Docker Compose

## Development

For local development without Docker:
- **Backend**: `cd backend && npm install && npm run dev`
- **Frontend**: `npm install && npm run dev`
- **Database**: Use local MongoDB instance
- **DB seeding**: `cd backend && npm run seed`.
