import React, { useState } from 'react';
import { Mail, Lock, Bot, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface LoginFormProps {
  onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl shadow-xl p-8 animate-fade-in">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <Shield className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            Вход в систему
          </h2>
          <p className="text-gray-400">
            Войдите в свой аккаунт
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-8">
        <Bot className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-ассистент</h3>
          <p className="text-sm text-gray-400">
            После входа AI поможет в работе с платформой
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="form-label">Email</label>
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
          <label className="form-label">Пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="form-input pl-10"
              placeholder="Введите пароль"
              required
            />
          </div>
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
              ? 'bg-blue-600/50 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg'
            }
          `}
        >
          {loading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
          Забыли пароль?
        </button>
      </div>
    </div>
  );
};

export default LoginForm;