import { NavLink } from 'react-router-dom';
import Icon from '../common/Icon';
import styles from './BottomNav.module.css';

const navItems = [
  { to: '/', icon: 'home', label: 'Головна' },
  { to: '/flashcards', icon: 'flashcard', label: 'Картки' },
  { to: '/grammar', icon: 'book', label: 'Граматика' },
  { to: '/phrases', icon: 'chat', label: 'Фрази' },
  { to: '/stats', icon: 'chart', label: 'Прогрес' },
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
          <span className={styles.icon}>
            <Icon name={item.icon} size={22} />
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
