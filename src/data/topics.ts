import type { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'greetings',
    name: 'Привітання',
    icon: '👋',
    description: 'Базові привітання та прощання',
  },
  {
    id: 'restaurant',
    name: 'Ресторан',
    icon: '🍝',
    description: 'Замовлення їжі та напоїв',
  },
  {
    id: 'travel',
    name: 'Подорожі',
    icon: '✈️',
    description: 'Транспорт, напрямки, готель',
  },
  {
    id: 'shopping',
    name: 'Покупки',
    icon: '🛍️',
    description: 'Магазини, ціни, одяг',
  },
  {
    id: 'numbers',
    name: 'Числа',
    icon: '🔢',
    description: 'Числа, дати, час',
  },
  {
    id: 'family',
    name: "Сім'я",
    icon: '👨‍👩‍👧‍👦',
    description: "Родинні зв'язки та стосунки",
  },
  {
    id: 'acquaintance',
    name: 'Знайомство',
    icon: '🤝',
    description: 'Представлення та знайомство',
  },
  {
    id: 'emergency',
    name: 'Екстрені ситуації',
    icon: '🆘',
    description: 'Допомога, здоров\'я, безпека',
  },
];
