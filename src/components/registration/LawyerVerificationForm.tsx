import React, { useState } from 'react';
import { Shield, Upload, Check, AlertCircle } from 'lucide-react';
import { verifyDocument } from '../../services/verificationService';

interface LawyerVerificationFormProps {
  onComplete: (data: any) => void;
}

const LawyerVerificationForm: React.FC<LawyerVerificationFormProps> = ({ onComplete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    // Основная информация
    specialization: '',
    experience: '',
    licenseNumber: '',
    
    // Образование
    education: [{
      institution: '',
      degree: '',
      year: '',
      specialization: ''
    }],
    
    // Опыт работы
    workExperience: [{
      company: '',
      position: '',
      startYear: '',
      endYear: '',
      description: ''
    }],
    
    // Документы
    documents: {
      license: null as File | null,
      diploma: null as File | null,
      passport: null as File | null
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Проверка документов
      if (!formData.documents.license || !formData.documents.diploma) {
        throw new Error('Необходимо загрузить все обязательные документы');
      }

      // Верификация документов
      const licenseVerification = await verifyDocument(formData.documents.license);
      const diplomaVerification = await verifyDocument(formData.documents.diploma);

      if (!licenseVerification.valid || !diplomaVerification.valid) {
        throw new Error('Документы не прошли проверку');
      }

      // Передаем данные для обновления роли
      onComplete({
        ...formData,
        verificationStatus: 'verified',
        documents: {
          license: licenseVerification.data,
          diploma: diplomaVerification.data
        }
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка верификации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Shield className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">Верификация юриста</h3>
          <p className="text-sm text-gray-400">
            Для работы на платформе необходимо подтвердить квалификацию
          </p>
        </div>
      </div>

      {/* Основная информация */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Основная информация</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Специализация</label>
            <select
              value={formData.specialization}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                specialization: e.target.value
              }))}
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
              onChange={(e) => setFormData(prev => ({
                ...prev,
                experience: e.target.value
              }))}
              className="form-input"
              required
              min="0"
              max="50"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Номер адвокатского удостоверения</label>
          <input
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              licenseNumber: e.target.value
            }))}
            className="form-input"
            required
          />
        </div>
      </div>

      {/* Образование */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Образование</h3>
        
        {formData.education.map((edu, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Учебное заведение</label>
              <input
                type="text"
                value={edu.institution}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].institution = e.target.value;
                  setFormData(prev => ({ ...prev, education: newEducation }));
                }}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Специальность</label>
              <input
                type="text"
                value={edu.specialization}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].specialization = e.target.value;
                  setFormData(prev => ({ ...prev, education: newEducation }));
                }}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Степень</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].degree = e.target.value;
                  setFormData(prev => ({ ...prev, education: newEducation }));
                }}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Год окончания</label>
              <input
                type="number"
                value={edu.year}
                onChange={(e) => {
                  const newEducation = [...formData.education];
                  newEducation[index].year = e.target.value;
                  setFormData(prev => ({ ...prev, education: newEducation }));
                }}
                className="form-input"
                required
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Опыт работы */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Опыт работы</h3>
        
        {formData.workExperience.map((exp, index) => (
          <div key={index} className="grid grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Компания</label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...formData.workExperience];
                  newExperience[index].company = e.target.value;
                  setFormData(prev => ({ ...prev, workExperience: newExperience }));
                }}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Должность</label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => {
                  const newExperience = [...formData.workExperience];
                  newExperience[index].position = e.target.value;
                  setFormData(prev => ({ ...prev, workExperience: newExperience }));
                }}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Год начала</label>
              <input
                type="number"
                value={exp.startYear}
                onChange={(e) => {
                  const newExperience = [...formData.workExperience];
                  newExperience[index].startYear = e.target.value;
                  setFormData(prev => ({ ...prev, workExperience: newExperience }));
                }}
                className="form-input"
                required
                min="1950"
                max={new Date().getFullYear()}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Год окончания</label>
              <input
                type="number"
                value={exp.endYear}
                onChange={(e) => {
                  const newExperience = [...formData.workExperience];
                  newExperience[index].endYear = e.target.value;
                  setFormData(prev => ({ ...prev, workExperience: newExperience }));
                }}
                className="form-input"
                min="1950"
                max={new Date().getFullYear()}
              />
              <p className="form-hint">Оставьте пустым, если это текущее место работы</p>
            </div>

            <div className="col-span-2 form-group">
              <label className="form-label">Описание</label>
              <textarea
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...formData.workExperience];
                  newExperience[index].description = e.target.value;
                  setFormData(prev => ({ ...prev, workExperience: newExperience }));
                }}
                className="form-textarea"
                rows={3}
                required
              />
            </div>
          </div>
        ))}
      </div>

      {/* Документы */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Документы</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group">
            <label className="form-label">Адвокатское удостоверение</label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, license: file }
                    }));
                  }
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                className="form-input"
                required
              />
              <Upload className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Диплом</label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({
                      ...prev,
                      documents: { ...prev.documents, diploma: file }
                    }));
                  }
                }}
                accept=".pdf,.jpg,.jpeg,.png"
                className="form-input"
                required
              />
              <Upload className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
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
            ? 'bg-gray-600 cursor-wait'
            : 'bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg'
          }
        `}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span>Проверка документов...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-5 h-5" />
            <span>Отправить на проверку</span>
          </div>
        )}
      </button>
    </form>
  );
};

export default LawyerVerificationForm;