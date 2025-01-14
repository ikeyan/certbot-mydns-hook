#!/bin/bash
cd "$(dirname "$0")/.."
./node_modules/.bin/tsx --env-file /etc/ikeyan/mydns.env ./src/auth.ts