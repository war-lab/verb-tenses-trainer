import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import TrainerPage from './pages/TrainerPage';
import TrainingPage from './pages/TrainingPage';
import { ComparePage } from './pages/ComparePage';
import { FutureGuidePage } from './pages/FutureGuidePage';
import { Header } from './components/Header';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/trainer" replace />} />
          <Route path="/trainer" element={<TrainerPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/future" element={<FutureGuidePage />} />
        </Routes>
      </main>

      <footer className="text-center text-gray-400 text-sm mt-12 mb-4">
        © 2026 Verb Tenses Trainer
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter basename="/verb-tenses-trainer">
      <Layout />
    </BrowserRouter>
  );
}

export default App;
