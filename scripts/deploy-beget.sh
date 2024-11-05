#!/bin/bash

# Configuration
BEGET_HOST="your-login.beget.tech"
BEGET_USER="your-login"
BEGET_PATH="/home/your-login/public_html"
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Starting deployment process...${NC}"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Build project
echo -e "${YELLOW}Building project...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}Build failed!${NC}"
    exit 1
fi

# Create backup of current version
echo -e "${YELLOW}Creating backup...${NC}"
ssh $BEGET_USER@$BEGET_HOST "cd $BEGET_PATH && tar -czf ~/backup_$TIMESTAMP.tar.gz ."
if [ $? -ne 0 ]; then
    echo -e "${RED}Backup failed!${NC}"
    exit 1
fi

# Download backup locally
echo -e "${YELLOW}Downloading backup...${NC}"
scp $BEGET_USER@$BEGET_HOST:~/backup_$TIMESTAMP.tar.gz $BACKUP_DIR/
if [ $? -ne 0 ]; then
    echo -e "${RED}Backup download failed!${NC}"
    exit 1
fi

# Create archive of new version
echo -e "${YELLOW}Creating deployment archive...${NC}"
cd dist
tar -czf ../deploy.tar.gz .
cd ..

# Upload new version
echo -e "${YELLOW}Uploading new version...${NC}"
scp deploy.tar.gz $BEGET_USER@$BEGET_HOST:$BEGET_PATH/
if [ $? -ne 0 ]; then
    echo -e "${RED}Upload failed!${NC}"
    exit 1
fi

# Deploy new version
echo -e "${YELLOW}Deploying new version...${NC}"
ssh $BEGET_USER@$BEGET_HOST "cd $BEGET_PATH && \
    rm -rf ./* && \
    tar -xzf deploy.tar.gz && \
    rm deploy.tar.gz && \
    chmod -R 755 . && \
    find . -type f -exec chmod 644 {} \;"
if [ $? -ne 0 ]; then
    echo -e "${RED}Deployment failed!${NC}"
    echo -e "${YELLOW}Rolling back to previous version...${NC}"
    ssh $BEGET_USER@$BEGET_HOST "cd $BEGET_PATH && \
        rm -rf ./* && \
        tar -xzf ~/backup_$TIMESTAMP.tar.gz"
    exit 1
fi

# Cleanup
echo -e "${YELLOW}Cleaning up...${NC}"
rm deploy.tar.gz
ssh $BEGET_USER@$BEGET_HOST "rm ~/backup_$TIMESTAMP.tar.gz"

echo -e "${GREEN}Deployment completed successfully!${NC}"