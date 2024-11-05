import React, { useState } from 'react';
import { User, Mail, Lock, Bot, Code, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DeveloperRegistrationForm: React.FC = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    purpose: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        'developer',
        {
          company: formData.company,
          purpose: formData.purpose
        }
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-900 rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-green-500/20 rounded-xl">
          <Code className="w-8 h-8 text-green-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Регистрация разработчика
          </h2>
          <p className="text-gray-400">
            Доступ к API и инструментам разработки
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-8">
        <Shield className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-blue-400">Безопасный доступ</h3>
          <p className="text-sm text-gray-400">
            После регистрации вы получите API ключ для доступа к сервисам
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="form-label">ФИО</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="form-input pl-10"
              placeholder="Иванов Иван Иванович"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="form-input pl-10"
              placeholder="example@company.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="form-input pl-10"
              placeholder="Минимум 8 символов"
              required
              minLength={8}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Компания</label>
          <div className="relative">
            <Bot className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="form-input pl-10"
              placeholder="Название компании"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Цель использования API</label>
          <textarea
            value={formData.purpose}
            onChange={(e) => setFormData(prev => ({ ...prev, purpose: e.target.value }))}
            className="form-textarea"
            placeholder="Опишите, как вы планируете использовать API"
            rows={4}
            required
          />
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 text-red-400 rounded-lg animate-shake">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-lg text-white font-medium
            transition-all duration-300 transform
            ${loading
              ? 'bg-green-600/50 cursor-wait'
              : 'bg-green-600 hover:bg-green-500 hover:-translate-y-0.5 hover:shadow-lg'
            }
          `}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Регистрируясь, вы соглашаетесь с условиями использования API и политикой конфиденциальности
        </p>
      </div>
    </div>
  );
};

export default DeveloperRegistrationForm;