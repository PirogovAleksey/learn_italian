import type { Phrase } from '../../types';
import styles from './PhraseCard.module.css';

interface PhraseCardProps {
  phrase: Phrase;
}

export default function PhraseCard({ phrase }: PhraseCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.italian}>{phrase.italian}</div>
      <div className={styles.pronunciation}>[{phrase.pronunciation}]</div>
      <div className={styles.ukrainian}>{phrase.ukrainian}</div>
      {phrase.context && (
        <span className={styles.context}>{phrase.context}</span>
      )}
    </div>
  );
}
