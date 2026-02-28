#!/bin/bash
set -e

echo "Starting deployment of Business AI Assistant..."

# Ensure data directory exists
mkdir -p data/uploads
mkdir -p data/faiss_index

# Pull latest code
git pull origin main

# Rebuild and restart containers
echo "Building Docker containers..."
docker-compose down
docker-compose up -d --build

echo "Deployment complete! Application is running on port 80."
