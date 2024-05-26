#!/bin/bash

echo "Starting Application..."
sleep 2

echo "Starting API..."
echo $PWD
osascript ./scripts/start-api.scpt "$PWD"

sleep 2

echo "Starting UI..."
echo $PWD
osascript ./scripts/start-ui.scpt "$PWD"

