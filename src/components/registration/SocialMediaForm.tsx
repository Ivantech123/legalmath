import React, { useState } from 'react';
import { MessageCircle, Phone, AtSign, Image, Plus, X, Bot, Link as LinkIcon } from 'lucide-react';
import { SocialMedia, SOCIAL_MEDIA_CONFIGS } from '../../types';

interface SocialMediaFormProps {
  socialMedia: SocialMedia[];
  onChange: (socialMedia: SocialMedia[]) => void;
}

const SocialMediaForm: React.FC<SocialMediaFormProps> = ({ socialMedia, onChange }) => {
  const [newSocial, setNewSocial] = useState<SocialMedia>({
    type: 'telegram',
    username: '',
    url: ''
  });

  const getIcon = (type: SocialMedia['type']) => {
    switch (type) {
      case 'telegram': return <MessageCircle className="w-5 h-5 text-blue-400" />;
      case 'whatsapp': return <Phone className="w-5 h-5 text-green-400" />;
      case 'vk': return <AtSign className="w-5 h-5 text-blue-400" />;
      case 'instagram': return <Image className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleAdd = () => {
    if (!newSocial.username) return;
    
    const config = SOCIAL_MEDIA_CONFIGS[newSocial.type];
    const url = `${config.prefix}${newSocial.username.replace('@', '')}`;
    
    onChange([...socialMedia, { ...newSocial, url }]);
    setNewSocial({ type: 'telegram', username: '', url: '' });
  };

  const handleRemove = (index: number) => {
    onChange(socialMedia.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
        <div className="p-3 bg-purple-500/20 rounded-full">
          <Bot className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-purple-400">AI-оптимизация контактов</h3>
          <p className="text-sm text-gray-400">
            AI поможет выбрать оптимальные каналы связи для ваших клиентов
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Existing Social Media List */}
        {socialMedia.map((social, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg group border border-gray-700/50 hover:border-gray-600/50 transition-colors"
          >
            <div className="p-2 bg-gray-700/50 rounded-lg">
              {getIcon(social.type)}
            </div>
            <div className="flex-1">
              <div className="text-gray-300">{social.username}</div>
              <a 
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <LinkIcon className="w-4 h-4" />
                <span>{social.url}</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="opacity-0 group-hover:opacity-100 p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}

        {/* Add New Social Media */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Тип контакта</label>
              <select
                value={newSocial.type}
                onChange={(e) => setNewSocial(prev => ({
                  ...prev,
                  type: e.target.value as SocialMedia['type']
                }))}
                className="form-select"
              >
                {Object.entries(SOCIAL_MEDIA_CONFIGS).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Имя пользователя</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {getIcon(newSocial.type)}
                </div>
                <input
                  type="text"
                  value={newSocial.username}
                  onChange={(e) => setNewSocial(prev => ({
                    ...prev,
                    username: e.target.value
                  }))}
                  placeholder="@username"
                  className="form-input pl-10"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={!newSocial.username}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Добавить контакт</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
        <Phone className="w-6 h-6 text-green-400" />
        <div>
          <h3 className="text-sm font-medium text-gray-200">Быстрая связь важна</h3>
          <p className="text-sm text-gray-400">
            Добавьте несколько способов связи для удобства клиентов
          </p>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaForm;