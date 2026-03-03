import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { words } from '../data/words';
import { grammarExercises } from '../data/grammar';
import { phrases } from '../data/phrases';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { useGrammarProgress } from '../hooks/useGrammarProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { learnedCount, totalReviews, dueCards } = useSpacedRepetition(words);
  const { stats: grammarStats } = useGrammarProgress();
  const [lastStudyDate, setLastStudyDate] = useLocalStorage<string>('last_study_date', '');
  const [streak, setStreak] = useLocalStorage<number>('streak', 0);

  // Update streak on visit
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (lastStudyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastStudyDate === yesterday) {
        setStreak((s) => s + 1);
      } else {
        setStreak(1);
      }
      setLastStudyDate(today);
    }
  }, [lastStudyDate, setLastStudyDate, setStreak]);

  const quickLinks = [
    {
      to: '/flashcards',
      icon: '🃏',
      title: 'Флешкартки',
      desc: `${dueCards.length} карток на повторення`,
    },
    {
      to: '/grammar',
      icon: '📖',
      title: 'Граматика',
      desc: `${grammarExercises.length} вправ з граматики`,
    },
    {
      to: '/phrases',
      icon: '💬',
      title: 'Розмовні фрази',
      desc: `${phrases.length} фраз на кожен день`,
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroIcon}>🇮🇹</div>
        <h2 className={styles.heroTitle}>Вивчай Італійську</h2>
        <p className={styles.heroSubtitle}>Вивчай нові слова щодня</p>
        {streak > 0 && (
          <div className={styles.streakBadge}>
            🔥 {streak} {streak === 1 ? 'день' : streak < 5 ? 'дні' : 'днів'} поспіль
          </div>
        )}
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{learnedCount}</div>
          <div className={styles.statLabel}>Слів вивчено</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalReviews}</div>
          <div className={styles.statLabel}>Повторень</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{grammarStats.correct}</div>
          <div className={styles.statLabel}>Вправ вірно</div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Швидкий старт</h3>
      <div className={styles.quickStart}>
        {quickLinks.map((link) => (
          <Link key={link.to} to={link.to} className={styles.quickLink}>
            <span className={styles.quickIcon}>{link.icon}</span>
            <div className={styles.quickInfo}>
              <div className={styles.quickTitle}>{link.title}</div>
              <div className={styles.quickDesc}>{link.desc}</div>
            </div>
            <span className={styles.quickArrow}>→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
