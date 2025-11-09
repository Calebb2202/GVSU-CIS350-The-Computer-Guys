
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useProgressStore } from '../store/stores';
import { FlameIcon, StarIcon, Logo } from './Icons';
import { useAuth } from '../services/AuthContext';

export const Header = () => {
  const { user } = useAuth();
  const { xp, streakDays } = useProgressStore();
  const location = useLocation();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/unit/python-basics', label: 'Lessons' },
    { href: '/leaderboard', label: 'Leaderboard' },
  ];

  if (!user) {
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                        <Logo className="h-8 w-8" />
                        Syntax Sensei
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="/signin" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                            Sign In
                        </Link>
                         <Link to="/signin" className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
  }

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold">
                <Logo className="h-8 w-8" />
                Syntax Sensei
            </Link>
            <div className="hidden md:flex items-center gap-6">
                {navItems.map(item => (
                    <Link 
                        key={item.href} 
                        to={item.href}
                        className={`text-sm font-medium transition-colors ${location.pathname.startsWith(item.href) ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-100'}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-white">{xp}</span>
            </div>
            <div className="flex items-center gap-2">
              <FlameIcon className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-white">{streakDays}</span>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
