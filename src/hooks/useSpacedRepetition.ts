import { useMemo, useCallback } from 'react';
import type { SM2CardData, DifficultyRating, Word } from '../types';
import { calculateSM2, createInitialCardData, isDueForReview } from '../utils/sm2';
import { useLocalStorage } from './useLocalStorage';

export function useSpacedRepetition(words: Word[]) {
  const [cardDataMap, setCardDataMap] = useLocalStorage<Record<string, SM2CardData>>(
    'sm2_cards',
    {}
  );

  const [totalReviews, setTotalReviews] = useLocalStorage<number>('total_reviews', 0);

  // Get or create card data for a word
  const getCardData = useCallback(
    (wordId: string): SM2CardData => {
      return cardDataMap[wordId] || createInitialCardData(wordId);
    },
    [cardDataMap]
  );

  // Cards due for review
  const dueCards = useMemo(() => {
    return words.filter((word) => {
      const card = getCardData(word.id);
      return isDueForReview(card);
    });
  }, [words, getCardData]);

  // Rate a card
  const rateCard = useCallback(
    (wordId: string, rating: DifficultyRating) => {
      const current = getCardData(wordId);
      const updated = calculateSM2(current, rating);
      setCardDataMap((prev) => ({ ...prev, [wordId]: updated }));
      setTotalReviews((prev) => prev + 1);
    },
    [getCardData, setCardDataMap, setTotalReviews]
  );

  // Stats
  const learnedCount = useMemo(() => {
    return Object.values(cardDataMap).filter((c) => c.repetitions >= 2).length;
  }, [cardDataMap]);

  return {
    dueCards,
    rateCard,
    getCardData,
    learnedCount,
    totalReviews,
    totalCards: words.length,
  };
}
