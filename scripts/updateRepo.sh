#!/usr/bin/env bash

ssh suilabs@suilabs.com <<< "
cd Projects/static-server
git pull origin master && \
docker-compose up --build server"