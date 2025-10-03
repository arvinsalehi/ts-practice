# TrackSys

This repository contains a React frontend, an Express backend, and MongoDB (with mongo-express) for development and deployment.

## Prerequisites

- Docker
- Docker Compose
- Node.js LTS (for local development)

## Quick Start (Docker)

1. Clone the repo and navigate into it
   ```bash
   git clone https://github.com/arvinsalehi/ts-practice.git
   cd ts-practice
   ```

2. Ensure required environment variables are available to Docker Compose (export them in your shell or provide a `.env` in the project root):
   ```bash
   # MongoDB
   export MONGO_ROOT_USERNAME=admin
   export MONGO_ROOT_PASSWORD=password123
   export MONGO_DATABASE=tracksys

   # App
   export SESSION_SECRET=changeme
   ```

3. Build and start the stack
   ```bash
   docker compose up -d --build
   ```

4. Access the services
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Mongo Express: http://localhost:8081

## Services

### Frontend (React)
- Port: 3000 (served by containerized Nginx build)
- Path: `client/`
- Dockerfile: `client/Dockerfile`

### Backend (Express)
- Port: 3001
- Path: `server/`
- Dockerfile: `server/Dockerfile`

### MongoDB
- Version: 7.0
- Database: `tracksys`
- Credentials: provided via env vars

### Mongo Express
- Port: 8081
- Web-based MongoDB admin

## Useful Docker Commands

- Start services in foreground
  ```bash
  docker compose up
  ```

- Start services in background
  ```bash
  docker compose up -d
  ```

- Stop and remove services
  ```bash
  docker compose down
  ```

- View logs
  ```bash
  docker compose logs -f
  ```

- Clean rebuild
  ```bash
  docker compose down -v
  docker system prune -f
  docker compose up --build
  ```

## Development (Run components individually)

You can develop each component locally. The common pattern is to `cd` into the folder and start it.

- Start only MongoDB (via Docker)
  ```bash
  cd tracksys
  docker compose up -d mongodb
  ```

- Start the backend locally
  ```bash
  cd server
  npm install
  # Set env for local dev (example)
  export PORT=3001
  export CORS_ORIGIN=http://localhost:5173
  export MONGODB_URI=mongodb://admin:password123@localhost:27017/tracksys?authSource=admin
  export SESSION_SECRET=changeme
  npm run dev
  # API: http://localhost:3001
  ```

- Start the frontend locally (Vite dev server)
  ```bash
  cd client
  npm install
  npm run dev
  # App: http://localhost:5173
  ```

Notes:
- If you prefer, you can run backend and frontend in Docker while developing. For example:
  ```bash
  # From project root
  docker compose up backend
  docker compose up frontend
  ```
- If ports conflict, adjust the host ports in `docker-compose.yml` accordingly.

## Troubleshooting

- Port conflicts: modify host port mappings in `docker-compose.yml`.
- Permission issues:
  ```bash
  sudo chown -R $USER:$USER .
  ```
- Mongo shell (inside container):
  ```bash
  docker compose exec mongodb mongosh -u "$MONGO_ROOT_USERNAME" -p "$MONGO_ROOT_PASSWORD"
  ```
