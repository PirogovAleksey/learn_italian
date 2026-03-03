import type { Topic, TopicId } from '../../types';
import styles from './TopicSelector.module.css';

interface TopicSelectorProps {
  topics: Topic[];
  selectedTopicId: TopicId | 'all';
  onSelect: (topicId: TopicId | 'all') => void;
  counts?: Record<string, number>;
}

export default function TopicSelector({
  topics,
  selectedTopicId,
  onSelect,
  counts,
}: TopicSelectorProps) {
  return (
    <div className={styles.grid}>
      <button
        className={`${styles.allBtn} ${selectedTopicId === 'all' ? styles.allActive : ''}`}
        onClick={() => onSelect('all')}
      >
        Всі теми
      </button>
      {topics.map((topic) => (
        <button
          key={topic.id}
          className={`${styles.card} ${selectedTopicId === topic.id ? styles.active : ''}`}
          onClick={() => onSelect(topic.id)}
        >
          <div className={styles.icon}>{topic.icon}</div>
          <div className={styles.name}>{topic.name}</div>
          {counts && (
            <div className={styles.count}>{counts[topic.id] || 0} шт.</div>
          )}
        </button>
      ))}
    </div>
  );
}
