import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Bot, 
  Shield, 
  AlertCircle,
  ChevronRight,
  MapPin,
  Briefcase,
  Book,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import SocialMediaForm from '../registration/SocialMediaForm';
import EducationForm from '../registration/EducationForm';
import GeographyForm from '../registration/GeographyForm';
import CourtCasesForm from '../registration/CourtCasesForm';
import ServicesForm from '../registration/ServicesForm';

interface LawyerProfileFormProps {
  onComplete: () => void;
}

const LawyerProfileForm: React.FC<LawyerProfileFormProps> = ({ onComplete }) => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Info
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    specialization: user?.specialization || '',
    experience: user?.experience || 0,
    bio: user?.bio || '',
    
    // Pricing
    hourlyRate: user?.hourlyRate || 0,
    consultationPrice: user?.consultationPrice || 0,
    
    // Schedule
    workDays: user?.workDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workHours: user?.workHours || { start: '09:00', end: '18:00' },
    consultationDuration: user?.consultationDuration || 60,
    breakTime: user?.breakTime || { start: '13:00', end: '14:00' },
    
    // Location & Availability
    geography: user?.geography || {
      city: '',
      region: '',
      courts: [],
      remoteWork: false
    },
    
    // Professional Info
    education: user?.education || [],
    courtCases: user?.courtCases || [],
    services: user?.services || [],
    
    // Social & Reviews
    socialMedia: user?.socialMedia || []
  });

  const steps = [
    { id: 1, title: 'Основная информация', icon: User },
    { id: 2, title: 'Специализация', icon: Briefcase },
    { id: 3, title: 'Образование', icon: Book },
    { id: 4, title: 'География работы', icon: MapPin },
    { id: 5, title: 'Услуги и цены', icon: DollarSign }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await updateUserData(formData);
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка сохранения данных');
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
                    placeholder="example@email.com"
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
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">О себе</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="form-textarea"
                rows={4}
                placeholder="Расскажите о своем опыте и подходе к работе..."
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Специализация</label>
                <select
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  className="form-select"
                  required
                >
                  <option value="">Выберите специализацию</option>
                  <option value="Семейное право">Семейное право</option>
                  <option value="Уголовное право">Уголовное право</option>
                  <option value="Гражданское право">Гражданское право</option>
                  <option value="Корпоративное право">Корпоративное право</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Опыт работы (лет)</label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: parseInt(e.target.value) }))}
                  className="form-input"
                  min="0"
                  max="50"
                  required
                />
              </div>
            </div>

            <CourtCasesForm
              courtCases={formData.courtCases}
              onChange={(courtCases) => setFormData(prev => ({ ...prev, courtCases }))}
            />
          </div>
        );

      case 3:
        return (
          <EducationForm
            education={formData.education}
            onChange={(education) => setFormData(prev => ({ ...prev, education }))}
          />
        );

      case 4:
        return (
          <GeographyForm
            geography={formData.geography}
            onChange={(geography) => setFormData(prev => ({ ...prev, geography }))}
          />
        );

      case 5:
        return (
          <div className="space-y-8">
            <ServicesForm
              services={formData.services}
              onChange={(services) => setFormData(prev => ({ ...prev, services }))}
            />

            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Почасовая ставка (₽)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      hourlyRate: parseInt(e.target.value)
                    }))}
                    className="form-input pl-10"
                    min="0"
                    step="500"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Стоимость консультации (₽)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    value={formData.consultationPrice}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      consultationPrice: parseInt(e.target.value)
                    }))}
                    className="form-input pl-10"
                    min="0"
                    step="500"
                    required
                  />
                </div>
              </div>
            </div>

            <SocialMediaForm
              socialMedia={formData.socialMedia}
              onChange={(socialMedia) => setFormData(prev => ({ ...prev, socialMedia }))}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-помощник</h3>
          <p className="text-sm text-gray-400">
            AI поможет создать привлекательный профиль для клиентов
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center gap-2">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-colors duration-200
                  ${currentStep === step.id
                    ? 'bg-blue-600 text-white'
                    : currentStep > step.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                  }
                `}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-gray-400">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-0.5 transition-colors duration-200
                  ${currentStep > index + 1
                    ? 'bg-green-600'
                    : 'bg-gray-700'
                  }
                `} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {renderStep()}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-6 border-t border-gray-700">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          <span className="text-sm text-gray-400">
            {currentStep === steps.length
              ? 'Ваш профиль почти готов'
              : 'Шаг ' + currentStep + ' из ' + steps.length
            }
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Назад
            </button>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`
              flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium
              transition-all duration-200
              ${loading
                ? 'bg-gray-700 cursor-wait'
                : 'bg-blue-600 hover:bg-blue-500'
              }
            `}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                <span>Сохранение...</span>
              </>
            ) : currentStep === steps.length ? (
              <>
                <span>Завершить</span>
                <ChevronRight className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Продолжить</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LawyerProfileForm;