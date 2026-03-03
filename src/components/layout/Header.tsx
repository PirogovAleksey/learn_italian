import { useGameProgress } from '../../hooks/useGameProgress';
import styles from './Header.module.css';

export default function Header() {
  const { stats } = useGameProgress();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>🇮🇹</div>
        <div className={styles.title}>Bella Italiana</div>
      </div>
      <div className={styles.right}>
        <div className={styles.badge}>⭐ {stats.totalXp}</div>
        <div className={styles.badge}>🔥 {stats.streak}</div>
      </div>
    </header>
  );
}
