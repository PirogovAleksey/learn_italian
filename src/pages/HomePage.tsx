import { Link } from 'react-router-dom';
import Icon from '../components/common/Icon';
import { words } from '../data/words';
import { grammarExercises } from '../data/grammar';
import { phrases } from '../data/phrases';
import { DAILY_QUESTS, DAILY_QUEST_BONUS_XP } from '../data/gamification';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { useGameProgress } from '../hooks/useGameProgress';
import { getLevelForXp, getNextLevel, getLevelProgress } from '../utils/gamification';
import styles from './HomePage.module.css';

// JS getDay(): 0=Sun, map to Ukrainian week starting Monday
const DAY_LABELS = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

export default function HomePage() {
  const { dueCards } = useSpacedRepetition(words);
  const { stats } = useGameProgress();

  const currentLevel = getLevelForXp(stats.totalXp);
  const nextLevel = getNextLevel(stats.totalXp);
  const progress = getLevelProgress(stats.totalXp);

  // Daily quest progress
  const questProgress = DAILY_QUESTS.map(q => {
    let current = 0;
    if (q.type === 'words') current = stats.dailyWordsLearned;
    else if (q.type === 'grammar') current = stats.dailyGrammarDone;
    else if (q.type === 'reviews') current = stats.dailyReviews;
    return { ...q, current, done: current >= q.target };
  });
  const completedQuests = questProgress.filter(q => q.done).length;

  // Streak calendar (last 7 days, ending with today)
  const today = new Date();
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const dayOffset = 6 - i; // 6 days ago ... 0 = today
    const d = new Date(today);
    d.setDate(d.getDate() - dayOffset);
    const label = DAY_LABELS[d.getDay()];
    const isToday = dayOffset === 0;
    const isInStreak = dayOffset < stats.streak;
    return { label, isToday, isInStreak };
  });

  return (
    <div className={styles.page}>
      {/* Streak calendar */}
      <div className={styles.streakCard}>
        <div className={styles.streakHeader}>
          <span className={styles.streakTitle}>Твій стрік</span>
          <span className={styles.streakCount}>🔥 {stats.streak} {stats.streak === 1 ? 'день' : stats.streak < 5 ? 'дні' : 'днів'}!</span>
        </div>
        <div className={styles.streakDays}>
          {streakDays.map((d, i) => (
            <div key={i} className={styles.streakDay}>
              <span className={styles.streakDayLabel}>{d.label}</span>
              <div className={`${styles.streakDot} ${d.isInStreak ? styles.streakDotDone : ''} ${d.isToday && !d.isInStreak ? styles.streakDotToday : ''}`}>
                {d.isInStreak ? '✓' : d.isToday ? '!' : ''}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.streakBest}>Найдовший стрік: {stats.longestStreak} 🏆</div>
      </div>

      {/* Level progress */}
      <div className={styles.levelCard}>
        <div className={styles.levelTop}>
          <div className={styles.levelBadge}>{currentLevel.level}</div>
          <div className={styles.levelInfo}>
            <div className={styles.levelName}>{currentLevel.name}</div>
            <div className={styles.levelXp}>{stats.totalXp} / {nextLevel ? nextLevel.xpRequired : stats.totalXp} XP до наступного рівня</div>
          </div>
        </div>
        <div className={styles.levelBar}>
          <div className={styles.levelBarFill} style={{ width: `${progress.percent}%` }} />
        </div>
        {nextLevel && (
          <div className={styles.levelHint}>Ще {nextLevel.xpRequired - stats.totalXp} XP до рівня {nextLevel.name}</div>
        )}
      </div>

      {/* Daily quests */}
      <div className={styles.questCard}>
        <div className={styles.questHeader}>
          <span className={styles.questTitle}>Щоденні квести</span>
          <span className={styles.questCount}>{completedQuests} / {DAILY_QUESTS.length}</span>
        </div>
        {questProgress.map(q => (
          <div key={q.id} className={`${styles.questItem} ${q.done ? styles.questDone : ''}`}>
            <div className={`${styles.questCheck} ${q.done ? styles.questCheckDone : ''}`}>
              {q.done ? '✓' : '›'}
            </div>
            <span className={styles.questText}>{q.text}</span>
            <span className={styles.questXp}>+{q.xpReward} XP</span>
          </div>
        ))}
        <div className={styles.questBonus}>
          🎁 Виконай всі {DAILY_QUESTS.length} і отримай +{DAILY_QUEST_BONUS_XP} XP бонус!
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.totalWordsLearned}</div>
          <div className={styles.statLabel}>Вивчено</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.totalReviews}</div>
          <div className={styles.statLabel}>Повторень</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{stats.grammarCompleted}</div>
          <div className={styles.statLabel}>Вправ</div>
        </div>
      </div>

      {/* Quick start */}
      <div className={styles.sectionTitle}>Продовжити</div>
      <div className={styles.quickStart}>
        <Link to="/flashcards" className={styles.quickLink}>
          <span className={styles.quickIcon}><Icon name="flashcard" size={26} /></span>
          <div className={styles.quickInfo}>
            <div className={styles.quickTitle}>Флешкартки</div>
            <div className={styles.quickDesc}>{dueCards.length} карток на повторення</div>
          </div>
          <span className={styles.quickArrow}>→</span>
        </Link>
        <Link to="/grammar" className={styles.quickLink}>
          <span className={styles.quickIcon}><Icon name="book" size={26} /></span>
          <div className={styles.quickInfo}>
            <div className={styles.quickTitle}>Граматика</div>
            <div className={styles.quickDesc}>{grammarExercises.length} вправ · 4 теми</div>
          </div>
          <span className={styles.quickArrow}>→</span>
        </Link>
        <Link to="/phrases" className={styles.quickLink}>
          <span className={styles.quickIcon}><Icon name="chat" size={26} /></span>
          <div className={styles.quickInfo}>
            <div className={styles.quickTitle}>Розмовні фрази</div>
            <div className={styles.quickDesc}>{phrases.length} фраз на кожен день</div>
          </div>
          <span className={styles.quickArrow}>→</span>
        </Link>
      </div>
    </div>
  );
}
