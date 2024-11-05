import React, { useState } from 'react';
import { Plus, X, Gavel, Bot, Award } from 'lucide-react';
import { CourtCase } from '../../types';

interface CourtCasesFormProps {
  courtCases: CourtCase[];
  onChange: (cases: CourtCase[]) => void;
}

const CourtCasesForm: React.FC<CourtCasesFormProps> = ({ courtCases, onChange }) => {
  const [newCase, setNewCase] = useState<CourtCase>({
    title: '',
    description: '',
    court: '',
    date: '',
    result: '',
    category: ''
  });

  const addCase = () => {
    if (!newCase.title || !newCase.court || !newCase.result) return;
    
    onChange([...courtCases, newCase]);
    setNewCase({
      title: '',
      description: '',
      court: '',
      date: '',
      result: '',
      category: ''
    });
  };

  const removeCase = (index: number) => {
    onChange(courtCases.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-400">AI-анализ практики</h3>
          <p className="text-sm text-gray-400">
            AI проанализирует ваши успешные дела для привлечения релевантных клиентов
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {courtCases.map((courtCase, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-700/50 rounded-lg">
                  <Gavel className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-medium text-gray-200">{courtCase.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => removeCase(index)}
                className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">Суд</label>
                <div className="mt-1 text-gray-300">{courtCase.court}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Дата</label>
                <div className="mt-1 text-gray-300">{courtCase.date}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Результат</label>
                <div className="mt-1 text-gray-300">{courtCase.result}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">Категория</label>
                <div className="mt-1 text-gray-300">{courtCase.category}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Описание</label>
              <div className="mt-1 text-gray-300">{courtCase.description}</div>
            </div>
          </div>
        ))}

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={newCase.title}
              onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Название дела"
              className="form-input"
            />
            <input
              type="text"
              value={newCase.court}
              onChange={(e) => setNewCase(prev => ({ ...prev, court: e.target.value }))}
              placeholder="Суд"
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              value={newCase.date}
              onChange={(e) => setNewCase(prev => ({ ...prev, date: e.target.value }))}
              className="form-input"
            />
            <input
              type="text"
              value={newCase.category}
              onChange={(e) => setNewCase(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Категория дела"
              className="form-input"
            />
          </div>

          <input
            type="text"
            value={newCase.result}
            onChange={(e) => setNewCase(prev => ({ ...prev, result: e.target.value }))}
            placeholder="Результат"
            className="form-input"
          />

          <textarea
            value={newCase.description}
            onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Описание дела"
            rows={3}
            className="form-textarea"
          />

          <button
            type="button"
            onClick={addCase}
            disabled={!newCase.title || !newCase.court || !newCase.result}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить дело</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <Award className="w-6 h-6 text-yellow-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Успешные дела повышают рейтинг</h3>
          <p className="text-sm text-gray-400">
            Добавляйте успешные дела для увеличения доверия клиентов
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourtCasesForm;