#!/bin/bash

# Build the project
echo "Building project..."
npm run build

# Deploy to Firebase
echo "Deploying to Firebase..."
firebase deploy

echo "Deployment complete!"