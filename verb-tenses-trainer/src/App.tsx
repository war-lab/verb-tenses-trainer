import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { TrainerPage } from './pages/TrainerPage';
import { ComparePage } from './pages/ComparePage';
import { FutureGuidePage } from './pages/FutureGuidePage';
import classNames from 'classnames';

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-blue-600 tracking-tight">
            Verb Tenses Trainer
          </h1>
          <nav className="flex">
            <NavLink
              to="/"
              className={({ isActive }) => classNames("nav-link", isActive && "active")}
            >
              Trainer
            </NavLink>
            <NavLink
              to="/compare"
              className={({ isActive }) => classNames("nav-link", isActive && "active")}
            >
              Compare
            </NavLink>
            <NavLink
              to="/future"
              className={({ isActive }) => classNames("nav-link", isActive && "active")}
            >
              Guide
            </NavLink>
          </nav>
        </div>
      </header>

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
