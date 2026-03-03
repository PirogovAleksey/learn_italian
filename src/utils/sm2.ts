import type { SM2CardData, DifficultyRating } from '../types';

/**
 * SM-2 algorithm for spaced repetition (Anki-style).
 * Rating: 0-2 = fail (reset), 3-5 = pass (increase interval)
 */
export function calculateSM2(
  card: SM2CardData,
  rating: DifficultyRating
): SM2CardData {
  const now = Date.now();
  let { easeFactor, interval, repetitions } = card;

  if (rating < 3) {
    // Failed — reset
    repetitions = 0;
    interval = 1;
  } else {
    // Passed
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;
  if (easeFactor > 2.5) easeFactor = 2.5;

  const nextReview = now + interval * 24 * 60 * 60 * 1000;

  return {
    wordId: card.wordId,
    easeFactor,
    interval,
    repetitions,
    nextReview,
    lastReview: now,
  };
}

export function createInitialCardData(wordId: string): SM2CardData {
  return {
    wordId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReview: 0,
    lastReview: 0,
  };
}

export function isDueForReview(card: SM2CardData): boolean {
  return Date.now() >= card.nextReview;
}
