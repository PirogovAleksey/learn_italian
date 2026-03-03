import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { checkBadges, getTodayISO } from '../utils/gamification';
import type { AppStats, BadgeId } from '../types';

const DEFAULT_STATS: AppStats = {
  totalWordsLearned: 0,
  totalReviews: 0,
  grammarCompleted: 0,
  grammarCorrect: 0,
  streak: 0,
  longestStreak: 0,
  lastStudyDate: '',
  totalXp: 0,
  earnedBadges: [],
  dailyWordsLearned: 0,
  dailyGrammarDone: 0,
  dailyReviews: 0,
  dailyDate: '',
};

export function useGameProgress() {
  const [stats, setStats] = useLocalStorage<AppStats>('game_stats', DEFAULT_STATS);

  const ensureDailyReset = useCallback((s: AppStats): AppStats => {
    const today = getTodayISO();
    if (s.dailyDate !== today) {
      return { ...s, dailyWordsLearned: 0, dailyGrammarDone: 0, dailyReviews: 0, dailyDate: today };
    }
    return s;
  }, []);

  const updateStreak = useCallback((s: AppStats): AppStats => {
    const today = getTodayISO();
    if (s.lastStudyDate === today) return s;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO = yesterday.toISOString().split('T')[0];

    let newStreak: number;
    if (s.lastStudyDate === yesterdayISO) {
      newStreak = s.streak + 1;
    } else {
      newStreak = 1;
    }

    return {
      ...s,
      streak: newStreak,
      longestStreak: Math.max(s.longestStreak, newStreak),
      lastStudyDate: today,
    };
  }, []);

  const refreshBadges = useCallback((s: AppStats): AppStats => {
    const newBadges = checkBadges(s);
    const allBadges = Array.from(new Set([...s.earnedBadges, ...newBadges]));
    return { ...s, earnedBadges: allBadges as BadgeId[] };
  }, []);

  const addXp = useCallback((amount: number) => {
    setStats(prev => {
      let s = ensureDailyReset(prev);
      s = { ...s, totalXp: s.totalXp + amount };
      s = updateStreak(s);
      s = refreshBadges(s);
      return s;
    });
  }, [setStats, ensureDailyReset, updateStreak, refreshBadges]);

  const recordWordLearned = useCallback((xp: number) => {
    setStats(prev => {
      let s = ensureDailyReset(prev);
      s = {
        ...s,
        totalWordsLearned: s.totalWordsLearned + 1,
        totalReviews: s.totalReviews + 1,
        totalXp: s.totalXp + xp,
        dailyWordsLearned: s.dailyWordsLearned + 1,
        dailyReviews: s.dailyReviews + 1,
      };
      s = updateStreak(s);
      s = refreshBadges(s);
      return s;
    });
  }, [setStats, ensureDailyReset, updateStreak, refreshBadges]);

  const recordReview = useCallback((xp: number) => {
    setStats(prev => {
      let s = ensureDailyReset(prev);
      s = {
        ...s,
        totalReviews: s.totalReviews + 1,
        totalXp: s.totalXp + xp,
        dailyReviews: s.dailyReviews + 1,
      };
      s = updateStreak(s);
      s = refreshBadges(s);
      return s;
    });
  }, [setStats, ensureDailyReset, updateStreak, refreshBadges]);

  const recordGrammar = useCallback((correct: boolean) => {
    setStats(prev => {
      let s = ensureDailyReset(prev);
      s = {
        ...s,
        grammarCompleted: s.grammarCompleted + 1,
        grammarCorrect: s.grammarCorrect + (correct ? 1 : 0),
        totalXp: s.totalXp + (correct ? 10 : 0),
        dailyGrammarDone: s.dailyGrammarDone + 1,
      };
      s = updateStreak(s);
      s = refreshBadges(s);
      return s;
    });
  }, [setStats, ensureDailyReset, updateStreak, refreshBadges]);

  const resetProgress = useCallback(() => {
    // Clear all app localStorage keys
    const keys = Object.keys(localStorage).filter(k => k.startsWith('italian_learn_'));
    keys.forEach(k => localStorage.removeItem(k));
    setStats(DEFAULT_STATS);
  }, [setStats]);

  return {
    stats,
    addXp,
    recordWordLearned,
    recordReview,
    recordGrammar,
    resetProgress,
  };
}
