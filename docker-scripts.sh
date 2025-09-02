#!/bin/bash

# Docker management script for TrackSys

case "$1" in
    ("start")
        echo "Starting TrackSys services..."
        docker-compose build
        docker-compose up -d --wait
        echo "Services started! Access:"
        echo "  Frontend: http://localhost:3000/"
        echo "  Backend:  http://localhost:3001"
        echo "  MongoDB:  localhost:27017"
        echo "  Mongo Express: http://localhost:8081"
        exec 1>&1  # Ensure stdout is not buffered

        ;;
    ("stop")
        echo "Stopping TrackSys services..."
        docker-compose down
        ;;
    ("restart")
        echo "Restarting TrackSys services..."
        docker-compose down
        docker-compose up -d
        ;;
    ("build")
        echo "Building TrackSys services..."
        docker-compose build 
        docker-compose up -d
        ;;
    ("logs")
        echo "Showing logs..."
        docker-compose logs -f
        ;;
    ("clean")
        echo "Cleaning up Docker resources..."
        docker-compose down -v --remove-orphans
        docker system prune -f
        ;;
    ("status")
        echo "Checking service status..."
        docker-compose ps
        ;;
    ("shell")
        if [ -z "$2" ]; then
            echo "Usage: $0 shell [frontend|backend|mongodb]"
            exit 1
        fi
        echo "Opening shell in $2 container..."
        docker-compose exec $2 sh
        ;;
    (*)
        echo "Usage: $0 {start|stop|restart|build|logs|clean|status|shell}"
        echo ""
        echo "Commands:"
        echo "  start   - Start all services in background"
        echo "  stop    - Stop all services"
        echo "  restart - Restart all services"
        echo "  build   - Build and start services"
        echo "  logs    - Show service logs"
        echo "  clean   - Clean up Docker resources"
        echo "  status  - Show service status"
        echo "  shell   - Open shell in container (frontend|backend|mongodb)"
        exit 1
        ;;
esac 