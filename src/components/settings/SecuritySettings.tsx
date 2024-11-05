import React, { useState } from 'react';
import { Lock, Shield, AlertCircle, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const SecuritySettings: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Новые пароли не совпадают');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Имитация обновления пароля
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Ошибка при смене пароля');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Shield className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Безопасность аккаунта</h3>
          <p className="text-sm text-gray-400">
            Регулярно меняйте пароль для защиты ваших данных
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="form-label">Текущий пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="form-input pl-10"
              placeholder="Введите текущий пароль"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Новый пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
              className="form-input pl-10"
              placeholder="Минимум 8 символов"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Подтвердите новый пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="form-input pl-10"
              placeholder="Повторите новый пароль"
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-500/10 text-green-400 rounded-lg">
            <Check className="w-5 h-5 flex-shrink-0" />
            <p>Пароль успешно изменен</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`
            w-full py-3 rounded-lg text-white font-medium
            transition-all duration-300 transform
            ${loading
              ? 'bg-gray-600 cursor-wait'
              : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg'
            }
          `}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Сохранение...</span>
            </div>
          ) : (
            'Изменить пароль'
          )}
        </button>
      </form>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
        <Shield className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Двухфакторная аутентификация</h3>
          <p className="text-sm text-gray-400">
            Дополнительный уровень защиты для вашего аккаунта
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;