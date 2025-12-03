
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProgressStore } from '../store/stores';
import { FlameIcon, StarIcon, Logo } from './Icons';
import { useAuth } from '../services/AuthContext';

export const Header = () => {
  const { user } = useAuth();
  const { xp, streakDays } = useProgressStore();
  const location = useLocation();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/unit/python-basics', label: 'Lessons' }
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
            <div className="hidden sm:flex items-center gap-2">
              <StarIcon className="w-5 h-5 text-yellow-400" />
              <span className="font-bold text-white">{xp}</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <FlameIcon className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-white">{streakDays}</span>
            </div>

            {/* Profile dropdown */}
            <ProfileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};

const ProfileMenu: React.FC = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  if (!user) return null;

  const initials = user.displayName ? user.displayName.split(' ').map(s => s[0]).join('').slice(0,2).toUpperCase() : (user.email || '').charAt(0).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(v => !v)} className="flex items-center gap-2 focus:outline-none">
        {user.photoURL ? (
          <img src={user.photoURL} alt="avatar" className="w-9 h-9 rounded-full" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-semibold">{initials}</div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-slate-700">
            <div className="font-semibold text-white">{user.displayName || user.email}</div>
            <div className="text-xs text-slate-400">{user.email}</div>
          </div>
          <div className="flex flex-col py-2">
            <button onClick={() => { setOpen(false); navigate('/profile'); }} className="text-left px-4 py-2 hover:bg-slate-700 text-slate-200">View account</button>
            <button onClick={async () => { setOpen(false); await signOut(); navigate('/'); }} className="text-left px-4 py-2 hover:bg-slate-700 text-slate-200">Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
};
