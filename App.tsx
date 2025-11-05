// App.tsx
import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './services/AuthContext';

import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { Dashboard } from './components/Dashboard';
import { LessonPage } from './components/LessonPage';
import { Leaderboard } from './components/Leaderboard';
import { Header } from './components/Header';
import { UnitPage } from './components/LessonTrackPage';

// 🔐 Wrapper: protects children pages
const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading…</p>;
  if (!user) return <Navigate to="/signin" replace />;
  return <Outlet />;
};

// 🔹 Everything under Header
const Shell = () => (
  <div className="min-h-screen bg-slate-900 text-slate-100">
    <Header />
    <main className="p-4 md:p-8">
      <Outlet />
    </main>
  </div>
);

// ✅ MAIN APP ROUTES
const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignInPage />} />

      {/* Wrapped with header */}
      <Route element={<Shell />}>
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/unit/:unitId" element={<UnitPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Route>

      {/* Redirect unknown */}
      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
    </Routes>
  );
};

// Router wrapper
const AppWrapper = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWrapper;
