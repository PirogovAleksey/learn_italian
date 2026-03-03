import { useMemo, useCallback } from 'react';
import { words } from '../data/words';
import { topics } from '../data/topics';
import { BADGES, LEVELS } from '../data/gamification';
import { useGameProgress } from '../hooks/useGameProgress';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import { getLevelForXp, getNextLevel, getLevelProgress } from '../utils/gamification';
import styles from './StatsPage.module.css';

export default function StatsPage() {
  const { stats, resetProgress } = useGameProgress();
  const { getCardData } = useSpacedRepetition(words);

  const currentLevel = getLevelForXp(stats.totalXp);
  const nextLevel = getNextLevel(stats.totalXp);
  const progress = getLevelProgress(stats.totalXp);

  const accuracy = stats.grammarCompleted > 0
    ? Math.round((stats.grammarCorrect / stats.grammarCompleted) * 100)
    : 0;

  const topicProgress = useMemo(() => {
    return topics
      .filter((t) => words.some((w) => w.topicId === t.id))
      .map((topic) => {
        const topicWords = words.filter((w) => w.topicId === topic.id);
        const learnedInTopic = topicWords.filter((w) => getCardData(w.id).repetitions >= 2).length;
        const percent = topicWords.length > 0
          ? Math.round((learnedInTopic / topicWords.length) * 100)
          : 0;
        return { ...topic, total: topicWords.length, learned: learnedInTopic, percent };
      });
  }, [getCardData]);

  const handleReset = useCallback(() => {
    if (window.confirm('Ви впевнені? Весь прогрес буде видалено.')) {
      resetProgress();
      window.location.reload();
    }
  }, [resetProgress]);

  return (
    <div className={styles.page}>
      <div className={styles.pageTitle}>Мій прогрес</div>

      {/* Level card */}
      <div className={styles.levelCard}>
        <div className={styles.levelTop}>
          <div className={styles.levelBadge}>{currentLevel.icon}</div>
          <div className={styles.levelInfo}>
            <div className={styles.levelName}>Рівень {currentLevel.level} · {currentLevel.name}</div>
            <div className={styles.levelSubtitle}>{currentLevel.subtitle} — ти робиш великий прогрес!</div>
          </div>
        </div>
        <div className={styles.levelBarWrap}>
          <div className={styles.levelBar}>
            <div className={styles.levelBarFill} style={{ width: `${progress.percent}%` }} />
          </div>
          <div className={styles.levelBarLabels}>
            <span>{stats.totalXp} XP</span>
            <span>{nextLevel ? nextLevel.xpRequired : stats.totalXp} XP</span>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className={styles.statsRow}>
        <div className={styles.statMini}>
          <div className={styles.statMiniIcon}>📚</div>
          <div className={styles.statMiniValue}>{stats.totalWordsLearned}</div>
          <div className={styles.statMiniLabel}>Слів</div>
        </div>
        <div className={styles.statMini}>
          <div className={styles.statMiniIcon}>🔄</div>
          <div className={styles.statMiniValue}>{stats.totalReviews}</div>
          <div className={styles.statMiniLabel}>Повторень</div>
        </div>
        <div className={styles.statMini}>
          <div className={styles.statMiniIcon}>✅</div>
          <div className={styles.statMiniValue}>{accuracy}%</div>
          <div className={styles.statMiniLabel}>Точність</div>
        </div>
        <div className={styles.statMini}>
          <div className={styles.statMiniIcon}>🔥</div>
          <div className={styles.statMiniValue}>{stats.streak}</div>
          <div className={styles.statMiniLabel}>Стрік</div>
        </div>
      </div>

      {/* Badges */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>🏅 Досягнення</span>
          <span className={styles.sectionLink}>{stats.earnedBadges.length} / {BADGES.length}</span>
        </div>
        <div className={styles.badgesGrid}>
          {BADGES.map(badge => {
            const earned = stats.earnedBadges.includes(badge.id);
            return (
              <div key={badge.id} className={`${styles.badgeItem} ${earned ? styles.badgeEarned : ''} ${!earned ? styles.badgeLocked : ''}`}>
                {earned && <div className={styles.badgeCheck}>✓</div>}
                {!earned && <div className={styles.badgeLock}>🔒</div>}
                <div className={`${styles.badgeIcon} ${!earned ? styles.badgeIconLocked : ''}`}>{badge.icon}</div>
                <div className={styles.badgeName}>{badge.name}</div>
                <div className={styles.badgeDesc}>{badge.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Topic progress */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>📊 Прогрес по темах</span>
        </div>
        <div className={styles.topicProgress}>
          {topicProgress.map(tp => (
            <div key={tp.id} className={styles.topicItem}>
              <span className={styles.topicEmoji}>{tp.icon}</span>
              <div className={styles.topicInfo}>
                <div className={styles.topicName}>{tp.name}</div>
                <div className={styles.topicBar}>
                  <div className={styles.topicBarFill} style={{ width: `${tp.percent}%` }} />
                </div>
              </div>
              <span className={styles.topicPercent}>{tp.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Level roadmap */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionTitle}>🗺️ Рівні</span>
        </div>
        <div className={styles.roadmap}>
          {LEVELS.map(level => {
            const isDone = stats.totalXp >= (LEVELS[level.level]?.xpRequired ?? Infinity);
            const isCurrent = currentLevel.level === level.level;
            const isLocked = !isDone && !isCurrent;
            return (
              <div key={level.level} className={styles.roadmapItem}>
                <div className={`${styles.roadmapNum} ${isDone ? styles.roadmapDone : ''} ${isCurrent ? styles.roadmapCurrent : ''} ${isLocked ? styles.roadmapLocked : ''}`}>
                  {level.level}
                </div>
                <div className={styles.roadmapInfo}>
                  <div className={styles.roadmapTitle}>{level.name}</div>
                  <div className={styles.roadmapXp}>
                    {level.xpRequired} — {LEVELS[level.level]?.xpRequired ?? '∞'} XP
                    {isCurrent && ' · зараз тут'}
                  </div>
                </div>
                <div className={styles.roadmapStatus}>
                  {isDone ? '✅' : isCurrent ? level.icon : '🔒'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.resetSection}>
        <button className={styles.resetBtn} onClick={handleReset}>
          Скинути весь прогрес
        </button>
      </div>
    </div>
  );
}
