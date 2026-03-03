import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import FlashcardsPage from './pages/FlashcardsPage';
import GrammarPage from './pages/GrammarPage';
import PhrasesPage from './pages/PhrasesPage';
import StatsPage from './pages/StatsPage';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<FlashcardsPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/phrases" element={<PhrasesPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
