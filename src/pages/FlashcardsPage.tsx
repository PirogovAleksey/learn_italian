import { useState, useMemo } from 'react';
import type { TopicId } from '../types';
import { topics } from '../data/topics';
import { words } from '../data/words';
import { useSpacedRepetition } from '../hooks/useSpacedRepetition';
import TopicSelector from '../components/common/TopicSelector';
import FlashCardDeck from '../components/flashcards/FlashCardDeck';
import styles from './FlashcardsPage.module.css';

export default function FlashcardsPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all' | null>(null);

  const flashcardTopics = topics.filter((t) =>
    words.some((w) => w.topicId === t.id)
  );

  const filteredWords = useMemo(() => {
    if (selectedTopic === 'all') return words;
    if (selectedTopic) return words.filter((w) => w.topicId === selectedTopic);
    return [];
  }, [selectedTopic]);

  const { dueCards, rateCard, learnedCount, totalReviews } =
    useSpacedRepetition(filteredWords);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const w of words) {
      counts[w.topicId] = (counts[w.topicId] || 0) + 1;
    }
    return counts;
  }, []);

  const topicName = selectedTopic && selectedTopic !== 'all'
    ? topics.find(t => t.id === selectedTopic)?.name ?? 'Тема'
    : 'Всі теми';

  if (selectedTopic === null) {
    return (
      <div className={styles.page}>
        <div>
          <h2 className={styles.title}>Флешкартки</h2>
          <p className={styles.subtitle}>Оберіть тему для вивчення</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statValue}>{learnedCount}</div>
            <div className={styles.statLabel}>Вивчено</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{totalReviews}</div>
            <div className={styles.statLabel}>Повторень</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>{words.length}</div>
            <div className={styles.statLabel}>Всього</div>
          </div>
        </div>
        <TopicSelector
          topics={flashcardTopics}
          selectedTopicId={selectedTopic ?? 'all'}
          onSelect={(id) => setSelectedTopic(id)}
          counts={topicCounts}
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button className={styles.backBtn} onClick={() => setSelectedTopic(null)}>
        ← {topicName} · {filteredWords.length} слів
      </button>
      <FlashCardDeck
        cards={dueCards}
        onRate={rateCard}
      />
    </div>
  );
}
