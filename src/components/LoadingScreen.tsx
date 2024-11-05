import React, { useEffect, useState } from 'react';
import { Scale, Bot, Sparkles, Shield } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Инициализация...');

  useEffect(() => {
    const texts = [
      'Инициализация...',
      'Подключение к AI...',
      'Загрузка интерфейса...',
      'Почти готово...'
    ];

    let currentTextIndex = 0;
    const textInterval = setInterval(() => {
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      setLoadingText(texts[currentTextIndex]);
    }, 2000);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center z-50">
      <div className="relative max-w-sm w-full mx-auto px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-300"></div>
        </div>

        {/* Main Logo */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-32 h-32 mx-auto">
            <Scale className="w-32 h-32 text-blue-500 animate-float" />
            
            {/* Orbiting Elements */}
            <div className="absolute inset-0 animate-spin-slow">
              <Bot className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-8 text-purple-400" />
            </div>
            
            <div className="absolute inset-0 animate-spin-slow-reverse">
              <Sparkles className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-8 h-8 text-blue-400" />
            </div>
            
            <div className="absolute inset-0 animate-spin-slow delay-300">
              <Shield className="absolute top-1/2 -right-6 -translate-y-1/2 w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3 mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight animate-slide-up">
            Legal<span className="text-blue-500">Match</span>
          </h1>
          <p className="text-gray-400 animate-slide-up delay-200">{loadingText}</p>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-bar"></div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <span className="text-sm text-gray-400 animate-pulse">{progress}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;