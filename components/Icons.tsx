
import React from 'react';

export const FlameIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      d="M12 2C9.49 2 7.5 3.99 7.5 6.5C7.5 8.27 8.44 9.84 9.87 10.63C9.07 12.62 7.5 14.5 7.5 16.5C7.5 19.54 9.96 22 13 22C16.04 22 18.5 19.54 18.5 16.5C18.5 14.77 17.7 13.25 16.5 12.12C17.88 11.23 18.5 9.77 18.5 8.5C18.5 5.46 16.04 2 13 2H12Z"
      opacity=".5"
    />
    <path d="M13.5 2C11.5 2 10 3.5 10 5.5C10 6.88 10.65 8.05 11.63 8.88C11.13 10.13 10 11.5 10 13.5C10 15.43 11.57 17 13.5 17C15.43 17 17 15.43 17 13.5C17 12.12 16.35 10.95 15.37 10.12C16.1 9.5 16.5 8.5 16.5 7.5C16.5 4.46 15.04 2 13.5 2Z" />
  </svg>
);

export const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export const CheckCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const XCircleIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LightbulbIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.311a7.5 7.5 0 01-7.5 0c-1.421-.69-2.5-1.9-2.5-3.411v-1.5a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v1.5c0 1.511-1.079 2.721-2.5 3.411z" />
    </svg>
);

export const Logo = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
        <path fill="none" d="M0 0h256v256H0z"/>
        <path fill="currentColor" className="text-emerald-500" d="m96.3 72.3 80-48a8 8 0 0 1 11.4 8.3l-48 80a8.1 8.1 0 0 1-10.7.7 8 8 0 0 1-.7-10.7l48-80-80 48a8 8 0 0 1-10-10Z"/>
        <path fill="currentColor" className="text-sky-500" d="M159.7 183.7 80 232a8 8 0 0 1-11.4-8.3l48.3-79.7a8.1 8.1 0 0 1 10.7-.7 8 8 0 0 1 .7 10.7l-48.3 79.7 79.7-48.3a8 8 0 0 1 10 10Z"/>
    </svg>
);

export const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const TrophyIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 011.875-5.618m-1.875 5.618a9.75 9.75 0 01-1.875-5.618m11.625 5.618c.097-.245.187-.497.264-.756m-11.888 0c-.077.259-.167.511-.264.756M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
  </svg>
);

export const LockClosedIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H4.5a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);
