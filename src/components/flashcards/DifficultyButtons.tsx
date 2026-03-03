import type { DifficultyRating } from '../../types';
import { XP_PER_DIFFICULTY } from '../../data/gamification';
import styles from './DifficultyButtons.module.css';

interface DifficultyButtonsProps {
  onRate: (rating: DifficultyRating) => void;
}

const buttons: { rating: DifficultyRating; label: string; sub: string; className: string }[] = [
  { rating: 0, label: 'Не знаю', sub: 'Повтор', className: 'fail' },
  { rating: 3, label: 'Важко', sub: '1 день', className: 'hard' },
  { rating: 4, label: 'Добре', sub: '3 дні', className: 'good' },
  { rating: 5, label: 'Легко', sub: '7 днів', className: 'easy' },
];

export default function DifficultyButtons({ onRate }: DifficultyButtonsProps) {
  return (
    <div className={styles.container}>
      {buttons.map((b) => (
        <button
          key={b.rating}
          className={`${styles.btn} ${styles[b.className]}`}
          onClick={() => onRate(b.rating)}
        >
          <span className={styles.label}>{b.label}</span>
          <span className={styles.sub}>{b.sub}</span>
          <span className={styles.xp}>{XP_PER_DIFFICULTY[b.rating] > 0 ? `+${XP_PER_DIFFICULTY[b.rating]} XP` : '0 XP'}</span>
        </button>
      ))}
    </div>
  );
}
