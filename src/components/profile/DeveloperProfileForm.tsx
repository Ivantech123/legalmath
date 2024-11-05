import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Bot, 
  Shield, 
  AlertCircle,
  ChevronRight,
  Code,
  Building,
  Globe,
  Key
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface DeveloperProfileFormProps {
  onComplete: () => void;
}

const DeveloperProfileForm: React.FC<DeveloperProfileFormProps> = ({ onComplete }) => {
  const { user, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Info
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    website: user?.website || '',
    
    // Project Info
    projectName: user?.projectName || '',
    projectDescription: user?.projectDescription || '',
    projectType: user?.projectType || '',
    
    // API Usage
    expectedRequests: user?.expectedRequests || '1000',
    aiFeatures: user?.aiFeatures || false,
    
    // Technical Details
    programmingLanguages: user?.programmingLanguages || [],
    frameworks: user?.frameworks || [],
    
    // Security
    ipWhitelist: user?.ipWhitelist || [],
    allowedDomains: user?.allowedDomains || []
  });

  const steps = [
    { id: 1, title: 'Основная информация', icon: User },
    { id: 2, title: 'О проекте', icon: Code },
    { id: 3, title: 'Технические детали', icon: Globe },
    { id: 4, title: 'Безопасность', icon: Shield }
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
                    placeholder="example@company.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Компания</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                <label className="form-label">Веб-сайт</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="form-input pl-10"
                    placeholder="https://example.com"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Название проекта</label>
              <input
                type="text"
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                className="form-input"
                placeholder="Название вашего проекта"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Описание проекта</label>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                className="form-textarea"
                rows={4}
                placeholder="Опишите ваш проект и как вы планируете использовать API..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Тип проекта</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
                className="form-select"
                required
              >
                <option value="">Выберите тип проекта</option>
                <option value="web">Веб-приложение</option>
                <option value="mobile">Мобильное приложение</option>
                <option value="desktop">Десктопное приложение</option>
                <option value="integration">Интеграция</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Ожидаемое количество запросов в месяц</label>
              <select
                value={formData.expectedRequests}
                onChange={(e) => setFormData(prev => ({ ...prev, expectedRequests: e.target.value }))}
                className="form-select"
                required
              >
                <option value="1000">До 1,000</option>
                <option value="5000">1,000 - 5,000</option>
                <option value="10000">5,000 - 10,000</option>
                <option value="50000">10,000 - 50,000</option>
                <option value="100000">Более 50,000</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.aiFeatures}
                onChange={(e) => setFormData(prev => ({ ...prev, aiFeatures: e.target.checked }))}
                className="form-checkbox"
              />
              <span className="text-gray-300">
                Планирую использовать AI функции
              </span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Используемые языки программирования</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'JavaScript',
                  'TypeScript',
                  'Python',
                  'Java',
                  'C#',
                  'PHP',
                  'Go',
                  'Ruby',
                  'Swift'
                ].map(lang => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.programmingLanguages.includes(lang)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            programmingLanguages: [...prev.programmingLanguages, lang]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            programmingLanguages: prev.programmingLanguages.filter(l => l !== lang)
                          }));
                        }
                      }}
                      className="form-checkbox"
                    />
                    <span className="text-gray-300">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Фреймворки</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  'React',
                  'Vue',
                  'Angular',
                  'Node.js',
                  'Django',
                  'Laravel',
                  'Spring',
                  'ASP.NET',
                  'Express'
                ].map(framework => (
                  <label
                    key={framework}
                    className="flex items-center gap-2 p-3 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={formData.frameworks.includes(framework)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            frameworks: [...prev.frameworks, framework]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            frameworks: prev.frameworks.filter(f => f !== framework)
                          }));
                        }
                      }}
                      className="form-checkbox"
                    />
                    <span className="text-gray-300">{framework}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Разрешенные IP адреса</label>
              <textarea
                value={formData.ipWhitelist.join('\n')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  ipWhitelist: e.target.value.split('\n').filter(ip => ip.trim())
                }))}
                className="form-textarea"
                rows={4}
                placeholder="Введите IP адреса (по одному на строку)"
              />
              <p className="form-hint">
                Оставьте пустым для доступа с любого IP
              </p>
            </div>

            <div className="form-group">
              <label className="form-label">Разрешенные домены</label>
              <textarea
                value={formData.allowedDomains.join('\n')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  allowedDomains: e.target.value.split('\n').filter(domain => domain.trim())
                }))}
                className="form-textarea"
                rows={4}
                placeholder="Введите домены (по одному на строку)"
              />
              <p className="form-hint">
                Оставьте пустым для доступа с любого домена
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <Key className="w-6 h-6 text-blue-400" />
              <div>
                <h3 className="text-sm font-medium text-blue-400">API ключи</h3>
                <p className="text-sm text-gray-400">
                  После заполнения профиля вы получите API ключи для разработки и продакшена
                </p>
              </div>
            </div>
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
            AI поможет настроить оптимальные параметры для вашего проекта
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

export default DeveloperProfileForm;