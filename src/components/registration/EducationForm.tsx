import React, { useState } from 'react';
import { Plus, X, GraduationCap, Bot } from 'lucide-react';
import { Education } from '../../types';

interface EducationFormProps {
  education: Education[];
  onChange: (education: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, onChange }) => {
  const [newEducation, setNewEducation] = useState<Education>({
    institution: '',
    degree: '',
    year: ''
  });

  const addEducation = () => {
    if (!newEducation.institution || !newEducation.degree || !newEducation.year) return;
    
    onChange([...education, newEducation]);
    setNewEducation({ institution: '', degree: '', year: '' });
  };

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-анализ образования</h3>
          <p className="text-sm text-gray-400">
            AI оценит ваше образование для оптимального представления клиентам
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {education.map((edu, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="p-2 bg-gray-700/50 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Учебное заведение
                </label>
                <div className="mt-1 text-gray-200">{edu.institution}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Специальность
                </label>
                <div className="mt-1 text-gray-200">{edu.degree}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Год окончания
                </label>
                <div className="mt-1 text-gray-200">{edu.year}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        <div className="grid grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              value={newEducation.institution}
              onChange={(e) => setNewEducation(prev => ({
                ...prev,
                institution: e.target.value
              }))}
              placeholder="Учебное заведение"
              className="form-input"
            />
          </div>
          <div>
            <input
              type="text"
              value={newEducation.degree}
              onChange={(e) => setNewEducation(prev => ({
                ...prev,
                degree: e.target.value
              }))}
              placeholder="Специальность"
              className="form-input"
            />
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={newEducation.year}
              onChange={(e) => setNewEducation(prev => ({
                ...prev,
                year: e.target.value
              }))}
              placeholder="Год окончания"
              className="form-input"
            />
            <button
              type="button"
              onClick={addEducation}
              disabled={!newEducation.institution || !newEducation.degree || !newEducation.year}
              className="btn btn-primary p-2"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <GraduationCap className="w-6 h-6 text-blue-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Повышайте квалификацию</h3>
          <p className="text-sm text-gray-400">
            Регулярно добавляйте информацию о новых дипломах и сертификатах
          </p>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;