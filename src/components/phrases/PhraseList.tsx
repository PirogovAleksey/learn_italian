import type { Phrase } from '../../types';
import PhraseCard from './PhraseCard';
import styles from './PhraseList.module.css';

interface PhraseListProps {
  phrases: Phrase[];
}

export default function PhraseList({ phrases }: PhraseListProps) {
  if (phrases.length === 0) {
    return <div className={styles.empty}>Фрази не знайдено</div>;
  }

  return (
    <div className={styles.list}>
      {phrases.map((phrase) => (
        <PhraseCard key={phrase.id} phrase={phrase} />
      ))}
    </div>
  );
}
