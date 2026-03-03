import type { DifficultyRating } from '../../types';
import styles from './DifficultyButtons.module.css';

interface DifficultyButtonsProps {
  onRate: (rating: DifficultyRating) => void;
}

const buttons: { rating: DifficultyRating; label: string; sub: string; className: string }[] = [
  { rating: 0, label: 'Не знаю', sub: 'Повторити', className: styles.btnFail },
  { rating: 3, label: 'Важко', sub: '1 день', className: styles.btnHard },
  { rating: 4, label: 'Добре', sub: '3 дні', className: styles.btnGood },
  { rating: 5, label: 'Легко', sub: '7 днів', className: styles.btnEasy },
];

export default function DifficultyButtons({ onRate }: DifficultyButtonsProps) {
  return (
    <div className={styles.container}>
      {buttons.map((b) => (
        <button
          key={b.rating}
          className={`${styles.btn} ${b.className}`}
          onClick={() => onRate(b.rating)}
        >
          {b.label}
          <span className={styles.label}>{b.sub}</span>
        </button>
      ))}
    </div>
  );
}
