#!/usr/bin/env bash

ssh suilabs@suilabs.com <<< "
cd Projects/tarbean
git pull origin master && \
docker-compose up --build server"