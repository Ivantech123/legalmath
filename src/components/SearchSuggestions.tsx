import React from 'react';
import { User } from 'lucide-react';
import { Lawyer } from '../types';

interface SearchSuggestionsProps {
  suggestions: Lawyer[];
  onSelect: (lawyer: Lawyer) => void;
  visible: boolean;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({ suggestions, onSelect, visible }) => {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto">
      {suggestions.map(lawyer => (
        <button
          key={lawyer.id}
          onClick={() => onSelect(lawyer)}
          className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            {lawyer.image ? (
              <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover" />
            ) : (
              <User className="w-full h-full p-2 bg-gray-100 dark:bg-gray-600" />
            )}
          </div>
          <div>
            <div className="font-medium text-gray-900 dark:text-white">{lawyer.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{lawyer.specialization}</div>
          </div>
          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {lawyer.location}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchSuggestions;