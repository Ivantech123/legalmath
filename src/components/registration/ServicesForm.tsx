import React, { useState } from 'react';
import { Plus, X, Bot, DollarSign, Sparkles } from 'lucide-react';
import { Service } from '../../types';

interface ServicesFormProps {
  services: Service[];
  onChange: (services: Service[]) => void;
}

const ServicesForm: React.FC<ServicesFormProps> = ({ services, onChange }) => {
  const [newService, setNewService] = useState<Service>({
    name: '',
    price: 0
  });

  const addService = () => {
    if (!newService.name || !newService.price) return;
    
    onChange([...services, newService]);
    setNewService({ name: '', price: 0 });
  };

  const removeService = (index: number) => {
    onChange(services.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-400">AI-оптимизация цен</h3>
          <p className="text-sm text-gray-400">
            AI анализирует рынок и помогает установить конкурентные цены
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="p-2 bg-gray-700/50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Услуга
                </label>
                <div className="mt-1 text-gray-200">{service.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Стоимость
                </label>
                <div className="mt-1 text-gray-200">
                  <span className="text-green-400">{service.price}₽</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeService(index)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              value={newService.name}
              onChange={(e) => setNewService(prev => ({
                ...prev,
                name: e.target.value
              }))}
              placeholder="Название услуги"
              className="form-input pl-10"
            />
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                type="number"
                min="0"
                step="500"
                value={newService.price}
                onChange={(e) => setNewService(prev => ({
                  ...prev,
                  price: parseInt(e.target.value)
                }))}
                placeholder="Стоимость"
                className="form-input pl-10"
              />
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="button"
              onClick={addService}
              disabled={!newService.name || !newService.price}
              className="btn btn-primary p-2"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <DollarSign className="w-6 h-6 text-green-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Гибкое ценообразование</h3>
          <p className="text-sm text-gray-400">
            Указывайте разные цены для разных типов услуг
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesForm;