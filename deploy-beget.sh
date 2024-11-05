#!/bin/bash

# Параметры подключения к Beget
BEGET_HOST="your-login.beget.tech"
BEGET_USER="your-login"
BEGET_PATH="/home/your-login/public_html"

# Сборка проекта
echo "Building project..."
npm run build

# Создание архива с собранным проектом
echo "Creating archive..."
cd dist
tar -czf ../dist.tar.gz .
cd ..

# Загрузка на сервер
echo "Uploading to Beget..."
scp dist.tar.gz $BEGET_USER@$BEGET_HOST:$BEGET_PATH

# Распаковка на сервере
echo "Deploying..."
ssh $BEGET_USER@$BEGET_HOST "cd $BEGET_PATH && tar -xzf dist.tar.gz && rm dist.tar.gz"

# Очистка
echo "Cleaning up..."
rm dist.tar.gz

echo "Deployment complete!"