#!/bin/bash

echo "Removing container if exists..."
docker rm -f db-postgres-local
docker rm -f app-nestjs-local

echo "Running database..."
docker run -d \
  --name db-postgres-local \
  -t \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=architecture \
  -p 5432:5432 \
  postgres:16-alpine

echo "Running backend..."
docker run -d \
  --name app-nestjs-local \
  -t \
  -p 3333:3000 \
  -e DATABASE_URL="postgresql://postgres:postgres@db-postgres-local:5432/architecture" \
  app-nestjs-local-image:latest


echo "Adding network to container..."
docker network create nestjs-local-network || true
docker network connect nestjs-local-network db-postgres-local
docker network connect nestjs-local-network app-nestjs-local

echo "Applying ORM migrations..."
pnpm prisma migrate dev
