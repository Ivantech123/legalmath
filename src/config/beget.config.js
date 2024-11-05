// Конфигурация для Beget хостинга
export const begetConfig = {
  // API endpoints
  apiUrl: process.env.NODE_ENV === 'production' 
    ? 'https://api.yourdomain.ru'
    : 'http://localhost:3000',

  // Database config
  database: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'user',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'legalmatch'
  },

  // Storage paths
  storage: {
    documents: '/uploads/documents',
    avatars: '/uploads/avatars',
    temp: '/uploads/temp'
  },

  // Cache settings
  cache: {
    staticMaxAge: 31536000, // 1 year
    dynamicMaxAge: 3600 // 1 hour
  },

  // Security
  security: {
    allowedOrigins: [
      'https://yourdomain.ru',
      'https://www.yourdomain.ru'
    ],
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedFileTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf'
    ]
  }
};