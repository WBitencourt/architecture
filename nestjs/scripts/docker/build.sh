#!/bin/bash

echo "Starting postgres container..."
docker pull postgres:16-alpine

echo "Removing image if exists..."
docker rmi -f app-nestjs-local-image:latest

echo "Building docker image..."
docker build -t app-nestjs-local-image:latest .