import { NavLink } from 'react-router-dom';
import styles from './BottomNav.module.css';

const navItems = [
  { to: '/', icon: '🏠', label: 'Головна' },
  { to: '/flashcards', icon: '🃏', label: 'Картки' },
  { to: '/grammar', icon: '📖', label: 'Граматика' },
  { to: '/phrases', icon: '💬', label: 'Фрази' },
  { to: '/stats', icon: '📊', label: 'Статистика' },
];

export default function BottomNav() {
  return (
    <nav className={styles.nav}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
          end={item.to === '/'}
        >
          <span className={styles.icon}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
