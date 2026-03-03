import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Word, DifficultyRating, SessionResult } from '../../types';
import { XP_PER_DIFFICULTY, XP_DECK_COMPLETE_BONUS } from '../../data/gamification';
import { useGameProgress } from '../../hooks/useGameProgress';
import FlashCard from './FlashCard';
import DifficultyButtons from './DifficultyButtons';
import SessionComplete from './SessionComplete';
import styles from './FlashCardDeck.module.css';

interface FlashCardDeckProps {
  cards: Word[];
  onRate: (wordId: string, rating: DifficultyRating) => void;
}

export default function FlashCardDeck({ cards, onRate }: FlashCardDeckProps) {
  const navigate = useNavigate();
  const { recordReview } = useGameProgress();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [lastXp, setLastXp] = useState(0);
  const [sessionResult, setSessionResult] = useState<SessionResult | null>(null);

  // Session tracking
  const [correctCount, setCorrectCount] = useState(0);
  const [easyCount, setEasyCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRate = useCallback(
    (rating: DifficultyRating) => {
      const card = cards[currentIndex];
      onRate(card.id, rating);

      const xp = XP_PER_DIFFICULTY[rating] || 0;
      setLastXp(xp);
      if (xp > 0) recordReview(xp);

      const isCorrect = rating >= 3;
      const isEasy = rating === 5;
      if (isCorrect) setCorrectCount(c => c + 1);
      if (isEasy) setEasyCount(c => c + 1);
      setTotalXpEarned(t => t + xp);

      if (currentIndex + 1 >= cards.length) {
        const deckBonus = XP_DECK_COMPLETE_BONUS;
        const finalXp = totalXpEarned + xp + deckBonus;
        setSessionResult({
          totalCards: cards.length,
          correctCount: correctCount + (isCorrect ? 1 : 0),
          easyCount: easyCount + (isEasy ? 1 : 0),
          xpEarned: finalXp,
          newWordsLearned: correctCount + (isCorrect ? 1 : 0),
          deckCompleted: true,
        });
      } else {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [cards, currentIndex, onRate, recordReview, totalXpEarned, correctCount, easyCount]
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionResult(null);
    setCorrectCount(0);
    setEasyCount(0);
    setTotalXpEarned(0);
    setLastXp(0);
  }, []);

  if (cards.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎉</div>
        <div className={styles.emptyTitle}>Всі картки вивчені!</div>
        <div className={styles.emptyText}>Поверніться пізніше для повторення</div>
      </div>
    );
  }

  if (sessionResult) {
    return (
      <SessionComplete
        result={sessionResult}
        onContinue={handleRestart}
        onHome={() => navigate('/')}
      />
    );
  }

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className={styles.deck}>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.progressText}>{currentIndex + 1} / {cards.length}</span>
      </div>

      <FlashCard
        word={cards[currentIndex]}
        isFlipped={isFlipped}
        onFlip={handleFlip}
        current={currentIndex + 1}
        total={cards.length}
        xpEarned={lastXp}
      />

      {isFlipped && <DifficultyButtons onRate={handleRate} />}
    </div>
  );
}
