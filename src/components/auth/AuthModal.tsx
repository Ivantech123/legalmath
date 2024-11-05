import React, { useState } from 'react';
import { Mail, Lock, User, X, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface AuthModalProps {
  type: 'login' | 'register';
  role?: UserRole;
  onClose: () => void;
  onTypeChange: (type: 'login' | 'register') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ type, role = 'client', onClose, onTypeChange }) => {
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (type === 'login') {
        await login(formData.email, formData.password);
      } else {
        await register(formData.email, formData.password, formData.name, role);
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-900 rounded-2xl max-w-md w-full border border-gray-800 shadow-xl animate-slide-up">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">
              {type === 'login' ? 'Вход' : 'Регистрация'}
              {type === 'register' && role !== 'client' && ` ${role === 'lawyer' ? 'юриста' : 'разработчика'}`}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {type === 'register' && (
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
            )}

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
                  placeholder="Минимум 6 символов"
                  required
                  minLength={6}
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
                  : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-1 hover:shadow-lg hover:animate-glow'
                }
              `}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>{type === 'login' ? 'Вход...' : 'Регистрация...'}</span>
                </div>
              ) : (
                type === 'login' ? 'Войти' : 'Зарегистрироваться'
              )}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => onTypeChange(type === 'login' ? 'register' : 'login')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                {type === 'login'
                  ? 'Нет аккаунта? Зарегистрируйтесь'
                  : 'Уже есть аккаунт? Войдите'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;