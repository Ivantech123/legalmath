import React from 'react';
import { Star, Briefcase, MessageCircle, Phone, AtSign, Image, Bot, Sparkles } from 'lucide-react';
import { Lawyer } from '../types';
import { useLanguage } from '../context/LanguageContext';
import AIAnalysis from './ai/AIAnalysis';

interface LawyerCardProps {
  lawyer: Lawyer;
  onViewProfile: () => void;
  index: number;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer, onViewProfile, index }) => {
  const { t } = useLanguage();

  return (
    <div 
      className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-700/50 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        {/* Image Section */}
        <div className="relative h-48 sm:h-64">
          <img
            src={lawyer.image}
            alt={lawyer.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
          
          {/* AI Badge */}
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30">
              <Bot className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-purple-300">AI-анализ</span>
            </div>
          </div>

          {/* Lawyer Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{lawyer.name}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-4 h-4 text-blue-400" />
                <span>{lawyer.specialization}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 backdrop-blur-sm rounded-full">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">{lawyer.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        {lawyer.socialMedia && lawyer.socialMedia.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-700/50 bg-gray-800/50">
            <div className="flex gap-4">
              {lawyer.socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
                >
                  {social.type === 'telegram' && <MessageCircle className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />}
                  {social.type === 'whatsapp' && <Phone className="w-5 h-5 text-green-400 group-hover:text-green-300" />}
                  {social.type === 'vk' && <AtSign className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />}
                  {social.type === 'instagram' && <Image className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">{lawyer.experience}</div>
              <div className="text-sm text-gray-400">{t.common.years}</div>
            </div>
            <div className="text-center p-3 bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">{lawyer.cases}+</div>
              <div className="text-sm text-gray-400">{t.common.cases}</div>
            </div>
            <div className="text-center p-3 bg-gray-800 rounded-xl">
              <div className="text-2xl font-bold text-white mb-1">{lawyer.reviewCount}</div>
              <div className="text-sm text-gray-400">{t.common.reviews}</div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-medium text-purple-300">AI-рекомендация</h3>
            </div>
            <p className="text-gray-300 text-sm line-clamp-2">
              {lawyer.bio}
            </p>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
            <div>
              <div className="text-sm text-gray-400">{t.common.initialConsultation}</div>
              <div className="text-2xl font-bold text-blue-400">{lawyer.consultationPrice}₽</div>
            </div>
            <button
              onClick={onViewProfile}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span className="flex items-center gap-2">
                <span>Записаться</span>
                <MessageCircle className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerCard;