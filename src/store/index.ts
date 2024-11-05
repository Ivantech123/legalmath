import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AIProvider, AIConfig, CustomAIAssistant } from '../types/ai';

interface NotificationSettings {
  email?: boolean;
  messages?: boolean;
  consultations?: boolean;
  ai?: boolean;
}

interface Settings {
  theme: 'light' | 'dark';
  language: 'ru' | 'en';
  notifications: NotificationSettings;
  ai: {
    providers: {
      [key in AIProvider]?: AIConfig;
    };
    activeProvider: AIProvider;
    customAssistants: CustomAIAssistant[];
  };
}

interface State {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  updateAIProvider: (provider: AIProvider, config: AIConfig) => void;
  setActiveProvider: (provider: AIProvider) => void;
  addCustomAssistant: (assistant: CustomAIAssistant) => void;
  updateCustomAssistant: (id: string, updates: Partial<CustomAIAssistant>) => void;
  deleteCustomAssistant: (id: string) => void;
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      settings: {
        theme: 'dark',
        language: 'ru',
        notifications: {
          email: true,
          messages: true,
          consultations: true,
          ai: true
        },
        ai: {
          providers: {},
          activeProvider: 'gemini',
          customAssistants: []
        }
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
      updateAIProvider: (provider, config) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ai: {
              ...state.settings.ai,
              providers: {
                ...state.settings.ai.providers,
                [provider]: config
              }
            }
          }
        })),
      setActiveProvider: (provider) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ai: {
              ...state.settings.ai,
              activeProvider: provider
            }
          }
        })),
      addCustomAssistant: (assistant) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ai: {
              ...state.settings.ai,
              customAssistants: [...state.settings.ai.customAssistants, assistant]
            }
          }
        })),
      updateCustomAssistant: (id, updates) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ai: {
              ...state.settings.ai,
              customAssistants: state.settings.ai.customAssistants.map(a =>
                a.id === id ? { ...a, ...updates } : a
              )
            }
          }
        })),
      deleteCustomAssistant: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ai: {
              ...state.settings.ai,
              customAssistants: state.settings.ai.customAssistants.filter(a => a.id !== id)
            }
          }
        }))
    }),
    {
      name: 'legal-match-storage'
    }
  )
);