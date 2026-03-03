import { useState, useEffect } from 'react';
import type { Word } from '../../types';
import { topics } from '../../data/topics';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  current: number;
  total: number;
  xpEarned?: number;
}

export default function FlashCard({ word, isFlipped, onFlip, current, total, xpEarned }: FlashCardProps) {
  const [showXp, setShowXp] = useState(false);
  const topic = topics.find(t => t.id === word.topicId);

  useEffect(() => {
    if (xpEarned && xpEarned > 0) {
      setShowXp(true);
      const timer = setTimeout(() => setShowXp(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [xpEarned]);

  return (
    <div className={styles.cardStack}>
      <div className={styles.cardContainer} onClick={onFlip}>
        <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
          <div className={styles.front}>
            <div className={styles.flagStripe} />
            {topic && <span className={styles.topic}>{topic.icon} {topic.name}</span>}
            <span className={styles.counter}>{current}/{total}</span>
            <div className={styles.italian}>{word.italian}</div>
            <div className={styles.pronunciation}>[{word.pronunciation}]</div>
            <div className={styles.hint}>Натисніть, щоб перевернути</div>
          </div>
          <div className={styles.back}>
            <div className={styles.flagStripe} />
            {topic && <span className={styles.topic}>{topic.icon} {topic.name}</span>}
            <span className={styles.counter}>{current}/{total}</span>
            {showXp && <div className={styles.xpFloat}>+{xpEarned} XP ⭐</div>}
            <div className={styles.italian}>{word.italian}</div>
            <div className={styles.pronunciation}>[{word.pronunciation}]</div>
            <div className={styles.divider} />
            <div className={styles.ukrainian}>{word.ukrainian}</div>
            {word.example && (
              <div className={styles.example}>
                <div className={styles.exampleIt}>{word.example}</div>
                <div className={styles.exampleUa}>{word.exampleTranslation}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
