#!/usr/bin/env bash
# exit on error
set -o errexit

echo "--- Navigating to server directory ---"
cd server

echo "--- Installing dependencies ---"
npm install
