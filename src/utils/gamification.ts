import { LEVELS } from '../data/gamification';
import type { LevelDef, BadgeId, AppStats } from '../types';

export function getLevelForXp(xp: number): LevelDef {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (xp >= level.xpRequired) {
      current = level;
    } else {
      break;
    }
  }
  return current;
}

export function getNextLevel(xp: number): LevelDef | null {
  for (const level of LEVELS) {
    if (xp < level.xpRequired) {
      return level;
    }
  }
  return null;
}

export function getLevelProgress(xp: number): { current: number; max: number; percent: number } {
  const currentLevel = getLevelForXp(xp);
  const nextLevel = getNextLevel(xp);
  if (!nextLevel) {
    return { current: xp, max: xp, percent: 100 };
  }
  const current = xp - currentLevel.xpRequired;
  const max = nextLevel.xpRequired - currentLevel.xpRequired;
  return { current, max, percent: Math.round((current / max) * 100) };
}

export function checkBadges(stats: AppStats): BadgeId[] {
  const earned: BadgeId[] = [];
  if (stats.totalWordsLearned >= 1) earned.push('first_word');
  if (stats.streak >= 3) earned.push('streak_3');
  if (stats.totalWordsLearned >= 20) earned.push('words_20');
  if (stats.streak >= 7) earned.push('streak_7');
  if (stats.totalWordsLearned >= 50) earned.push('words_50');
  if (stats.grammarCompleted >= 10) {
    const accuracy = stats.grammarCorrect / stats.grammarCompleted;
    if (accuracy >= 0.9) earned.push('accuracy_90');
  }
  if (stats.totalXp >= 500) earned.push('xp_500');
  if (stats.totalWordsLearned >= 100) earned.push('words_100');
  // 'all_topics' checked externally (needs topic data)
  return earned;
}

export function getTodayISO(): string {
  return new Date().toISOString().split('T')[0];
}
