## Инструкция по развертыванию LegalMatch

### 1. Настройка базы данных

1. Создайте базу данных PostgreSQL:
   ```bash
   createdb legalmatch
   ```

2. Импортируйте схему базы данных:
   ```bash
   psql legalmatch < src/config/database.sql
   ```

### 2. Настройка переменных окружения

1. Создайте файл `.env`:
   ```env
   # Firebase
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/legalmatch

   # AI
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

### 3. Установка зависимостей

```bash
npm install
```

### 4. Настройка Firebase

1. Установите Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Войдите в Firebase:
   ```bash
   firebase login
   ```

3. Инициализируйте проект:
   ```bash
   firebase init
   ```

   Выберите:
   - Hosting
   - Firestore
   - Storage
   - Authentication

### 5. Развертывание

1. Сделайте скрипт развертывания исполняемым:
   ```bash
   chmod +x deploy.sh
   ```

2. Запустите развертывание:
   ```bash
   ./deploy.sh
   ```

### 6. Проверка развертывания

1. Откройте Firebase Console и убедитесь, что:
   - Hosting активен
   - База данных создана
   - Правила безопасности применены
   - Аутентификация настроена

2. Проверьте работу сайта по URL Firebase Hosting

### 7. Мониторинг

1. Настройте Firebase Analytics
2. Включите Firebase Performance Monitoring
3. Настройте Firebase Crashlytics

### Обновление

Для обновления приложения:

1. Внесите изменения в код
2. Запустите тесты:
   ```bash
   npm run test
   ```

3. Запустите развертывание:
   ```bash
   ./deploy.sh
   ```

### Откат изменений

В случае проблем:

1. Найдите предыдущую версию в Firebase Console
2. Выполните откат:
   ```bash
   firebase hosting:rollback
   ```

### Поддержка

При возникновении проблем:

1. Проверьте логи в Firebase Console
2. Убедитесь, что все переменные окружения настроены
3. Проверьте подключение к базе данных
4. Проверьте права доступа Firebase

### Безопасность

1. Регулярно обновляйте зависимости:
   ```bash
   npm audit fix
   ```

2. Проверяйте правила безопасности Firebase
3. Следите за доступом к API ключам
4. Регулярно проверяйте логи доступа