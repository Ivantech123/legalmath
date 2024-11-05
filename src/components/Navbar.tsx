import React from 'react';
import { Scale, LogOut, MessageSquare, Bell, Sparkles, UserCog, LayoutGrid } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { useNavigate } from 'react-router-dom';
import MessagesModal from './MessagesModal';
import NotificationsModal from './NotificationsModal';
import AIAssistantModal from './ai/AIAssistantModal';
import SettingsModal from './SettingsModal';
import RoleSwitcher from './RoleSwitcher';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { showRoleSwitcher, setShowRoleSwitcher } = useRole();
  const navigate = useNavigate();
  const [showMessagesModal, setShowMessagesModal] = React.useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = React.useState(false);
  const [showAIModal, setShowAIModal] = React.useState(false);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);

  const handleLogout = () => {
    logout();
  };

  const handleFeedClick = () => {
    // Check if user has required data based on role
    if (user?.role === 'lawyer' && !user.specialization) {
      alert('Для доступа к ленте необходимо заполнить профиль юриста');
      return;
    }
    if (user?.role === 'developer' && !user.company) {
      alert('Для доступа к ленте необходимо заполнить данные разработчика');
      return;
    }
    if (user?.role === 'client' && !user.name) {
      alert('Для доступа к ленте необходимо заполнить профиль');
      return;
    }

    navigate('/feed');
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">LegalMatch</span>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <>
                  <button
                    onClick={handleFeedClick}
                    className="search-bar relative px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowAIModal(true)}
                    className="ai-assistant relative px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowMessagesModal(true)}
                    className="messages relative px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    onClick={() => setShowNotificationsModal(true)}
                    className="notifications relative px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  <button
                    onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
                    className={`
                      p-2 rounded-lg transition-colors role-switcher-trigger
                      ${showRoleSwitcher
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white'
                      }
                    `}
                  >
                    <UserCog className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <MessagesModal 
        isOpen={showMessagesModal}
        onClose={() => setShowMessagesModal(false)}
      />

      <NotificationsModal
        isOpen={showNotificationsModal}
        onClose={() => setShowNotificationsModal(false)}
      />

      <AIAssistantModal
        isOpen={showAIModal}
        onClose={() => setShowAIModal(false)}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />

      <RoleSwitcher />
    </>
  );
};

export default Navbar;