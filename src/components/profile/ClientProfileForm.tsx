import React, { useState } from 'react';
import { User, Mail, Phone, Upload, Save, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ClientProfileFormProps {
  onComplete: (data: any) => void;
}

const ClientProfileForm: React.FC<ClientProfileFormProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    interests: user?.interests || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onComplete(formData);
      setSuccess(true);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* AI Assistant Notice */}
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-помощник</h3>
          <p className="text-sm text-gray-400">
            AI поможет подобрать подходящего юриста на основе ваших интересов
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={user?.image || `https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt={user?.name}
              className="w-24 h-24 rounded-xl object-cover"
            />
            <button
              type="button"
              className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors"
            >
              <Upload className="w-4 h-4 text-white" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-medium text-white">Фото профиля</h3>
            <p className="text-sm text-gray-400">
              Рекомендуемый размер: 400x400px, до 2MB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">ФИО</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="form-input pl-10"
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
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Телефон</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="form-input pl-10"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Интересующие области права</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              'Семейное право',
              'Уголовное право',
              'Гражданское право',
              'Корпоративное право',
              'Трудовое право',
              'Налоговое право'
            ].map(interest => (
              <label
                key={interest}
                className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={formData.interests.includes(interest)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData(prev => ({
                        ...prev,
                        interests: [...prev.interests, interest]
                      }));
                    } else {
                      setFormData(prev => ({
                        ...prev,
                        interests: prev.interests.filter(i => i !== interest)
                      }));
                    }
                  }}
                  className="form-checkbox"
                />
                <span className="text-gray-300">{interest}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">
              AI подберет подходящих юристов
            </span>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium
              transition-all duration-200
              ${loading
                ? 'bg-gray-700 cursor-wait'
                : success
                ? 'bg-green-600'
                : 'bg-blue-600 hover:bg-blue-500'
              }
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                <span>Сохранение...</span>
              </>
            ) : success ? (
              <>
                <Save className="w-5 h-5" />
                <span>Сохранено!</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Завершить</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientProfileForm;