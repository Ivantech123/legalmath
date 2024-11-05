-- Create tables for LegalMatch platform

-- Users table
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  settings JSON,
  metadata JSON
);

-- Lawyers table
CREATE TABLE lawyers (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL REFERENCES users(id),
  specialization VARCHAR(255) NOT NULL,
  experience INTEGER NOT NULL,
  rating DECIMAL(3,2),
  review_count INTEGER DEFAULT 0,
  location VARCHAR(255),
  bio TEXT,
  hourly_rate INTEGER,
  consultation_price INTEGER,
  schedule JSON,
  services JSON,
  education JSON,
  cases JSON,
  geography JSON,
  social_media JSON,
  verification_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cases table
CREATE TABLE cases (
  id VARCHAR(255) PRIMARY KEY,
  lawyer_id VARCHAR(255) REFERENCES lawyers(id),
  client_id VARCHAR(255) REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50),
  category VARCHAR(100),
  court VARCHAR(255),
  next_hearing DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSON
);

-- Consultations table
CREATE TABLE consultations (
  id VARCHAR(255) PRIMARY KEY,
  lawyer_id VARCHAR(255) REFERENCES lawyers(id),
  client_id VARCHAR(255) REFERENCES users(id),
  scheduled_at TIMESTAMP NOT NULL,
  duration INTEGER NOT NULL,
  status VARCHAR(50),
  type VARCHAR(50),
  price INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id VARCHAR(255) PRIMARY KEY,
  consultation_id VARCHAR(255) REFERENCES consultations(id),
  sender_id VARCHAR(255) REFERENCES users(id),
  content TEXT NOT NULL,
  type VARCHAR(50),
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE documents (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50),
  url VARCHAR(255),
  size INTEGER,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
  id VARCHAR(255) PRIMARY KEY,
  lawyer_id VARCHAR(255) REFERENCES lawyers(id),
  client_id VARCHAR(255) REFERENCES users(id),
  rating INTEGER NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- API Keys table (for developers)
CREATE TABLE api_keys (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id),
  key_type VARCHAR(50),
  api_key VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  permissions JSON,
  rate_limit INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_lawyers_specialization ON lawyers(specialization);
CREATE INDEX idx_cases_status ON cases(status);
CREATE INDEX idx_consultations_scheduled_at ON consultations(scheduled_at);
CREATE INDEX idx_messages_consultation_id ON messages(consultation_id);
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_reviews_lawyer_id ON reviews(lawyer_id);