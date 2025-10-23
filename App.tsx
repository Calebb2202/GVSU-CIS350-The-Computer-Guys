
import React from 'react';
import { HashRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useUserStore } from './store/stores';
import { LandingPage } from './components/LandingPage';
import { SignInPage } from './components/SignInPage';
import { Dashboard } from './components/Dashboard';
import { LessonPage } from './components/LessonPage';
import { Leaderboard } from './components/Leaderboard';
import { Header } from './components/Header';
import { UnitPage } from './components/LessonTrackPage';

const ProtectedRoute = () => {
  const { user } = useUserStore();
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
};

const MainLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
            <Outlet />
        </main>
    </div>
);

const App = () => {
    const { user } = useUserStore();

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
             <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signin" element={<SignInPage />} />
                
                {/* Standalone lesson page doesn't need the main header */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/lessons/:id" element={<LessonPage />} />
                </Route>
                
                {/* Routes with the main header */}
                <Route element={<MainLayout />}>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/unit/:unitId" element={<UnitPage />} />
                        <Route path="/leaderboard" element={<Leaderboard />} />
                    </Route>
                </Route>
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to={user ? "/dashboard" : "/"} replace />} />
            </Routes>
        </div>
    );
};

const AppWrapper = () => (
    <HashRouter>
        <App />
    </HashRouter>
)

export default AppWrapper;
