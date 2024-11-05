import React, { useState } from 'react';
import { User, Mail, Lock, Bot, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ClientRegistrationForm: React.FC = () => {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    position: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Only include company and position if they are not empty
      const additionalData = {
        ...(formData.company && { company: formData.company }),
        ...(formData.position && { position: formData.position })
      };

      await register(
        formData.email,
        formData.password,
        formData.name,
        'client',
        additionalData
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full mx-auto bg-gray-900 rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <User className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Регистрация клиента</h2>
          <p className="text-gray-400">Найдите подходящего юриста с помощью AI</p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-8">
        <Bot className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-помощник</h3>
          <p className="text-sm text-gray-400">
            После регистрации AI поможет подобрать юриста
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="form-label">
            ФИО <span className="text-red-400">*</span>
          </label>
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
          <label className="form-label">
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="form-input pl-10"
              placeholder="example@email.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Пароль <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="form-input pl-10"
              placeholder="Минимум 6 символов"
              required
              minLength={6}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">
            Подтвердите пароль <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="form-input pl-10"
              placeholder="Повторите пароль"
              required
              minLength={6}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Компания</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="form-input pl-10"
              placeholder="Необязательно"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Должность</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="form-input pl-10"
              placeholder="Необязательно"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-lg text-white font-medium
            transition-all duration-300 transform
            ${loading
              ? 'bg-blue-600/50 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg'
            }
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Регистрация...</span>
            </div>
          ) : (
            'Зарегистрироваться'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-400">
          Регистрируясь, вы соглашаетесь с условиями использования и политикой конфиденциальности
        </p>
      </div>
    </div>
  );
};

export default ClientRegistrationForm;