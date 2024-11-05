import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Briefcase, 
  ChevronRight, 
  ChevronLeft,
  Bot,
  Shield,
  Book,
  MapPin,
  Scale,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DocumentVerification from '../registration/DocumentVerification';
import PracticeDetails from '../registration/PracticeDetails';
import EducationForm from '../registration/EducationForm';
import GeographyForm from '../registration/GeographyForm';

interface LawyerRegistrationModalProps {
  onClose: () => void;
}

const steps = [
  { id: 1, title: 'Основное', icon: User, color: 'emerald' },
  { id: 2, title: 'Верификация', icon: Shield, color: 'emerald' },
  { id: 3, title: 'Практика', icon: Briefcase, color: 'blue' },
  { id: 4, title: 'Образование', icon: Book, color: 'blue' },
  { id: 5, title: 'География', icon: MapPin, color: 'purple' }
];

const LawyerRegistrationModal: React.FC<LawyerRegistrationModalProps> = ({ onClose }) => {
  const { register } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    specialization: '',
    experience: 0,
    bio: '',
    hourlyRate: 0,
    consultationPrice: 0,
    education: [],
    geography: {
      city: '',
      region: '',
      courts: [],
      remoteWork: false
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep < steps.length) {
      if (validateStep()) {
        setCurrentStep(prev => prev + 1);
      }
      return;
    }

    if (!validateStep()) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        'lawyer',
        {
          phone: formData.phone,
          specialization: formData.specialization,
          experience: formData.experience,
          bio: formData.bio,
          hourlyRate: formData.hourlyRate,
          consultationPrice: formData.consultationPrice,
          education: formData.education,
          geography: formData.geography,
          verified
        }
      );
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка регистрации');
      setLoading(false);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.name && formData.phone;
      case 2:
        return verified;
      case 3:
        return formData.specialization && formData.experience > 0;
      case 4:
        return formData.education.length > 0;
      case 5:
        return formData.geography.city && formData.geography.region;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
          </div>
        );

      case 2:
        return (
          <DocumentVerification
            role="lawyer"
            onVerificationComplete={(isVerified) => setVerified(isVerified)}
          />
        );

      case 3:
        return (
          <PracticeDetails
            data={{
              specialization: formData.specialization,
              experience: formData.experience,
              bio: formData.bio,
              hourlyRate: formData.hourlyRate,
              consultationPrice: formData.consultationPrice
            }}
            onChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
          />
        );

      case 4:
        return (
          <EducationForm
            education={formData.education}
            onChange={(education) => setFormData(prev => ({ ...prev, education }))}
          />
        );

      case 5:
        return (
          <GeographyForm
            geography={formData.geography}
            onChange={(geography) => setFormData(prev => ({ ...prev, geography }))}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-gray-800 shadow-xl animate-scale-in">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Scale className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Регистрация юриста</h2>
              <p className="text-gray-400">Шаг {currentStep} из {steps.length}</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      transition-colors duration-200
                      ${currentStep === step.id
                        ? `bg-${step.color}-600 text-white`
                        : currentStep > step.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-700 text-gray-400'
                      }
                    `}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-2
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

          {/* AI Assistant Notice */}
          <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20 mb-8">
            <Bot className="w-6 h-6 text-blue-400" />
            <div>
              <h3 className="text-sm font-medium text-blue-400">AI-помощник</h3>
              <p className="text-sm text-gray-400">
                AI поможет создать привлекательный профиль для клиентов
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStep()}

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 text-red-400 rounded-lg animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-700">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Назад</span>
                </button>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`
                  flex items-center gap-2 px-6 py-2 rounded-lg text-white font-medium ml-auto
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
                    <span>Регистрация...</span>
                  </>
                ) : currentStep === steps.length ? (
                  <>
                    <span>Завершить регистрацию</span>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerRegistrationModal;