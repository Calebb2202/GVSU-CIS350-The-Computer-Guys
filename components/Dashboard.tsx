import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useUserStore, useProgressStore } from '../store/stores';
import { FlameIcon, StarIcon, BookOpenIcon } from './Icons';
import { MOCK_XP_DATA } from '../constants';

const StatCard = ({ icon, label, value, colorClass }: { icon: React.ReactNode, label: string, value: string | number, colorClass: string }) => (
    <div className="bg-slate-800 p-6 rounded-lg flex items-center gap-4">
        <div className={`w-12 h-12 rounded-md flex items-center justify-center ${colorClass}`}>
            {icon}
        </div>
        <div>
            <div className="text-slate-400 text-sm">{label}</div>
            <div className="text-2xl font-bold text-white">{value}</div>
        </div>
    </div>
);

export const Dashboard = () => {
    const { user } = useUserStore();
    const { xp, streakDays } = useProgressStore();

    if (!user) {
        return <div className="p-8 text-center">Loading user data...</div>;
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user.displayName}!</h1>
            <p className="text-slate-400 mb-8">Let's make some progress today.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard 
                    icon={<StarIcon className="w-6 h-6 text-yellow-300" />}
                    label="Total XP"
                    value={xp}
                    colorClass="bg-yellow-500/20"
                />
                <StatCard 
                    icon={<FlameIcon className="w-6 h-6 text-orange-400" />}
                    label="Daily Streak"
                    value={`${streakDays} Days`}
                    colorClass="bg-orange-500/20"
                />
                 <StatCard 
                    icon={<BookOpenIcon className="w-6 h-6 text-sky-400" />}
                    label="Current Track"
                    value="Python Basics"
                    colorClass="bg-sky-500/20"
                />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-lg">
                     <h2 className="text-xl font-bold mb-4">Weekly XP Progress</h2>
                     <div className="h-64 w-full">
                        <ResponsiveContainer>
                            <BarChart data={MOCK_XP_DATA} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                                <XAxis dataKey="day" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        borderColor: '#334155',
                                        borderRadius: '0.5rem',
                                    }}
                                    labelStyle={{ color: '#cbd5e1' }}
                                />
                                <Bar dataKey="xp" fill="#22c55e" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                     </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-600 to-green-700 p-6 rounded-lg flex flex-col items-start justify-center text-white">
                    <h2 className="text-2xl font-bold">Continue Your Journey</h2>
                    <p className="mt-2 mb-4 text-green-100">Pick up where you left off in Python Basics.</p>
                    <Link
                        to="/unit/python-basics"
                        className="bg-white text-emerald-700 font-semibold px-6 py-2 rounded-md hover:bg-green-100 transition-all"
                    >
                        View Lessons
                    </Link>
                </div>
            </div>
        </div>
    );
};