import React, { useState } from 'react';
import { Phone, QrCode, X, ChevronRight, Download, Bot } from 'lucide-react';

const MobileAppPromo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('mobilePromoShown', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900 z-[100] flex items-center justify-center p-4">
      <div className="relative max-w-sm w-full bg-gray-800 rounded-2xl p-6 animate-slide-up">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {/* App Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-4 shadow-lg animate-float">
              <Bot className="w-full h-full text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
              <Phone className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Мобильное приложение
          </h2>
          <p className="text-gray-400">
            Установите наше приложение для более удобной работы с платформой
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {[
            'Быстрый доступ к юристам',
            'Push-уведомления о сообщениях',
            'Удобный чат с AI-ассистентом',
            'Сканирование документов'
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ChevronRight className="w-5 h-5 text-blue-400" />
              <span className="text-gray-300">{feature}</span>
            </div>
          ))}
        </div>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-xl mb-6 mx-auto w-48 h-48 relative overflow-hidden">
          <QrCode className="w-full h-full text-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
        </div>

        {/* Download Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => window.open('https://apps.apple.com/app/legalmatch')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Скачать для iOS</span>
          </button>
          
          <button
            onClick={() => window.open('https://play.google.com/store/apps/details?id=com.legalmatch')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl transition-colors"
          >
            <Download className="w-5 h-5" />
            <span>Скачать для Android</span>
          </button>
        </div>

        {/* Skip Link */}
        <button
          onClick={handleClose}
          className="mt-4 text-sm text-gray-400 hover:text-white transition-colors w-full text-center"
        >
          Продолжить в браузере
        </button>
      </div>
    </div>
  );
};

export default MobileAppPromo;