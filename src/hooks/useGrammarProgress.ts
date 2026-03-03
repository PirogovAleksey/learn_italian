import { useCallback, useMemo } from 'react';
import type { GrammarProgress } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useGrammarProgress() {
  const [progressMap, setProgressMap] = useLocalStorage<Record<string, GrammarProgress>>(
    'grammar_progress',
    {}
  );

  const recordAnswer = useCallback(
    (exerciseId: string, correct: boolean) => {
      setProgressMap((prev) => {
        const existing = prev[exerciseId];
        return {
          ...prev,
          [exerciseId]: {
            exerciseId,
            completed: true,
            correct: correct,
            attempts: (existing?.attempts || 0) + 1,
            lastAttempt: Date.now(),
          },
        };
      });
    },
    [setProgressMap]
  );

  const getProgress = useCallback(
    (exerciseId: string): GrammarProgress | undefined => {
      return progressMap[exerciseId];
    },
    [progressMap]
  );

  const stats = useMemo(() => {
    const entries = Object.values(progressMap);
    return {
      completed: entries.filter((e) => e.completed).length,
      correct: entries.filter((e) => e.correct).length,
      total: entries.length,
    };
  }, [progressMap]);

  return { recordAnswer, getProgress, stats, progressMap };
}
