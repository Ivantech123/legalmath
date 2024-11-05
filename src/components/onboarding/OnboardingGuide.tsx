import React, { useState, useEffect } from 'react';
import { Bot, ChevronRight, ChevronLeft, Search, MessageSquare, Calendar, FileText, X, Shield } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  element: string;
  icon: typeof Search;
}

const OnboardingGuide: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  const steps: OnboardingStep[] = [
    {
      id: 'search',
      title: 'Поиск юристов',
      description: 'Используйте умный поиск с AI для подбора подходящего специалиста',
      element: '.search-bar',
      icon: Search
    },
    {
      id: 'ai',
      title: 'AI Ассистент',
      description: 'Общайтесь с AI для получения рекомендаций и анализа документов',
      element: '.ai-assistant',
      icon: Bot
    },
    {
      id: 'messages',
      title: 'Сообщения',
      description: 'Общайтесь с юристами через встроенный чат',
      element: '.messages',
      icon: MessageSquare
    },
    {
      id: 'notifications',
      title: 'Уведомления',
      description: 'Получайте уведомления о важных событиях',
      element: '.notifications',
      icon: Calendar
    }
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const updatePosition = () => {
        const element = document.querySelector(steps[currentStep].element);
        if (element) {
          const rect = element.getBoundingClientRect();
          const scrollX = window.scrollX || window.pageXOffset;
          const scrollY = window.scrollY || window.pageYOffset;

          setRobotPosition({
            x: rect.left + scrollX - 100,
            y: rect.top + scrollY - 20
          });

          // Подсветка текущего элемента
          element.classList.add('ring-4', 'ring-blue-500', 'ring-opacity-50', 'z-50');
        }
      };

      // Очистка подсветки предыдущего элемента
      document.querySelectorAll('.ring-4').forEach(el => {
        el.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50', 'z-50');
      });

      updatePosition();

      // Обновление позиции при скролле и ресайзе
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [currentStep, isVisible]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleClose = () => {
    // Очистка подсветки всех элементов
    document.querySelectorAll('.ring-4').forEach(el => {
      el.classList.remove('ring-4', 'ring-blue-500', 'ring-opacity-50', 'z-50');
    });
    
    setIsVisible(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  if (!isVisible) return null;

  const CurrentIcon = steps[currentStep].icon;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[100]" />

      {/* Robot */}
      <div
        className="fixed z-[101] transition-all duration-500 ease-in-out"
        style={{
          transform: `translate(${robotPosition.x}px, ${robotPosition.y}px)`
        }}
      >
        <div className="relative">
          {/* Robot Body */}
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-4 animate-float shadow-lg">
            <Bot className="w-full h-full text-white" />
          </div>
          
          {/* Speech Bubble */}
          <div className="absolute top-0 left-full ml-4 bg-white rounded-xl p-4 shadow-lg w-80 animate-fade-in">
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-8 border-transparent border-r-white" />
            
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CurrentIcon className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {steps[currentStep].title}
              </h3>
            </div>
            
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 z-[101] animate-slide-up">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${currentStep === index
                    ? 'w-8 bg-blue-500'
                    : currentStep > index
                    ? 'bg-blue-200'
                    : 'bg-gray-300'
                  }
                `}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <button
            onClick={handleClose}
            className="ml-4 p-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
          <Shield className="w-4 h-4" />
          <span>Нажмите ESC чтобы пропустить обучение</span>
        </div>
      </div>
    </>
  );
};

export default OnboardingGuide;