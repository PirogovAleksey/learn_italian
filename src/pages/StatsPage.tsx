import { useMemo, useCallback } from 'react';
import { words } from '../data/words';
import { grammarExercises } from '../data/grammar';
import { phrases } from '../data/phrases';
import { topics } from '../data/topics';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { useGrammarProgress } from '../hooks/useGrammarProgress';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './StatsPage.module.css';

export default function StatsPage() {
  const { learnedCount, totalReviews, totalCards } = useSpacedRepetition(words);
  const { stats: grammarStats } = useGrammarProgress();
  const [streak] = useLocalStorage<number>('streak', 0);

  const topicProgress = useMemo(() => {
    return topics
      .filter((t) => words.some((w) => w.topicId === t.id))
      .map((topic) => {
        const topicWords = words.filter((w) => w.topicId === topic.id);
        return {
          name: topic.name,
          icon: topic.icon,
          total: topicWords.length,
        };
      });
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Ви впевнені? Весь прогрес буде видалено.')) {
      const keys = Object.keys(localStorage).filter((k) =>
        k.startsWith('italian_learn_')
      );
      keys.forEach((k) => localStorage.removeItem(k));
      window.location.reload();
    }
  }, []);

  const grammarPercentage = grammarStats.completed > 0
    ? Math.round((grammarStats.correct / grammarStats.completed) * 100)
    : 0;

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Статистика</h2>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>🃏 Флешкартки</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{learnedCount}</div>
            <div className={styles.statLabel}>Вивчено слів</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{totalCards}</div>
            <div className={styles.statLabel}>Всього слів</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{totalReviews}</div>
            <div className={styles.statLabel}>Повторень</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>
              {totalCards > 0 ? Math.round((learnedCount / totalCards) * 100) : 0}%
            </div>
            <div className={styles.statLabel}>Прогрес</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📖 Граматика</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{grammarStats.completed}</div>
            <div className={styles.statLabel}>Виконано вправ</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{grammarExercises.length}</div>
            <div className={styles.statLabel}>Всього вправ</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{grammarStats.correct}</div>
            <div className={styles.statLabel}>Правильних</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{grammarPercentage}%</div>
            <div className={styles.statLabel}>Точність</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>💬 Контент</h3>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{words.length}</div>
            <div className={styles.statLabel}>Слів</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{phrases.length}</div>
            <div className={styles.statLabel}>Фраз</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>{grammarExercises.length}</div>
            <div className={styles.statLabel}>Вправ</div>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statValue}>🔥 {streak}</div>
            <div className={styles.statLabel}>Серія днів</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📊 Прогрес по темах</h3>
        <div className={styles.progressSection}>
          {topicProgress.map((tp) => (
            <div key={tp.name} className={styles.progressItem}>
              <span className={styles.progressLabel}>
                {tp.icon} {tp.name}
              </span>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${(tp.total / words.length) * 100}%` }}
                />
              </div>
              <span className={styles.progressValue}>{tp.total}</span>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.resetBtn} onClick={handleReset}>
        Скинути весь прогрес
      </button>
    </div>
  );
}
