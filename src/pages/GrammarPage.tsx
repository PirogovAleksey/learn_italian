import { useState, useMemo } from 'react';
import type { GrammarTopicId } from '../types';
import { grammarTopics, grammarExercises } from '../data/grammar';
import { useGrammarProgress } from '../hooks/useGrammarProgress';
import ExerciseSession from '../components/grammar/ExerciseSession';
import styles from './GrammarPage.module.css';

export default function GrammarPage() {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopicId | null>(null);
  const { recordAnswer, stats } = useGrammarProgress();

  const exerciseCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ex of grammarExercises) {
      counts[ex.topicId] = (counts[ex.topicId] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredExercises = useMemo(() => {
    if (!selectedTopic) return [];
    return grammarExercises.filter((ex) => ex.topicId === selectedTopic);
  }, [selectedTopic]);

  if (selectedTopic === null) {
    return (
      <div className={styles.page}>
        <div>
          <h2 className={styles.title}>Граматика</h2>
          <p className={styles.subtitle}>Оберіть тему для вправ</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.completed}</div>
            <div className={styles.statLabel}>Виконано</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{stats.correct}</div>
            <div className={styles.statLabel}>Правильно</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{grammarExercises.length}</div>
            <div className={styles.statLabel}>Всього вправ</div>
          </div>
        </div>
        <div className={styles.topicGrid}>
          {grammarTopics.map((topic) => (
            <button
              key={topic.id}
              className={styles.topicCard}
              onClick={() => setSelectedTopic(topic.id)}
            >
              <span className={styles.topicIcon}>{topic.icon}</span>
              <div className={styles.topicInfo}>
                <div className={styles.topicName}>{topic.name}</div>
                <div className={styles.topicDesc}>{topic.description}</div>
                <div className={styles.topicCount}>
                  {exerciseCounts[topic.id] || 0} вправ
                </div>
              </div>
              <span className={styles.topicArrow}>→</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => setSelectedTopic(null)}>
        ← Назад до тем
      </button>
      <ExerciseSession exercises={filteredExercises} onAnswer={recordAnswer} />
    </div>
  );
}
