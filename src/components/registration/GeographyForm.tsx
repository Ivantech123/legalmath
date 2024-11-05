import React from 'react';
import { MapPin, Bot, Globe, X } from 'lucide-react';
import { Geography } from '../../types';

interface GeographyFormProps {
  geography: Geography;
  onChange: (geography: Geography) => void;
}

const GeographyForm: React.FC<GeographyFormProps> = ({ geography, onChange }) => {
  const addCourt = (court: string) => {
    if (!court) return;
    onChange({
      ...geography,
      courts: [...geography.courts, court]
    });
  };

  const removeCourt = (index: number) => {
    onChange({
      ...geography,
      courts: geography.courts.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-анализ географии</h3>
          <p className="text-sm text-gray-400">
            AI поможет оптимизировать географию работы для привлечения клиентов
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Город</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={geography.city}
              onChange={(e) => onChange({ ...geography, city: e.target.value })}
              className="form-input pl-10"
              placeholder="Основной город работы"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Регион</label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={geography.region}
              onChange={(e) => onChange({ ...geography, region: e.target.value })}
              className="form-input pl-10"
              placeholder="Регион деятельности"
              required
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label mb-3">Суды</label>
        <div className="space-y-3">
          {geography.courts.map((court, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <span className="flex-1 text-gray-300">{court}</span>
              <button
                type="button"
                onClick={() => removeCourt(index)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Введите название суда"
              className="form-input pl-10"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCourt((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
            />
          </div>
        </div>
        <p className="form-hint mt-2">
          Нажмите Enter для добавления суда
        </p>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="remoteWork"
          checked={geography.remoteWork}
          onChange={(e) => onChange({ ...geography, remoteWork: e.target.checked })}
          className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
        />
        <label htmlFor="remoteWork" className="text-gray-300">
          Готов работать удаленно
        </label>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <Globe className="w-6 h-6 text-blue-400 flex-shrink-0" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Расширяйте географию</h3>
          <p className="text-sm text-gray-400">
            Больше судов в профиле увеличивает шансы на получение новых клиентов
          </p>
        </div>
      </div>
    </div>
  );
};

export default GeographyForm;