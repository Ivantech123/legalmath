import React from 'react';
import { Search, Filter, Star, MapPin, MessageSquare, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ClientFeed: React.FC = () => {
  const { user } = useAuth();

  const lawyers = [
    {
      id: '1',
      name: 'Анна Сергеева',
      specialization: 'Семейное право',
      rating: 4.9,
      reviews: 156,
      location: 'Москва',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500',
      price: 3000,
      online: true
    },
    {
      id: '2',
      name: 'Дмитрий Волков',
      specialization: 'Корпоративное право',
      rating: 4.8,
      reviews: 203,
      location: 'Санкт-Петербург',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80&w=500',
      price: 5000,
      online: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Поиск юриста по имени или специализации..."
              className="w-full pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="p-3 bg-gray-800 text-gray-400 hover:text-white rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['Все специализации', 'Семейное право', 'Корпоративное право', 'Уголовное право'].map((filter, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg border border-gray-700 hover:border-gray-600 whitespace-nowrap transition-colors"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* AI Assistant Banner */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Bot className="w-8 h-8 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white mb-1">AI-помощник</h2>
            <p className="text-gray-400">
              Опишите вашу ситуацию, и AI подберет подходящего юриста
            </p>
          </div>
          <button className="ml-auto px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors">
            Начать
          </button>
        </div>
      </div>

      {/* Lawyers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lawyers.map(lawyer => (
          <div key={lawyer.id} className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 group">
            {/* Image */}
            <div className="relative h-48">
              <img
                src={lawyer.image}
                alt={lawyer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-semibold text-white mb-1">{lawyer.name}</h3>
                <p className="text-gray-300">{lawyer.specialization}</p>
              </div>
              {lawyer.online && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/20">
                  Онлайн
                </div>
              )}
            </div>

            {/* Info */}
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">{lawyer.rating}</span>
                  <span className="text-gray-400">({lawyer.reviews})</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{lawyer.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                <div>
                  <div className="text-sm text-gray-400">Консультация</div>
                  <div className="text-lg font-semibold text-white">{lawyer.price}₽</div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors group">
                  <MessageSquare className="w-4 h-4" />
                  <span>Написать</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientFeed;