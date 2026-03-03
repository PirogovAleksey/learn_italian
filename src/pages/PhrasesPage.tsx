import { useState, useMemo } from 'react';
import type { TopicId } from '../types';
import { topics } from '../data/topics';
import { phrases } from '../data/phrases';
import TopicSelector from '../components/common/TopicSelector';
import PhraseList from '../components/phrases/PhraseList';
import styles from './PhrasesPage.module.css';

export default function PhrasesPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicId | 'all'>('all');

  const phraseTopics = topics.filter((t) =>
    phrases.some((p) => p.topicId === t.id)
  );

  const filteredPhrases = useMemo(() => {
    if (selectedTopic === 'all') return phrases;
    return phrases.filter((p) => p.topicId === selectedTopic);
  }, [selectedTopic]);

  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of phrases) {
      counts[p.topicId] = (counts[p.topicId] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className={styles.page}>
      <div>
        <h2 className={styles.title}>Розмовні фрази</h2>
        <p className={styles.subtitle}>
          {filteredPhrases.length} фраз для повсякденного спілкування
        </p>
      </div>
      <TopicSelector
        topics={phraseTopics}
        selectedTopicId={selectedTopic}
        onSelect={setSelectedTopic}
        counts={topicCounts}
      />
      <PhraseList phrases={filteredPhrases} />
    </div>
  );
}
