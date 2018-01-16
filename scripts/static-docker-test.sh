#!/usr/bin/env bash
CONTAINER_NAME=static_server_test
cp Dockerfile-test ../Dockerfile
cd ..
docker build -t ${CONTAINER_NAME} . && \
docker run --rm -t -v ${PWD}/src:/usr/src/app/src -v ${PWD}/test:/usr/src/app/test ${CONTAINER_NAME}