# Apartment Listing App

A full-stack, containerized apartment listing application with search, filter, and CRUD functionality.

## Features
- List, search, and filter apartments
- View apartment details
- Add new apartments
- Responsive UI (Next.js + Tailwind)
- RESTful backend (Node.js + Express + MongoDB)
- Fully containerized with Docker Compose

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
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000/api/apartments](http://localhost:5000/api/apartments)
   - MongoDB: [localhost:27017](mongodb://admin:password@localhost:27017/apartments?authSource=admin)

3. **Seed the database:**
   - The database is automatically seeded on first run.

### Environment Variables
- Backend: see `backend/.env` (or set via `docker-compose.yml`)
- Frontend: `NEXT_PUBLIC_API_URL` (set in `docker-compose.yml`)

## API Endpoints

### List Apartments
```
GET /api/apartments?search=<query>&project=<project>
```
- Query params:
  - `search`: Search by unit name or unit number
  - `project`: Filter by project name

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
- `backend/` - Node.js/Express API
- `src/` - Next.js frontend
- `docker-compose.yml` - Multi-service orchestration

## Development
- To run backend or frontend locally, use `npm install && npm run dev` in the respective folder.
- For seeding: `npm run seed` in `backend/`.
