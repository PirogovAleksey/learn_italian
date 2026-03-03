import { useState } from 'react';
import type { GrammarExercise } from '../../types';
import styles from './ExerciseCard.module.css';

interface ExerciseCardProps {
  exercise: GrammarExercise;
  current: number;
  total: number;
  onAnswer: (correct: boolean) => void;
  onNext: () => void;
}

export default function ExerciseCard({
  exercise,
  current,
  total,
  onAnswer,
  onNext,
}: ExerciseCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswer = () => {
    const userAnswer =
      exercise.type === 'multiple_choice' ? selectedOption : textInput.trim();
    const correct =
      userAnswer?.toLowerCase() === exercise.correctAnswer.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    onAnswer(correct);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setTextInput('');
    setAnswered(false);
    setIsCorrect(false);
    onNext();
  };

  const canCheck =
    exercise.type === 'multiple_choice'
      ? selectedOption !== null
      : textInput.trim().length > 0;

  return (
    <div className={styles.card}>
      <div className={styles.counter}>
        Вправа {current} з {total}
      </div>
      <div className={styles.question}>{exercise.question}</div>

      {exercise.type === 'multiple_choice' && exercise.options && (
        <div className={styles.options}>
          {exercise.options.map((option) => {
            let className = styles.option;
            if (answered) {
              if (option === exercise.correctAnswer) {
                className += ` ${styles.correct}`;
              } else if (option === selectedOption && !isCorrect) {
                className += ` ${styles.incorrect}`;
              }
            } else if (option === selectedOption) {
              className += ` ${styles.selected}`;
            }
            return (
              <button
                key={option}
                className={className}
                onClick={() => !answered && setSelectedOption(option)}
                disabled={answered}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}

      {(exercise.type === 'fill_blank' || exercise.type === 'translate') && (
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={`${styles.input} ${
              answered
                ? isCorrect
                  ? styles.inputCorrect
                  : styles.inputIncorrect
                : ''
            }`}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && canCheck && !answered && checkAnswer()}
            placeholder="Введіть відповідь..."
            disabled={answered}
            autoFocus
          />
        </div>
      )}

      {!answered && (
        <button
          className={styles.checkBtn}
          onClick={checkAnswer}
          disabled={!canCheck}
        >
          Перевірити
        </button>
      )}

      {answered && (
        <>
          <div
            className={`${styles.feedback} ${
              isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
            }`}
          >
            <span className={styles.feedbackAnswer}>
              {isCorrect ? '✓ Правильно!' : `✗ Правильна відповідь: ${exercise.correctAnswer}`}
            </span>
            {exercise.explanation}
          </div>
          <button className={styles.nextBtn} onClick={handleNext}>
            Далі →
          </button>
        </>
      )}
    </div>
  );
}
