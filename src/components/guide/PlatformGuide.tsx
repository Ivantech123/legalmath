import React, { useState } from 'react';
import { 
  Sparkles, 
  MessageSquare, 
  Search, 
  Calendar, 
  FileText, 
  Star,
  ChevronRight,
  Bot
} from 'lucide-react';

const PlatformGuide: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Поиск юриста',
      description: 'Используйте умный поиск с AI для подбора подходящего специалиста',
      icon: Search,
      color: 'blue'
    },
    {
      title: 'Консультация',
      description: 'Запишитесь на консультацию в удобное время',
      icon: Calendar,
      color: 'green'
    },
    {
      title: 'Общение',
      description: 'Общайтесь с юристом через встроенный чат',
      icon: MessageSquare,
      color: 'purple'
    },
    {
      title: 'Документы',
      description: 'Загружайте и анализируйте документы с помощью AI',
      icon: FileText,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Добро пожаловать в LegalMatch
          </h1>
          <p className="text-xl text-gray-400">
            Давайте познакомимся с основными возможностями платформы
          </p>
        </div>

        {/* AI Assistant */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="flex items-center gap-4 p-6 bg-blue-500/10 rounded-2xl border border-blue-500/20">
            <div className="p-4 bg-blue-500/20 rounded-xl">
              <Bot className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-blue-400">AI-ассистент</h3>
              <p className="text-gray-400">
                На каждом этапе вам поможет искусственный интеллект
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`
                  relative p-6 rounded-xl border transition-all duration-300
                  ${currentStep === index
                    ? `bg-${step.color}-500/10 border-${step.color}-500/20`
                    : 'bg-gray-800/50 border-gray-700/50 hover:bg-gray-800'
                  }
                `}
              >
                <div className={`
                  p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4
                  ${currentStep === index
                    ? `bg-${step.color}-500/20`
                    : 'bg-gray-700/50'
                  }
                `}>
                  <Icon className={`
                    w-6 h-6
                    ${currentStep === index
                      ? `text-${step.color}-400`
                      : 'text-gray-400'
                    }
                  `} />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Step Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Preview */}
          <div className="bg-gray-800 rounded-xl p-6 h-[400px]">
            {/* Here would be interactive preview/demo of the current step */}
            <div className="h-full flex items-center justify-center text-gray-400">
              Интерактивная демонстрация
            </div>
          </div>

          {/* Right Column - Instructions */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-medium text-white mb-4">
                {steps[currentStep].title}
              </h3>
              
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-4 p-4 bg-gray-700/50 rounded-lg"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm text-blue-400">{item}</span>
                    </div>
                    <p className="text-gray-300">
                      Инструкция шага {item} для {steps[currentStep].title.toLowerCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                <span>Назад</span>
              </button>

              <button
                onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
                disabled={currentStep === steps.length - 1}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600"
              >
                <span>Далее</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformGuide;