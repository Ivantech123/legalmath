#!/bin/bash

# Configuration
BEGET_HOST="your-login.beget.tech"
BEGET_USER="your-login"
BEGET_PATH="/home/your-login/public_html"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Checking server status...${NC}"

# Check disk space
echo -e "\n${YELLOW}Checking disk space:${NC}"
ssh $BEGET_USER@$BEGET_HOST "df -h | grep -E '^/dev'"

# Check memory usage
echo -e "\n${YELLOW}Checking memory usage:${NC}"
ssh $BEGET_USER@$BEGET_HOST "free -m"

# Check PHP version and modules
echo -e "\n${YELLOW}Checking PHP configuration:${NC}"
ssh $BEGET_USER@$BEGET_HOST "php -v && php -m"

# Check MySQL status
echo -e "\n${YELLOW}Checking MySQL status:${NC}"
ssh $BEGET_USER@$BEGET_HOST "mysqladmin -u $DB_USER -p$DB_PASSWORD status"

# Check Apache status and configuration
echo -e "\n${YELLOW}Checking Apache configuration:${NC}"
ssh $BEGET_USER@$BEGET_HOST "apache2ctl -t"

# Check SSL certificate
echo -e "\n${YELLOW}Checking SSL certificate:${NC}"
ssl_expiry=$(ssh $BEGET_USER@$BEGET_HOST "echo | openssl s_client -servername $BEGET_HOST -connect $BEGET_HOST:443 2>/dev/null | openssl x509 -noout -enddate")
echo $ssl_expiry

# Check file permissions
echo -e "\n${YELLOW}Checking file permissions:${NC}"
ssh $BEGET_USER@$BEGET_HOST "find $BEGET_PATH -type f -not -perm 644 -ls"
ssh $BEGET_USER@$BEGET_HOST "find $BEGET_PATH -type d -not -perm 755 -ls"

echo -e "\n${GREEN}Server check completed!${NC}"