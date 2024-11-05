import { Lawyer } from '../types';

export const getLawyers = async (): Promise<Lawyer[]> => {
  // В реальном приложении здесь будет API запрос
  return [
    {
      id: '1',
      name: 'Анна Сергеева',
      specialization: 'Семейное право',
      experience: 12,
      rating: 4.9,
      reviewCount: 156,
      location: 'Москва',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500',
      bio: 'Специализируюсь на семейных спорах, разводах и разделе имущества. Более 200 успешных дел. Опыт работы в Московском городском суде.',
      cases: 234,
      hourlyRate: 5000,
      consultationPrice: 3000,
      phone: '+7 (495) 123-45-67',
      email: 'a.sergeeva@legalmatch.ru',
      tags: ['Разводы', 'Алименты', 'Раздел имущества', 'Опека'],
      education: [
        {
          institution: 'МГУ им. М.В. Ломоносова',
          degree: 'Юриспруденция',
          year: '2010'
        },
        {
          institution: 'Российская академия адвокатуры',
          degree: 'Семейное право',
          year: '2012'
        }
      ],
      services: [
        { name: 'Первичная консультация', price: 3000 },
        { name: 'Составление иска', price: 15000 },
        { name: 'Представительство в суде', price: 50000 },
        { name: 'Медиация', price: 8000 }
      ],
      geography: {
        city: 'Москва',
        region: 'Московская область',
        courts: [
          'Пресненский районный суд',
          'Тверской районный суд',
          'Московский городской суд',
          'Бабушкинский районный суд'
        ],
        remoteWork: true
      },
      courtCases: [
        {
          title: 'О расторжении брака и разделе имущества',
          description: 'Успешное представление интересов клиента в споре о разделе совместно нажитого имущества стоимостью более 50 млн рублей',
          court: 'Пресненский районный суд',
          date: '2023-12-15',
          result: 'Выиграно',
          category: 'Семейные споры'
        },
        {
          title: 'Об определении места жительства ребенка',
          description: 'Защита интересов матери в споре об определении места жительства двоих детей',
          court: 'Тверской районный суд',
          date: '2023-10-20',
          result: 'Выиграно',
          category: 'Семейные споры'
        }
      ],
      schedule: {
        workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        workHours: { start: '09:00', end: '18:00' },
        consultationDuration: 60,
        breakTime: { start: '13:00', end: '14:00' }
      },
      languages: ['Русский', 'English'],
      verificationStatus: 'verified',
      responseRate: 98,
      socialMedia: [
        {
          type: 'telegram',
          username: 'sergeeva_family_law',
          url: 'https://t.me/sergeeva_family_law'
        }
      ]
    },
    {
      id: '2',
      name: 'Дмитрий Волков',
      specialization: 'Корпоративное право',
      experience: 15,
      rating: 4.8,
      reviewCount: 203,
      location: 'Санкт-Петербург',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?auto=format&fit=crop&q=80&w=500',
      bio: 'Специализируюсь на корпоративных спорах, сделках M&A и защите бизнеса. Опыт работы в крупнейших юридических фирмах.',
      cases: 312,
      hourlyRate: 7000,
      consultationPrice: 5000,
      phone: '+7 (812) 234-56-78',
      email: 'd.volkov@legalmatch.ru',
      tags: ['Корпоративное право', 'M&A', 'Арбитраж', 'Банкротство'],
      education: [
        {
          institution: 'СПбГУ',
          degree: 'Юриспруденция',
          year: '2008'
        },
        {
          institution: 'London School of Economics',
          degree: 'Corporate Law',
          year: '2010'
        }
      ],
      services: [
        { name: 'Консультация', price: 5000 },
        { name: 'Правовой аудит', price: 100000 },
        { name: 'Сопровождение сделок', price: 150000 },
        { name: 'Арбитраж', price: 200000 }
      ],
      geography: {
        city: 'Санкт-Петербург',
        region: 'Ленинградская область',
        courts: [
          'Арбитражный суд г. Санкт-Петербурга',
          'Арбитражный суд Ленинградской области'
        ],
        remoteWork: true
      },
      courtCases: [
        {
          title: 'Корпоративный спор',
          description: 'Успешная защита интересов акционера в споре о размывании доли в уставном капитале',
          court: 'Арбитражный суд г. Санкт-Петербурга',
          date: '2023-11-20',
          result: 'Выиграно',
          category: 'Корпоративные споры'
        }
      ],
      schedule: {
        workDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        workHours: { start: '10:00', end: '19:00' },
        consultationDuration: 90,
        breakTime: { start: '14:00', end: '15:00' }
      },
      languages: ['Русский', 'English', 'Deutsch'],
      verificationStatus: 'verified',
      responseRate: 95,
      socialMedia: [
        {
          type: 'telegram',
          username: 'volkov_corporate',
          url: 'https://t.me/volkov_corporate'
        }
      ]
    }
  ];
};

export const getLawyerById = async (id: string): Promise<Lawyer | null> => {
  const lawyers = await getLawyers();
  return lawyers.find(lawyer => lawyer.id === id) || null;
};

export const searchLawyers = async (query: string): Promise<Lawyer[]> => {
  const lawyers = await getLawyers();
  const lowerQuery = query.toLowerCase();
  
  return lawyers.filter(lawyer => 
    lawyer.name.toLowerCase().includes(lowerQuery) ||
    lawyer.specialization.toLowerCase().includes(lowerQuery) ||
    lawyer.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

export const filterLawyers = async (filters: {
  specialization?: string;
  location?: string;
  priceRange?: string;
  experience?: string;
}): Promise<Lawyer[]> => {
  const lawyers = await getLawyers();
  
  return lawyers.filter(lawyer => {
    if (filters.specialization && lawyer.specialization !== filters.specialization) {
      return false;
    }
    
    if (filters.location && lawyer.location !== filters.location) {
      return false;
    }
    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (lawyer.consultationPrice < min || lawyer.consultationPrice > max)) {
        return false;
      }
      if (!max && lawyer.consultationPrice < min) {
        return false;
      }
    }
    
    if (filters.experience) {
      const [min, max] = filters.experience.split('-').map(Number);
      if (max && (lawyer.experience < min || lawyer.experience > max)) {
        return false;
      }
      if (!max && lawyer.experience < min) {
        return false;
      }
    }
    
    return true;
  });
};

export const getTopLawyers = async (limit: number = 5): Promise<Lawyer[]> => {
  const lawyers = await getLawyers();
  return lawyers
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};