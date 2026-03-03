import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className="container">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </>
  );
}
