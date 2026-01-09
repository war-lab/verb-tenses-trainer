import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TrainerPage } from './pages/TrainerPage';
import { ComparePage } from './pages/ComparePage';
import { FutureGuidePage } from './pages/FutureGuidePage';
import { Header } from './components/Header';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 pb-20">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<TrainerPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/future" element={<FutureGuidePage />} />
        </Routes>
      </main>

      <footer className="text-center text-gray-400 text-sm mt-12 mb-4">
        © 2024 Verb Tenses Trainer MVP
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
