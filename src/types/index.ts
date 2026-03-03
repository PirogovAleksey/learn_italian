// === Теми ===
export type TopicId =
  | 'greetings'
  | 'restaurant'
  | 'travel'
  | 'shopping'
  | 'numbers'
  | 'family'
  | 'acquaintance'
  | 'emergency';

export interface Topic {
  id: TopicId;
  name: string;
  icon: string;
  description: string;
}

// === Флешкартки ===
export interface Word {
  id: string;
  topicId: TopicId;
  italian: string;
  ukrainian: string;
  pronunciation: string;
  example?: string;
  exampleTranslation?: string;
}

export interface SM2CardData {
  wordId: string;
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: number; // timestamp
  lastReview: number; // timestamp
}

export type DifficultyRating = 0 | 1 | 2 | 3 | 4 | 5;

// === Граматика ===
export type GrammarTopicId =
  | 'articles'
  | 'present_tense'
  | 'prepositions'
  | 'pronouns';

export interface GrammarTopic {
  id: GrammarTopicId;
  name: string;
  icon: string;
  description: string;
}

export type ExerciseType = 'fill_blank' | 'multiple_choice' | 'translate';

export interface GrammarExercise {
  id: string;
  topicId: GrammarTopicId;
  type: ExerciseType;
  question: string;
  correctAnswer: string;
  options?: string[];
  explanation: string;
}

export interface GrammarProgress {
  exerciseId: string;
  completed: boolean;
  correct: boolean;
  attempts: number;
  lastAttempt: number; // timestamp
}

// === Фрази ===
export interface Phrase {
  id: string;
  topicId: TopicId;
  italian: string;
  ukrainian: string;
  pronunciation: string;
  context?: string;
}

// === Статистика ===
export interface AppStats {
  totalWordsLearned: number;
  totalReviews: number;
  grammarCompleted: number;
  grammarCorrect: number;
  streak: number;
  lastStudyDate: string; // ISO date
}
