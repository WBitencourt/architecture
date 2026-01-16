#!/bin/bash

echo "🛑 Parando todos os containers"
docker stop $(docker ps -a -q)

echo "🔍 Verificando containers parados..."
docker container prune -f

echo "🗑️ Removendo imagens não utilizadas..."
docker image prune -a -f

echo "🗑️ Removendo caches não utilizados..."
docker builder prune -a -f

echo "🗑️ Removendo volumes não utilizados..."
docker volume prune -f

echo "🌐 Removendo redes não utilizadas..."
docker network prune -f

echo "✅ Limpeza concluída!"

