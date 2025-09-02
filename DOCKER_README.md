# Docker Setup for TrackSys

This project includes Docker configuration for easy development and deployment.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. **Clone and navigate to the project directory**
   ```bash
   cd client
   ```

2. **Set up environment variables**
   - Copy `.env.example` to `.env` (if not already done)
   - Modify the values in `.env` as needed

3. **Build and run the application**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017
   - MongoDB Express (Admin): http://localhost:8081

## Services

### Frontend (React)
- **Port**: 3000
- **Service**: React application built with Vite
- **Dockerfile**: `Dockerfile`

### Backend (Express)
- **Port**: 3001
- **Service**: Express.js API server
- **Dockerfile**: `Dockerfile.backend`

### MongoDB
- **Port**: 27017
- **Service**: MongoDB 7.0 database
- **Database**: tracksys
- **Credentials**: Set in `.env` file

### MongoDB Express
- **Port**: 8081
- **Service**: Web-based MongoDB admin interface
- **Credentials**: Set in `.env` file

## Environment Variables

Key environment variables in `.env`:

```bash
# MongoDB
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=password123
MONGO_DATABASE=tracksys

# Session
SESSION_SECRET=your-secret-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Useful Commands

### Start services
```bash
docker-compose up
```

### Start services in background
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild and start
```bash
docker-compose up --build
```

### Access MongoDB shell
```bash
docker-compose exec mongodb mongosh -u admin -p password123
```

### Access backend container
```bash
docker-compose exec backend sh
```

## Development

For development, you can run the services individually:

```bash
# Start only MongoDB
docker-compose up mongodb

# Start only backend
docker-compose up backend

# Start only frontend
docker-compose up frontend
```

## Production Considerations

1. **Security**: Change default passwords in `.env`
2. **SSL**: Configure HTTPS for production
3. **Backup**: Set up MongoDB backup strategy
4. **Monitoring**: Add health checks and monitoring
5. **Scaling**: Consider using Docker Swarm or Kubernetes

## Troubleshooting

### Port conflicts
If ports are already in use, modify the port mappings in `docker-compose.yml`

### Permission issues
```bash
sudo chown -R $USER:$USER .
```

### Clean rebuild
```bash
docker-compose down -v
docker system prune -f
docker-compose up --build
``` 