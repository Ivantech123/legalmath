import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, MapPin, Briefcase, DollarSign, Clock } from 'lucide-react';
import { ru } from '../i18n/ru';
import SearchSuggestions from './SearchSuggestions';
import { Lawyer } from '../types';

interface FiltersProps {
  filters: {
    specialization: string;
    location: string;
    priceRange: string;
    experience: string;
  };
  onFilterChange: (key: string, value: string) => void;
  lawyers: Lawyer[];
}

const Filters: React.FC<FiltersProps> = ({ filters, onFilterChange, lawyers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Lawyer[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = lawyers.filter(lawyer =>
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, lawyers]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-700/50 space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={ru.filters.search}
            className="w-full pl-12 pr-4 py-3 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500"
          />
          <SearchSuggestions
            suggestions={suggestions}
            onSelect={(lawyer) => {
              setSearchTerm(lawyer.name);
              setShowSuggestions(false);
            }}
            visible={showSuggestions}
          />
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200
            ${showFilters 
              ? 'bg-blue-600 text-white'
              : 'bg-gray-900/50 text-gray-300 hover:bg-gray-700/50'
            }
          `}
        >
          <SlidersHorizontal className="w-5 h-5" />
          {ru.filters.filters}
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-700/50 animate-fade-in">
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.specialization}
              onChange={(e) => onFilterChange('specialization', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">{ru.filters.allSpecializations}</option>
              {['Семейное право', 'Корпоративное право', 'Уголовное право'].map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.location}
              onChange={(e) => onFilterChange('location', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">{ru.filters.allLocations}</option>
              {['Москва', 'Санкт-Петербург', 'Казань'].map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.priceRange}
              onChange={(e) => onFilterChange('priceRange', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">{ru.filters.allPrices}</option>
              <option value="0-3000">До 3000₽</option>
              <option value="3000-5000">3000₽ - 5000₽</option>
              <option value="5000+">От 5000₽</option>
            </select>
          </div>

          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={filters.experience}
              onChange={(e) => onFilterChange('experience', e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900/50 text-gray-100 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
            >
              <option value="">{ru.filters.allExperience}</option>
              <option value="0-5">До 5 лет</option>
              <option value="5-10">5-10 лет</option>
              <option value="10+">Более 10 лет</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;