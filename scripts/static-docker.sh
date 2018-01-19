#!/usr/bin/env bash
CONTAINER_NAME=static_server
rm -f ../Dockerfile
cp Dockerfile-prod ../Dockerfile
cd ..
docker stop $(docker ps | grep 127.0.0.1:3001:3000)
docker build -t static_server . &&
container_id=$(docker run -d \
    --restart always \
    -p 127.0.0.1:3001:3000 \
    -v ${PWD}/public:/usr/src/app/public \
    ${CONTAINER_NAME})
echo $container_id > containerid
