import { useState, useCallback } from 'react';
import type { GrammarExercise } from '../../types';
import ExerciseCard from './ExerciseCard';
import styles from './ExerciseSession.module.css';

interface ExerciseSessionProps {
  exercises: GrammarExercise[];
  onAnswer: (exerciseId: string, correct: boolean) => void;
}

export default function ExerciseSession({ exercises, onAnswer }: ExerciseSessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const exercise = exercises[currentIndex];
      onAnswer(exercise.id, correct);
      if (correct) setCorrectCount((prev) => prev + 1);
    },
    [exercises, currentIndex, onAnswer]
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= exercises.length) {
      setCompleted(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, exercises.length]);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setCompleted(false);
  }, []);

  if (exercises.length === 0) {
    return (
      <div className={styles.complete}>
        <div className={styles.completeIcon}>📚</div>
        <div className={styles.completeTitle}>Немає вправ для цієї теми</div>
      </div>
    );
  }

  if (completed) {
    const percentage = Math.round((correctCount / exercises.length) * 100);
    return (
      <div className={styles.complete}>
        <div className={styles.completeIcon}>
          {percentage >= 80 ? '🏆' : percentage >= 50 ? '👍' : '📖'}
        </div>
        <div className={styles.completeTitle}>Сесію завершено!</div>
        <div className={styles.completeStats}>
          <div className={styles.completeStat}>
            <div className={styles.completeStatValue}>{correctCount}/{exercises.length}</div>
            <div className={styles.completeStatLabel}>Правильних</div>
          </div>
          <div className={styles.completeStat}>
            <div className={styles.completeStatValue}>{percentage}%</div>
            <div className={styles.completeStatLabel}>Результат</div>
          </div>
        </div>
        <button className={styles.restartBtn} onClick={handleRestart}>
          Повторити
        </button>
      </div>
    );
  }

  const progress = (currentIndex / exercises.length) * 100;

  return (
    <div className={styles.session}>
      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${progress}%` }} />
      </div>
      <ExerciseCard
        key={exercises[currentIndex].id}
        exercise={exercises[currentIndex]}
        current={currentIndex + 1}
        total={exercises.length}
        onAnswer={handleAnswer}
        onNext={handleNext}
      />
    </div>
  );
}
