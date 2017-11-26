#!/usr/bin/env bash
docker build -t static_server . && \
docker run -d \
    -v ${PWD}/public:/usr/src/app/public \
    static_server
