import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getAllLessons, groupLessonsByBelt, skipLesson } from '../services/api';
import { Unit, LessonSummary } from '../types';
import { useProgressStore } from '../store/stores';
import { LockClosedIcon, StarIcon, FastForwardIcon } from './Icons';
import { motion } from 'framer-motion';
import { useAuth } from '../services/AuthContext';


// Fix: Extracted inline props to a named interface to prevent TypeScript errors with the special 'key' prop.
interface LessonCardProps {
    key?: React.Key;
    lesson: LessonSummary;
    isUnlocked: boolean;
    isCompleted: boolean;
    onSkip: (lessonId: string) => void;
}

const LessonCard = ({ lesson, isUnlocked, isCompleted, onSkip }: LessonCardProps) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const handleSkipClick = (e: React.MouseEvent) => {
        e.preventDefault(); // Stop the Link from navigating
        e.stopPropagation(); // Stop click events from bubbling up
        if (window.confirm("Are you sure you want to skip this lesson? You will be awarded the full XP.")) {
            onSkip(lesson.id);
        }
    };

    return (
        <motion.div variants={cardVariants}>
            <div className={`relative p-6 rounded-lg transition-all duration-300 ${isUnlocked ? 'bg-slate-800 hover:bg-slate-700/50 hover:shadow-lg' : 'bg-slate-800/50'}`}>
                {isUnlocked ? (
                    <Link to={`/lessons/${lesson.id}`} className="flex flex-col h-full">
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                                {isCompleted && (
                                    <span className="text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">Completed</span>
                                )}
                            </div>
                            <p className="text-sm text-slate-400 mb-4">{lesson.totalItems} steps</p>
                        </div>
                        <div className="mt-auto flex items-center gap-2">
                            <span className={`w-full text-center text-white font-semibold py-2 px-4 rounded-md inline-block transition-colors ${isCompleted ? 'bg-slate-700 hover:bg-slate-600' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
                                {isCompleted ? 'Review Lesson' : 'Start Lesson'}
                            </span>
                            {/* Add Skip button only if unlocked and not completed */}
                            {!isCompleted && (
                                <button 
                                    onClick={handleSkipClick}
                                    title="Skip Lesson"
                                    className="flex-shrink-0 p-2 bg-slate-700 text-slate-400 rounded-md hover:bg-slate-600 hover:text-white transition-colors"
                                >
                                    <FastForwardIcon className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </Link>
                ) : (
                    // This is the "Locked" card state
                    <div className="flex flex-col h-full opacity-60">
                        <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-slate-400">{lesson.title}</h3>
                                <LockClosedIcon className="w-5 h-5 text-slate-500" />
                            </div>
                            <p className="text-sm text-slate-500 mb-4">{lesson.totalItems} steps</p>
                        </div>
                        <div className="mt-auto">
                            <div className="w-full text-center bg-slate-700 text-slate-400 font-semibold py-2 px-4 rounded-md flex items-center justify-center gap-2">
                                <LockClosedIcon className="w-4 h-4" />
                                <span>Locked</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export const UnitPage = () => {
    const { unitId } = useParams<{ unitId: string }>();
    const { xp, completedLessons, addCompletedLesson, addXP, setBelt, setStreak } = useProgressStore();
    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<Record<string, LessonSummary[]>>({});
    const [selectedBelt, setSelectedBelt] = useState<string>('all');
    const { user, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [permissionError, setPermissionError] = useState<string | null>(null);

    useEffect(() => {
        // Wait for auth to finish; only fetch lessons when user is signed in.
        const fetchData = async () => {
            setPermissionError(null);
            try {
                const lessons = await getAllLessons();
                const lessonGroups = groupLessonsByBelt(lessons);
                const summariesGroups: Record<string, LessonSummary[]> = {};
                Object.keys(lessonGroups).forEach((k) => {
                    summariesGroups[k] = lessonGroups[k].map(l => ({ id: l.id, title: l.title, xpRequired: 0, totalItems: l.items.length }));
                });
                setGroups(summariesGroups);
            } catch (error: any) {
                console.error("Failed to fetch lessons:", error);
                // detect permission error from Firebase
                if (error?.code === 'permission-denied' || /permission/i.test(String(error?.message || ''))) {
                    setPermissionError('Permission denied when reading lessons. Please sign in with an account that has access.');
                } else {
                    setPermissionError('Failed to load lessons. See console for details.');
                }
            } finally {
                setLoading(false);
            }
        };

        if (authLoading) {
            // still waiting for auth; do nothing yet
            return;
        }

        if (!user) {
            // user not signed in — do not fetch protected lessons
            setLoading(false);
            setGroups({});
            return;
        }

        fetchData();
    }, [unitId, user, authLoading]);

    const handleSkip = async (lessonId: string) => {
        if (!user) {
            alert("You must be logged in to skip a lesson.");
            return;
        }

        console.log(`Attempting to skip lesson: ${lessonId} for user: ${user.uid}`);

        try {
            // 1. Destructure all the new data
            const { xpAwarded, newBelt, streakDays, lastCompletedDate } = await skipLesson(user.uid, lessonId);

            // 2. Update local state store
            addXP(xpAwarded);
            addCompletedLesson(lessonId);
            setStreak(streakDays, lastCompletedDate); // <-- ADD THIS LINE

            // 3. Handle the new belt, if one was returned
            if (newBelt) {
                setBelt(newBelt);
                console.log(`Promoted to new belt: ${newBelt}`);
            }

            console.log(`Successfully skipped lesson, ${xpAwarded} XP awarded.`);

        } catch (error) {
            console.error("Failed to skip lesson:", error);
            alert("Error: Could not skip lesson. Please try again.");
        }
    };

    if (authLoading) {
        return <div className="p-8 text-center">Checking authentication...</div>;
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-slate-800 p-8 rounded-lg text-center max-w-lg">
                    <h2 className="text-2xl font-bold mb-2">Sign in to view lessons</h2>
                    <p className="text-slate-400 mb-4">Lessons are stored in the Firestore database and require authentication to access.</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => navigate('/signin')} className="bg-emerald-600 text-white px-4 py-2 rounded-md">Sign In</button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="p-8 text-center">Loading lessons...</div>;
    }

    // Flatten groups for a belt filter
    const beltKeys = Object.keys(groups).sort((a, b) => {
        // order belts by their lowest lesson number so belts appear in ascending lesson order
        const firstNum = (arr: LessonSummary[] = []) => {
            const m = arr[0]?.id?.match(/(\d+)/);
            return m ? Number(m[0]) : Number.MAX_SAFE_INTEGER;
        };
        return firstNum(groups[a]) - firstNum(groups[b]);
    });

    if (beltKeys.length === 0) {
        return <div className="p-8 text-center text-slate-400">No lessons found.</div>;
    }

    // compute total lessons count to detect fallback vs firestore
    const totalLessons = (Object.values(groups) as LessonSummary[][]).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0);
    const usingFallback = totalLessons < 10; // heuristic: if fewer than 10 lessons loaded, likely fallback

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 tracking-tight mb-2">All Lessons</h1>
                <p className="text-slate-400 max-w-2xl">Lessons are grouped by belt (color indicates difficulty/progression). Use the filter to view a single belt. All lessons are open for testing.</p>
            </motion.div>

            <div className="mt-6 flex items-center gap-4">
                <label className="text-sm text-slate-300">Filter by belt:</label>
                <select value={selectedBelt} onChange={(e) => setSelectedBelt(e.target.value)} className="bg-slate-800 text-slate-200 p-2 rounded-md">
                    <option value="all">All Belts</option>
                    {beltKeys.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
            </div>

            <div className="mt-10 space-y-8">
                {beltKeys.filter(b => selectedBelt === 'all' || selectedBelt === b).map((belt, beltIndex) => (
                    <motion.div key={belt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="">
                        <h2 className="text-2xl font-bold capitalize mb-4">{belt}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groups[belt].map((lesson, lessonIndex) => {
                                
                                let prevLessonId: string | null = null;
                                let isFirstLessonOfAll = false;

                                if (beltIndex === 0 && lessonIndex === 0) {
                                    // This is the very first lesson of the app.
                                    isFirstLessonOfAll = true;
                                } else if (lessonIndex > 0) {
                                    // This is a lesson in the middle of a belt.
                                    // Its predecessor is the previous lesson in the same belt.
                                    prevLessonId = groups[belt][lessonIndex - 1].id;
                                } else {
                                    // This is the first lesson of a new belt (beltIndex > 0 and lessonIndex === 0).
                                    // Its predecessor is the last lesson of the previous belt.
                                    const prevBeltKey = beltKeys[beltIndex - 1];
                                    const prevBeltLessons = groups[prevBeltKey];
                                    if (prevBeltLessons && prevBeltLessons.length > 0) {
                                        prevLessonId = prevBeltLessons[prevBeltLessons.length - 1].id;
                                    }
                                }

                                // A lesson is unlocked if it's the very first lesson, OR its predecessor is completed.
                                const isUnlocked = isFirstLessonOfAll || (prevLessonId && completedLessons.includes(prevLessonId));
                                
                                // Check if the current lesson is in the completed list
                                const isCompleted = completedLessons.includes(lesson.id);

                                return (
                                    <LessonCard 
                                        key={lesson.id} 
                                        lesson={lesson} 
                                        isUnlocked={isUnlocked} 
                                        isCompleted={isCompleted}
                                        onSkip={handleSkip} 
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
