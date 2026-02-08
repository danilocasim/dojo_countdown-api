#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute/default

cp index.js ./.amplify-hosting/compute/default/
cp -r src ./.amplify-hosting/compute/default/src
cp -r node_modules ./.amplify-hosting/compute/default/node_modules

cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json
