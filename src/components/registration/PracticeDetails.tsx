import React, { useState } from 'react';
import { Plus, X, Link as LinkIcon, Bot, Sparkles, AlertCircle } from 'lucide-react';

interface PracticeDetailsProps {
  data: {
    specialization: string;
    experience: number;
    bio: string;
    hourlyRate: number;
    consultationPrice: number;
    kadArbitrLinks: string[];
  };
  onChange: (data: Partial<PracticeDetailsProps['data']>) => void;
}

const PracticeDetails: React.FC<PracticeDetailsProps> = ({ data, onChange }) => {
  const [newLink, setNewLink] = useState('');
  const [linkError, setLinkError] = useState<string>('');

  const validateKadArbitrLink = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      // Check if it's a valid kad.arbitr.ru URL
      if (!urlObj.hostname.endsWith('kad.arbitr.ru')) {
        setLinkError('Ссылка должна быть с сайта kad.arbitr.ru');
        return false;
      }
      // Check if it's a card URL
      if (!urlObj.pathname.toLowerCase().startsWith('/card/')) {
        setLinkError('Ссылка должна вести на карточку дела (/Card/...)');
        return false;
      }
      // Check if URL contains case number
      if (urlObj.pathname.split('/').length < 3) {
        setLinkError('Неверный формат ссылки на дело');
        return false;
      }
      setLinkError('');
      return true;
    } catch (e) {
      setLinkError('Неверный формат ссылки');
      return false;
    }
  };

  const addKadArbitrLink = () => {
    if (!newLink) return;
    
    if (validateKadArbitrLink(newLink)) {
      // Check for duplicates
      if (data.kadArbitrLinks.includes(newLink)) {
        setLinkError('Эта ссылка уже добавлена');
        return;
      }
      
      onChange({
        kadArbitrLinks: [...data.kadArbitrLinks, newLink]
      });
      setNewLink('');
      setLinkError('');
    }
  };

  const removeKadArbitrLink = (index: number) => {
    onChange({
      kadArbitrLinks: data.kadArbitrLinks.filter((_, i) => i !== index)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKadArbitrLink();
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="p-3 bg-blue-500/20 rounded-full">
          <Bot className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-blue-400">AI-оптимизация</h3>
          <p className="text-sm text-gray-400">
            AI анализирует вашу практику для эффективного привлечения клиентов
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Специализация</label>
          <select
            value={data.specialization}
            onChange={(e) => onChange({ specialization: e.target.value })}
            className="form-select"
            required
          >
            <option value="">Выберите специализацию</option>
            <option value="Семейное право">Семейное право</option>
            <option value="Корпоративное право">Корпоративное право</option>
            <option value="Уголовное право">Уголовное право</option>
            <option value="Гражданское право">Гражданское право</option>
            <option value="Арбитраж">Арбитраж</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Опыт работы (лет)</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="50"
              value={data.experience}
              onChange={(e) => onChange({ experience: parseInt(e.target.value) })}
              className="form-input"
              required
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Почасовая ставка (₽)</label>
          <input
            type="number"
            min="0"
            step="500"
            value={data.hourlyRate}
            onChange={(e) => onChange({ hourlyRate: parseInt(e.target.value) })}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Стоимость консультации (₽)</label>
          <input
            type="number"
            min="0"
            step="500"
            value={data.consultationPrice}
            onChange={(e) => onChange({ consultationPrice: parseInt(e.target.value) })}
            className="form-input"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">О себе</label>
        <textarea
          value={data.bio}
          onChange={(e) => onChange({ bio: e.target.value })}
          rows={4}
          className="form-textarea"
          placeholder="Расскажите о вашем опыте и подходе к работе..."
          required
        />
        <p className="form-hint">
          AI использует это описание для подбора подходящих клиентов
        </p>
      </div>

      <div className="space-y-4">
        <label className="form-label">Ссылки на дела в kad.arbitr.ru</label>
        
        <div className="space-y-3">
          {data.kadArbitrLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <LinkIcon className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-blue-400 hover:text-blue-300 truncate transition-colors"
              >
                {link}
              </a>
              <button
                type="button"
                onClick={() => removeKadArbitrLink(index)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="space-y-2">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={newLink}
                  onChange={(e) => {
                    setNewLink(e.target.value);
                    if (linkError) setLinkError('');
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder="https://kad.arbitr.ru/Card/..."
                  className={`form-input pl-10 ${linkError ? 'border-red-500 focus:ring-red-500' : ''}`}
                />
              </div>
              <button
                type="button"
                onClick={addKadArbitrLink}
                disabled={!newLink}
                className="btn btn-primary p-2 flex-shrink-0"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {linkError && (
              <div className="flex items-center gap-2 text-sm text-red-400 animate-shake">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{linkError}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50">
            <LinkIcon className="w-5 h-5 text-gray-400" />
            <p className="text-sm text-gray-400">
              Формат: https://kad.arbitr.ru/Card/НОМЕР_ДЕЛА
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetails;