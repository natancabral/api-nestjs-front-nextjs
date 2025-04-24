#!/bin/bash

export NVM_DIR="${XDG_CONFIG_HOME:-$HOME/.nvm}"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "Use node version..."
nvm install 22
nvm use 22
nvm use

echo "Install yarn global..."
npm install -g yarn

echo "Install mikro-orm/cli..."
yarn add @mikro-orm/cli --global
yarn add @mikro-orm/cli

echo "Create docker network..."
sudo docker compose up -d

echo "Installing dependencies..."
yarn install

echo "Init migrations..."
yarn --cwd nest migration:create:init
yarn migration:init
yarn migration:create:init
yarn migration:create:init:npx
yarn migration:create

echo "Setup completed successfully!"
echo "-------------------------------------------------"
echo "cd ./nestjs - to access backend"
echo "cd ./nextjs - to access frontend"
echo "-------------------------------------------------"