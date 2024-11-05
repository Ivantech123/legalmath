# LegalMatch - Платформа для поиска юристов

## Настройка проекта

### 1. Настройка Firebase

1. Создайте проект в [Firebase Console](https://console.firebase.google.com/)

2. Включите следующие сервисы:
   - Authentication (Email/Password)
   - Firestore Database
   - Storage

3. Создайте файл `.env` в корне проекта и добавьте следующие переменные:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Настройте правила безопасности в Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // User profiles
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Lawyer profiles
    match /lawyers/{lawyerId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'lawyer';
    }
    
    // Cases
    match /cases/{caseId} {
      allow read: if request.auth != null && (
        resource.data.clientId == request.auth.uid ||
        resource.data.lawyerId == request.auth.uid
      );
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && (
        resource.data.clientId == request.auth.uid ||
        resource.data.lawyerId == request.auth.uid
      );
    }
    
    // Consultations
    match /consultations/{consultationId} {
      allow read, write: if request.auth != null && 
        resource.data.participantIds.hasAny([request.auth.uid]);
    }
    
    // Messages
    match /messages/{messageId} {
      allow read, write: if request.auth != null && 
        resource.data.participantIds.hasAny([request.auth.uid]);
    }
    
    // Documents
    match /documents/{documentId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
    
    // Reviews
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

5. Настройте правила безопасности для Storage:
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.resource.size < 5 * 1024 * 1024 && // 5MB max
        request.resource.contentType.matches('image/.*|application/pdf');
    }
  }
}
```

### 2. Установка зависимостей

```bash
npm install
```

### 3. Запуск проекта

```bash
npm run dev
```

## Структура проекта

```
src/
├── components/          # React компоненты
│   ├── ai/             # AI-компоненты
│   ├── auth/           # Компоненты авторизации
│   ├── dashboard/      # Компоненты дашборда
│   ├── registration/   # Компоненты регистрации
│   └── settings/       # Компоненты настроек
├── config/             # Конфигурация Firebase
├── context/           # React контексты
├── services/          # Сервисы для работы с API
│   ├── firebase/      # Firebase сервисы
│   └── ai/            # AI сервисы
├── types/             # TypeScript типы
└── utils/             # Утилиты
```

## Основные функции

### Для клиентов:
- Поиск юристов
- Онлайн-консультации
- Управление документами
- AI-помощник для подбора юриста

### Для юристов:
- Управление профилем
- Календарь консультаций
- Работа с клиентами
- AI-анализ документов

### Для разработчиков:
- API доступ
- Документация
- Мониторинг
- Интеграция AI

## Роли пользователей

1. **Клиент**
   - Поиск юристов
   - Запись на консультации
   - Управление документами

2. **Юрист**
   - Управление профилем
   - Календарь консультаций
   - Работа с клиентами

3. **Разработчик**
   - Доступ к API
   - Мониторинг
   - Интеграция

## Безопасность

- Все запросы к API защищены авторизацией
- Файлы проверяются на размер и тип
- Данные пользователей шифруются
- AI-анализ проходит модерацию

## Поддержка

При возникновении проблем:
1. Проверьте правильность переменных окружения
2. Убедитесь, что Firebase проект настроен правильно
3. Проверьте консоль на наличие ошибок
4. Обратитесь к документации Firebase

## Разработка

### Добавление новых функций

1. Создайте новую ветку:
```bash
git checkout -b feature/new-feature
```

2. Внесите изменения и протестируйте

3. Создайте pull request

### Тестирование

```bash
npm run test
```

### Сборка

```bash
npm run build
```

## Деплой

1. Настройте Firebase Hosting:
```bash
firebase init hosting
```

2. Соберите проект:
```bash
npm run build
```

3. Разверните на Firebase:
```bash
firebase deploy
```