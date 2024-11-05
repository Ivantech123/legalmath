#!/bin/bash

# Configuration
BEGET_HOST="your-login.beget.tech"
BEGET_USER="your-login"
BEGET_PATH="/home/your-login/public_html"
BACKUP_DIR="backups"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if backup version is provided
if [ -z "$1" ]; then
    echo -e "${RED}Please provide backup version (timestamp)${NC}"
    echo "Available backups:"
    ls -1 $BACKUP_DIR
    exit 1
fi

BACKUP_FILE="$BACKUP_DIR/backup_$1.tar.gz"

# Check if backup exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo -e "${RED}Backup file not found: $BACKUP_FILE${NC}"
    exit 1
fi

echo -e "${YELLOW}Rolling back to version $1...${NC}"

# Upload backup
echo -e "${YELLOW}Uploading backup...${NC}"
scp $BACKUP_FILE $BEGET_USER@$BEGET_HOST:$BEGET_PATH/rollback.tar.gz
if [ $? -ne 0 ]; then
    echo -e "${RED}Upload failed!${NC}"
    exit 1
fi

# Deploy backup
echo -e "${YELLOW}Deploying backup...${NC}"
ssh $BEGET_USER@$BEGET_HOST "cd $BEGET_PATH && \
    rm -rf ./* && \
    tar -xzf rollback.tar.gz && \
    rm rollback.tar.gz && \
    chmod -R 755 . && \
    find . -type f -exec chmod 644 {} \;"
if [ $? -ne 0 ]; then
    echo -e "${RED}Rollback failed!${NC}"
    exit 1
fi

echo -e "${GREEN}Rollback completed successfully!${NC}"