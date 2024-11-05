import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Book, 
  DollarSign,
  Save,
  Upload,
  Bot,
  Shield,
  Clock,
  Calendar,
  FileText,
  Globe,
  MessageSquare,
  Settings,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../store';
import SocialMediaForm from '../registration/SocialMediaForm';
import EducationForm from '../registration/EducationForm';
import GeographyForm from '../registration/GeographyForm';
import CourtCasesForm from '../registration/CourtCasesForm';
import ServicesForm from '../registration/ServicesForm';

const LawyerProfileSettings: React.FC = () => {
  const { user } = useAuth();
  const { settings } = useStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

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
    customPricing: user?.customPricing || false,
    
    // Schedule
    workDays: user?.workDays || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    workHours: user?.workHours || { start: '09:00', end: '18:00' },
    consultationDuration: user?.consultationDuration || 60,
    breakTime: user?.breakTime || { start: '13:00', end: '14:00' },
    
    // Communication
    preferredContactMethod: user?.preferredContactMethod || 'chat',
    languages: user?.languages || ['Русский'],
    responseTime: user?.responseTime || '2h',
    
    // Privacy
    profileVisibility: user?.profileVisibility || 'public',
    showRating: user?.showRating || true,
    showReviews: user?.showReviews || true,
    showCases: user?.showCases || true,
    
    // Notifications
    emailNotifications: settings?.notifications?.email || true,
    smsNotifications: settings?.notifications?.sms || false,
    consultationReminders: settings?.notifications?.consultations || true,
    marketingEmails: settings?.notifications?.marketing || false,
    
    // AI Features
    aiAssistant: settings?.ai?.enabled || true,
    aiAnalysis: settings?.ai?.analysis || true,
    aiRecommendations: settings?.ai?.recommendations || true,
    
    // Documents & Verification
    verificationStatus: user?.verificationStatus || 'verified',
    documents: user?.documents || [],
    licenses: user?.licenses || [],
    
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
    specializations: user?.specializations || [],
    expertise: user?.expertise || [],
    
    // Social & Reviews
    socialMedia: user?.socialMedia || [],
    reviews: user?.reviews || [],
    rating: user?.rating || 0,
    badges: user?.badges || []
  });

  const tabs = [
    { id: 'general', name: 'Основная информация', icon: User },
    { id: 'professional', name: 'Профессиональная информация', icon: Briefcase },
    { id: 'schedule', name: 'Расписание', icon: Calendar },
    { id: 'pricing', name: 'Стоимость услуг', icon: DollarSign },
    { id: 'location', name: 'Локация и доступность', icon: MapPin },
    { id: 'communication', name: 'Коммуникация', icon: MessageSquare },
    { id: 'documents', name: 'Документы', icon: FileText },
    { id: 'privacy', name: 'Приватность', icon: Shield },
    { id: 'notifications', name: 'Уведомления', icon: Bell },
    { id: 'ai', name: 'AI настройки', icon: Bot }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Имитация сохранения
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
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
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Языки</label>
                <select
                  multiple
                  value={formData.languages}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value);
                    setFormData(prev => ({ ...prev, languages: values }));
                  }}
                  className="form-select h-32"
                >
                  <option value="Русский">Русский</option>
                  <option value="English">English</option>
                  <option value="Deutsch">Deutsch</option>
                  <option value="Français">Français</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">О себе</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                className="form-textarea"
                rows={4}
              />
            </div>
          </div>
        );

      case 'professional':
        return (
          <div className="space-y-8">
            <div className="form-group">
              <label className="form-label">Специализация</label>
              <select
                value={formData.specialization}
                onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                className="form-select"
              >
                <option value="">Выберите специализацию</option>
                <option value="Семейное право">Семейное право</option>
                <option value="Уголовное право">Уголовное право</option>
                <option value="Гражданское право">Гражданское право</option>
                <option value="Корпоративное право">Корпоративное право</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Дополнительные специализации</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  'Налоговое право',
                  'Трудовое право',
                  'Административное право',
                  'Земельное право',
                  'Авторское право',
                  'Банкротство'
                ].map(spec => (
                  <label key={spec} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.specializations.includes(spec)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData(prev => ({
                            ...prev,
                            specializations: [...prev.specializations, spec]
                          }));
                        } else {
                          setFormData(prev => ({
                            ...prev,
                            specializations: prev.specializations.filter(s => s !== spec)
                          }));
                        }
                      }}
                      className="form-checkbox"
                    />
                    <span className="text-gray-300">{spec}</span>
                  </label>
                ))}
              </div>
            </div>

            <EducationForm
              education={formData.education}
              onChange={(education) => setFormData(prev => ({ ...prev, education }))}
            />

            <CourtCasesForm
              courtCases={formData.courtCases}
              onChange={(courtCases) => setFormData(prev => ({ ...prev, courtCases }))}
            />
          </div>
        );

      case 'schedule':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="form-group">
                <label className="form-label">Рабочие дни</label>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <label key={day} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.workDays.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData(prev => ({
                              ...prev,
                              workDays: [...prev.workDays, day]
                            }));
                          } else {
                            setFormData(prev => ({
                              ...prev,
                              workDays: prev.workDays.filter(d => d !== day)
                            }));
                          }
                        }}
                        className="form-checkbox"
                      />
                      <span className="text-gray-300">
                        {day === 'Mon' && 'Понедельник'}
                        {day === 'Tue' && 'Вторник'}
                        {day === 'Wed' && 'Среда'}
                        {day === 'Thu' && 'Четверг'}
                        {day === 'Fri' && 'Пятница'}
                        {day === 'Sat' && 'Суббота'}
                        {day === 'Sun' && 'Воскресенье'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Рабочие часы</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={formData.workHours.start}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          workHours: { ...prev.workHours, start: e.target.value }
                        }))}
                        className="form-input pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={formData.workHours.end}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          workHours: { ...prev.workHours, end: e.target.value }
                        }))}
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Перерыв</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={formData.breakTime.start}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          breakTime: { ...prev.breakTime, start: e.target.value }
                        }))}
                        className="form-input pl-10"
                      />
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="time"
                        value={formData.breakTime.end}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          breakTime: { ...prev.breakTime, end: e.target.value }
                        }))}
                        className="form-input pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Длительность консультации (минут)</label>
                  <select
                    value={formData.consultationDuration}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      consultationDuration: parseInt(e.target.value)
                    }))}
                    className="form-select"
                  >
                    <option value="30">30 минут</option>
                    <option value="45">45 минут</option>
                    <option value="60">1 час</option>
                    <option value="90">1.5 часа</option>
                    <option value="120">2 часа</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
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
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.customPricing}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  customPricing: e.target.checked
                }))}
                className="form-checkbox"
              />
              <span className="text-gray-300">
                Индивидуальное ценообразование для разных типов дел
              </span>
            </div>
          </div>
        );

      case 'location':
        return (
          <GeographyForm
            geography={formData.geography}
            onChange={(geography) => setFormData(prev => ({ ...prev, geography }))}
          />
        );

      case 'communication':
        return (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Предпочтительный способ связи</label>
              <select
                value={formData.preferredContactMethod}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  preferredContactMethod: e.target.value
                }))}
                className="form-select"
              >
                <option value="chat">Чат на платформе</option>
                <option value="phone">Телефон</option>
                <option value="email">Email</option>
                <option value="video">Видеозвонок</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Среднее время ответа</label>
              <select
                value={formData.responseTime}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  responseTime: e.target.value
                }))}
                className="form-select"
              >
                <option value="30m">До 30 минут</option>
                <option value="1h">До 1 часа</option>
                <option value="2h">До 2 часов</option>
                <option value="4h">До 4 часов</option>
                <option value="24h">В течение суток</option>
              </select>
            </div>

            <SocialMediaForm
              socialMedia={formData.socialMedia}
              onChange={(socialMedia) => setFormData(prev => ({ ...prev, socialMedia }))}
            />
          </div>
        );

      case 'documents':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400" />
                <div>
                  <h3 className="text-sm font-medium text-blue-400">Статус верификации</h3>
                  <p className="text-sm text-gray-400">
                    {formData.verificationStatus === 'verified' 
                      ? 'Ваш аккаунт верифицирован'
                      : 'Требуется верификация'}
                  </p>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Загруженные документы</label>
              <div className="space-y-4">
                {formData.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-gray-200">{doc.name}</p>
                        <p className="text-sm text-gray-400">{doc.type}</p>
                      </div>
                    </div>
                    <button className="text-red-400 hover:text-red-300">
                      Удалить
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Загрузить новый документ</label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <input
                  type="file"
                  className="hidden"
                  id="document-upload"
                />
                <label
                  htmlFor="document-upload"
                  className="cursor-pointer text-blue-400 hover:text-blue-300"
                >
                  Выберите файл
                </label>
                <p className="text-sm text-gray-400 mt-2">
                  PDF, JPG или PNG до 10MB
                </p>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="form-group">
              <label className="form-label">Видимость профиля</label>
              <select
                value={formData.profileVisibility}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  profileVisibility: e.target.value
                }))}
                className="form-select"
              >
                <option value="public">Публичный</option>
                <option value="registered">Только для зарегистрированных</option>
                <option value="private">Приватный</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showRating}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    showRating: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Показывать рейтинг</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showReviews}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    showReviews: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Показывать отзывы</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.showCases}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    showCases: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Показывать дела</span>
              </label>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.emailNotifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    emailNotifications: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Email уведомления</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.smsNotifications}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    smsNotifications: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">SMS уведомления</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.consultationReminders}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    consultationReminders: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Напоминания о консультациях</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.marketingEmails}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    marketingEmails: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">Маркетинговые рассылки</span>
              </label>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="flex items-center gap-3">
                <Bot className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="text-sm font-medium text-purple-400">AI функции</h3>
                  <p className="text-sm text-gray-400">
                    Настройте работу искусственного интеллекта
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.aiAssistant}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    aiAssistant: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">AI-ассистент для общения с клиентами</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.aiAnalysis}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    aiAnalysis: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">AI-анализ документов</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.aiRecommendations}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    aiRecommendations: e.target.checked
                  }))}
                  className="form-checkbox"
                />
                <span className="text-gray-300">AI-рекомендации по ведению дел</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Settings className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Настройки профиля</h3>
          <p className="text-sm text-gray-400">
            Управляйте своим профилем и настройками
          </p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors
              ${activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            <tab.icon className="w-5 h-5" />
            <span>{tab.name}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {renderTabContent()}

        <div className="flex items-center justify-between pt-6 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">
              AI анализирует изменения для улучшения профиля
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
                <span>Сохранить изменения</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LawyerProfileSettings;