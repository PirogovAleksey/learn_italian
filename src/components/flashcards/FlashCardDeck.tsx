import { useState, useCallback } from 'react';
import type { Word, DifficultyRating } from '../../types';
import FlashCard from './FlashCard';
import DifficultyButtons from './DifficultyButtons';
import styles from './FlashCardDeck.module.css';

interface FlashCardDeckProps {
  cards: Word[];
  onRate: (wordId: string, rating: DifficultyRating) => void;
}

export default function FlashCardDeck({ cards, onRate }: FlashCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleRate = useCallback(
    (rating: DifficultyRating) => {
      const card = cards[currentIndex];
      onRate(card.id, rating);

      if (currentIndex + 1 >= cards.length) {
        setCompleted(true);
      } else {
        setIsFlipped(false);
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [cards, currentIndex, onRate]
  );

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCompleted(false);
  }, []);

  if (cards.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🎉</div>
        <div className={styles.emptyTitle}>Всі картки вивчені!</div>
        <div className={styles.emptyText}>
          Поверніться пізніше для повторення
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className={styles.complete}>
        <div className={styles.completeIcon}>✅</div>
        <div className={styles.completeTitle}>
          Сесію завершено!
        </div>
        <div className={styles.emptyText}>
          Переглянуто карток: {cards.length}
        </div>
        <button className={styles.restartBtn} onClick={handleRestart}>
          Повторити
        </button>
      </div>
    );
  }

  const progress = ((currentIndex + 1) / cards.length) * 100;

  return (
    <div className={styles.deck}>
      <div className={styles.progress}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        />
      </div>
      <FlashCard
        word={cards[currentIndex]}
        isFlipped={isFlipped}
        onFlip={handleFlip}
        current={currentIndex + 1}
        total={cards.length}
      />
      {isFlipped && <DifficultyButtons onRate={handleRate} />}
    </div>
  );
}
