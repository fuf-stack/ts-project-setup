#!/bin/bash

set -o errexit # Exit on error

echo "$(date) - Cleaning up repository..."

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )";
cd $DIR/../

echo "$(date) - Removing build artifacts in packages..."
rm -rf ./dist
rm -rf ./packages/*/dist

echo "$(date) - Removing node_modules..."
rm -rf ./node_modules
rm -rf ./packages/*/node_modules

echo "$(date) - Removing other files..."
find . -name ".pnpm-debug.log" -type f -prune -exec rm -rf "{}" \;
find . -name "lerna-debug.log" -type f -prune -exec rm -rf "{}" \;
find . -name "yarn-error.log" -type f -prune -exec rm -rf "{}" \;

echo "$(date) - Repository cleaning successful"
