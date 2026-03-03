import type { Word } from '../../types';
import styles from './FlashCard.module.css';

interface FlashCardProps {
  word: Word;
  isFlipped: boolean;
  onFlip: () => void;
  current: number;
  total: number;
}

export default function FlashCard({ word, isFlipped, onFlip, current, total }: FlashCardProps) {
  return (
    <div className={styles.cardContainer} onClick={onFlip}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.front}>
          <span className={styles.counter}>{current}/{total}</span>
          <div className={styles.italian}>{word.italian}</div>
          <div className={styles.pronunciation}>[{word.pronunciation}]</div>
          <div className={styles.hint}>Натисніть, щоб перевернути</div>
        </div>
        <div className={styles.back}>
          <span className={styles.counter}>{current}/{total}</span>
          <div className={styles.ukrainian}>{word.ukrainian}</div>
          <div className={styles.pronunciation}>[{word.pronunciation}]</div>
          {word.example && (
            <div className={styles.example}>
              <div className={styles.exampleItalian}>{word.example}</div>
              <div>{word.exampleTranslation}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
