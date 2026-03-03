import type { LevelDef, BadgeDef, DailyQuest } from '../types';

export const LEVELS: LevelDef[] = [
  { level: 1, name: 'Principiante', subtitle: 'Початківець', icon: '🌱', xpRequired: 0 },
  { level: 2, name: 'Studente', subtitle: 'Студент', icon: '📝', xpRequired: 100 },
  { level: 3, name: 'Apprendista', subtitle: 'Учень', icon: '📖', xpRequired: 250 },
  { level: 4, name: 'Esploratore', subtitle: 'Дослідник', icon: '🔭', xpRequired: 500 },
  { level: 5, name: 'Conoscitore', subtitle: 'Знавець', icon: '🎓', xpRequired: 1000 },
  { level: 6, name: 'Maestro', subtitle: 'Майстер', icon: '👑', xpRequired: 2000 },
];

export const BADGES: BadgeDef[] = [
  { id: 'first_word', name: 'Перший крок', description: 'Перше слово', icon: '🌱' },
  { id: 'streak_3', name: 'На вогні', description: 'Стрік 3 дні', icon: '🔥' },
  { id: 'words_20', name: 'Книголюб', description: '20 слів', icon: '📚' },
  { id: 'streak_7', name: 'Чемпіон', description: 'Стрік 7 днів', icon: '🏆' },
  { id: 'words_50', name: 'Знавець', description: '50 слів', icon: '💎' },
  { id: 'accuracy_90', name: 'Снайпер', description: '90% точність', icon: '🎯' },
  { id: 'xp_500', name: '500 XP', description: 'Набрати 500', icon: '⭐' },
  { id: 'all_topics', name: 'Мандрівник', description: 'Всі теми', icon: '🌍' },
  { id: 'words_100', name: 'Maestro', description: '100 слів', icon: '👑' },
];

export const DAILY_QUESTS: DailyQuest[] = [
  { id: 'daily_words', text: 'Вивчи 5 нових слів', xpReward: 20, target: 5, type: 'words' },
  { id: 'daily_grammar', text: 'Виконай граматичну вправу', xpReward: 20, target: 1, type: 'grammar' },
  { id: 'daily_reviews', text: 'Повтори 10 карток', xpReward: 30, target: 10, type: 'reviews' },
];

export const DAILY_QUEST_BONUS_XP = 50;

// XP rewards per difficulty
export const XP_PER_DIFFICULTY: Record<number, number> = {
  0: 0,   // Не знаю
  3: 5,   // Важко
  4: 10,  // Добре
  5: 15,  // Легко
};

export const XP_DECK_COMPLETE_BONUS = 25;
