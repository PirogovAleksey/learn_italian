import type { SessionResult } from '../../types';
import { useGameProgress } from '../../hooks/useGameProgress';
import { getLevelForXp, getNextLevel, getLevelProgress } from '../../utils/gamification';
import styles from './SessionComplete.module.css';

interface SessionCompleteProps {
  result: SessionResult;
  onContinue: () => void;
  onHome: () => void;
}

export default function SessionComplete({ result, onContinue, onHome }: SessionCompleteProps) {
  const { stats } = useGameProgress();
  const currentLevel = getLevelForXp(stats.totalXp);
  const nextLevel = getNextLevel(stats.totalXp);
  const progress = getLevelProgress(stats.totalXp);

  const accuracy = result.totalCards > 0
    ? Math.round((result.correctCount / result.totalCards) * 100)
    : 0;

  return (
    <div className={styles.page}>
      <div className={styles.celebration}>
        <span className={`${styles.confetti} ${styles.c1}`}>🎉</span>
        <span className={`${styles.confetti} ${styles.c2}`}>⭐</span>
        <span className={`${styles.confetti} ${styles.c3}`}>🇮🇹</span>
        <span className={`${styles.confetti} ${styles.c4}`}>✨</span>
        <span className={`${styles.confetti} ${styles.c5}`}>🎊</span>
        <div className={styles.trophy}>🏆</div>
        <div className={styles.title}>Bravissimo!</div>
        <div className={styles.subtitle}>Сесію завершено</div>
      </div>

      <div className={styles.xpEarned}>
        <div className={styles.xpValue}>+{result.xpEarned} XP</div>
        <div className={styles.xpLabel}>Зароблено за сесію</div>
        <div className={styles.xpBreakdown}>
          {result.correctCount} правильних × 10 XP = {result.correctCount * 10}<br />
          {result.easyCount > 0 && <>{result.easyCount} легких × 5 бонус = {result.easyCount * 5}<br /></>}
          {result.deckCompleted && <>Завершення деку = +25</>}
        </div>
      </div>

      <div className={styles.summaryGrid}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>📚</div>
          <div className={styles.summaryValue}>{result.totalCards}</div>
          <div className={styles.summaryLabel}>Карток</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>✅</div>
          <div className={styles.summaryValue}>{accuracy}%</div>
          <div className={styles.summaryLabel}>Знав</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>⭐</div>
          <div className={styles.summaryValue}>{result.newWordsLearned}</div>
          <div className={styles.summaryLabel}>Нових слів</div>
        </div>
        <div className={styles.summaryCard}>
          <div className={styles.summaryIcon}>🔥</div>
          <div className={styles.summaryValue}>{stats.streak}</div>
          <div className={styles.summaryLabel}>Стрік</div>
        </div>
      </div>

      <div className={styles.levelProgress}>
        <div className={styles.levelTop}>
          <span className={styles.levelLabel}>
            Рівень {currentLevel.level} · {currentLevel.name}
          </span>
          <span className={styles.levelValue}>
            {stats.totalXp} / {nextLevel ? nextLevel.xpRequired : stats.totalXp} XP
          </span>
        </div>
        <div className={styles.levelBar}>
          <div className={styles.levelBarFill} style={{ width: `${progress.percent}%` }} />
        </div>
        {nextLevel && (
          <div className={styles.levelHint}>
            Ще {nextLevel.xpRequired - stats.totalXp} XP до {nextLevel.name}
          </div>
        )}
      </div>

      <div className={styles.nudge}>
        <div className={styles.nudgeText}>Ще 3 слова? Це лише 1 хвилина! 🚀</div>
        <div className={styles.nudgeSub}>Закріпи результат і наблизься до нового рівня</div>
      </div>

      <button className={styles.btnPrimary} onClick={onContinue}>
        Вивчити ще слова
      </button>
      <button className={styles.btnSecondary} onClick={onHome}>
        На головну
      </button>
    </div>
  );
}
