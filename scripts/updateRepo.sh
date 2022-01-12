#!/usr/bin/env bash

LC_PROJECT_NAME=tarbean
ssh -tt -o StrictHostKeyChecking=no suilabs@suilabs.com "mkdir -p Projects/${LC_PROJECT_NAME}" && \
rsync -rpulz --verbose ${PWD}/../* suilabs@suilabs.com:./Projects/${LC_PROJECT_NAME}/. && \
ssh -tt -o SendEnv=LC_* -o SendEnv -o StrictHostKeyChecking=no suilabs@suilabs.com "cd Projects/${LC_PROJECT_NAME}; docker-compose up -d --build;"
