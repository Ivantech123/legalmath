// Add to existing types
export interface SocialMedia {
  type: 'telegram' | 'whatsapp' | 'vk' | 'instagram';
  username: string;
  url: string;
}

// Update Lawyer interface
export interface Lawyer {
  // ... existing fields ...
  socialMedia?: SocialMedia[];
}

export const SOCIAL_MEDIA_CONFIGS = {
  telegram: {
    prefix: 'https://t.me/',
    icon: 'MessageCircle',
    label: 'Telegram'
  },
  whatsapp: {
    prefix: 'https://wa.me/',
    icon: 'Phone',
    label: 'WhatsApp'
  },
  vk: {
    prefix: 'https://vk.com/',
    icon: 'AtSign',
    label: 'VKontakte'
  },
  instagram: {
    prefix: 'https://instagram.com/',
    icon: 'Image',
    label: 'Instagram'
  }
} as const;