import React, { useEffect, useState } from 'react';
import { MapPin, Star, Award, Clock, Briefcase, Phone, Mail, Book, Gavel, ScrollText, MapPinned, Calendar, X, ChevronRight, Bot, Sparkles } from 'lucide-react';
import { Lawyer } from '../types';
import { ru } from '../i18n/ru';
import AIAnalysisButton from './AIAnalysisButton';
import AIAnalysisResult from './AIAnalysisResult';

interface LawyerDetailModalProps {
  lawyer: Lawyer;
  isOpen: boolean;
  onClose: () => void;
}

const LawyerDetailModal: React.FC<LawyerDetailModalProps> = ({ lawyer, isOpen, onClose }) => {
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [scheduleData, setScheduleData] = useState({
    date: '',
    time: '',
    comment: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    alert('Консультация успешно запланирована! Мы отправим вам подтверждение на email.');
    setShowScheduleForm(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full mx-auto my-8 border border-gray-800 shadow-2xl animate-scale-in">
        {showScheduleForm ? (
          <div className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Запись на консультацию</h3>
                  <p className="text-sm text-gray-400">Юрист: {lawyer.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowScheduleForm(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-full">
                <Bot className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-400">AI-ассистент</h3>
                <p className="text-sm text-gray-400">
                  AI поможет подобрать оптимальное время для консультации
                </p>
              </div>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label">Дата</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      required
                      min={new Date().toISOString().split('T')[0]}
                      value={scheduleData.date}
                      onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                      className="form-input pl-10"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Время</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      required
                      value={scheduleData.time}
                      onChange={(e) => setScheduleData(prev => ({ ...prev, time: e.target.value }))}
                      className="form-select pl-10"
                    >
                      <option value="">Выберите время</option>
                      {Array.from({ length: 8 }, (_, i) => i + 10).map(hour => (
                        <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Комментарий</label>
                <div className="relative">
                  <ScrollText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    value={scheduleData.comment}
                    onChange={(e) => setScheduleData(prev => ({ ...prev, comment: e.target.value }))}
                    className="form-textarea pl-10"
                    rows={3}
                    placeholder="Опишите кратко ваш вопрос..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="btn btn-primary flex items-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Записаться</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="border-t border-gray-800 mt-8 pt-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-gray-400">{ru.common.initialConsultation}</span>
                <div className="text-2xl font-bold text-blue-400">{lawyer.consultationPrice}₽</div>
              </div>
              <button
                onClick={() => setShowScheduleForm(true)}
                className="btn btn-primary flex items-center gap-2 group"
              >
                <Calendar className="w-5 h-5" />
                <span>Записаться на консультацию</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerDetailModal;