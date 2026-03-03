import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <span className={styles.flag}>🇮🇹</span>
      <h1 className={styles.title}>Вивчай Італійську</h1>
    </header>
  );
}
