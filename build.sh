#!/bin/sh
docker-compose build --build-arg CACHE_BUST=$(date +%s)
