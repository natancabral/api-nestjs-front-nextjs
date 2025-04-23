#!/bin/bash

echo "Install yarn global..."
npm install yarn global

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Use node version..."
nvm install 20.12.2
nvm use

echo "Create docker network..."
yarn docker:compose:db

echo "Installing dependencies..."
yarn install

echo "Init migrations..."
yarn migration:init

echo "Init migrations..."
yarn migration:create

echo "Setup completed successfully!"
echo "-------------------------------------------------"
echo "cd ./nestjs - to access backend"
echo "cd ./nextjs - to access frontend"
echo "-------------------------------------------------"
