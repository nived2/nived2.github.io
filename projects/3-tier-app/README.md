# 3-Tier Web Application Architecture

A scalable web application implementing a 3-tier architecture using React, Node.js, and PostgreSQL, with Redis for caching.

## Architecture Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │     │   Backend   │     │  Database   │
│   (React)   │ ──► │  (Node.js)  │ ──► │ (PostgreSQL)│
└─────────────┘     └─────────────┘     └─────────────┘
                          │
                    ┌─────────────┐
                    │   Cache     │
                    │   (Redis)   │
                    └─────────────┘
```

## Features

- React frontend with modern UI components
- RESTful API backend using Node.js/Express
- PostgreSQL database with proper schemas
- Redis caching for improved performance
- Docker containerization for each component
- Docker Compose for orchestration

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express
- Database: PostgreSQL
- Caching: Redis
- Containerization: Docker
- Orchestration: Docker Compose

## Getting Started

1. Clone the repository
2. Install Docker and Docker Compose
3. Run `docker-compose up`
4. Access the application at `http://localhost:3000`

## Project Structure

```
.
├── frontend/                # React frontend application
├── backend/                 # Node.js backend API
├── database/               # PostgreSQL database scripts
├── redis/                  # Redis configuration
└── docker-compose.yml      # Docker Compose configuration
```

## Development

- Frontend development server: `npm start` in frontend directory
- Backend development server: `npm run dev` in backend directory
- Database migrations: `npm run migrate` in backend directory

## Deployment

1. Build Docker images: `docker-compose build`
2. Start services: `docker-compose up -d`
3. Run migrations: `docker-compose exec backend npm run migrate`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
