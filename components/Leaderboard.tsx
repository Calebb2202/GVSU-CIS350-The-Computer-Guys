
import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../services/api';
import { TrophyIcon } from './Icons';

interface LeaderboardEntry {
    rank: number;
    user: string;
    xp: number;
}

export const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankColor = (rank: number) => {
        if (rank === 1) return 'text-yellow-400';
        if (rank === 2) return 'text-slate-300';
        if (rank === 3) return 'text-yellow-600';
        return 'text-slate-400';
    }

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex items-center gap-4 mb-8">
                <TrophyIcon className="w-10 h-10 text-yellow-400" />
                <div>
                    <h1 className="text-3xl font-bold">Leaderboard</h1>
                    <p className="text-slate-400">See how you stack up against other learners.</p>
                </div>
            </div>

            <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                    <div className="p-8 text-center text-slate-400">Loading leaderboard...</div>
                ) : (
                    <table className="w-full text-left">
                        <thead className="bg-slate-900/50">
                            <tr>
                                <th className="p-4 text-sm font-semibold text-slate-300 tracking-wider">Rank</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 tracking-wider">User</th>
                                <th className="p-4 text-sm font-semibold text-slate-300 tracking-wider text-right">XP</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, index) => (
                                <tr key={entry.rank} className="border-t border-slate-700 hover:bg-slate-700/50 transition-colors">
                                    <td className={`p-4 font-bold text-lg w-24 ${getRankColor(entry.rank)}`}>{entry.rank}</td>
                                    <td className="p-4 font-medium text-white">{entry.user}</td>
                                    <td className="p-4 font-semibold text-sky-400 text-right">{entry.xp.toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};
