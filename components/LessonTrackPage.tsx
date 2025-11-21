import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUnit } from '../services/api';
import { Unit, LessonSummary } from '../types';
import { useProgressStore } from '../store/stores';
import { LockClosedIcon, StarIcon } from './Icons';
import { motion } from 'framer-motion';

// Fix: Extracted inline props to a named interface to prevent TypeScript errors with the special 'key' prop.
interface LessonCardProps {
    lesson: LessonSummary;
    userXp: number;
    isFirst: boolean;
}

const LessonCard = ({ lesson, userXp, isFirst }: LessonCardProps) => {
    const isUnlocked = userXp >= lesson.xpRequired;
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <motion.div variants={cardVariants}>
            <div className={`relative p-6 rounded-lg transition-all duration-300 ${isUnlocked ? 'bg-slate-800 hover:bg-slate-700/50 hover:shadow-lg' : 'bg-slate-800/50'}`}>
                {isUnlocked ? (
                    <Link to={`/lessons/${lesson.id}`} className="flex flex-col h-full">
                        <div className="flex-grow">
                             <div className="flex items-center justify-between mb-2">
                                <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                                {isFirst && <span className="text-xs font-semibold bg-sky-500/20 text-sky-300 px-2 py-1 rounded-full">Start Here</span>}
                            </div>
                            <p className="text-sm text-slate-400 mb-4">{lesson.totalItems} steps</p>
                        </div>
                        <div className="mt-auto">
                            <span className="w-full text-center bg-emerald-600 text-white font-semibold py-2 px-4 rounded-md inline-block hover:bg-emerald-500 transition-colors">
                                Start Lesson
                            </span>
                        </div>
                    </Link>
                ) : (
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
                                <StarIcon className="w-4 h-4" />
                                <span>{lesson.xpRequired} XP to Unlock</span>
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
    const { xp } = useProgressStore();
    const [unit, setUnit] = useState<Unit | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUnit = async () => {
            if (unitId) {
                try {
                    const data = await getUnit(unitId);
                    setUnit(data);
                } catch (error) {
                    console.error("Failed to fetch unit:", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchUnit();
    }, [unitId]);

    if (loading) {
        return <div className="p-8 text-center">Loading learning unit...</div>;
    }

    if (!unit) {
        return <div className="p-8 text-center text-red-500">Could not find this learning unit.</div>;
    }

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
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 tracking-tight mb-2">{unit.title}</h1>
                <p className="text-slate-400 max-w-2xl">{unit.description}</p>
            </motion.div>
            
            <motion.div 
                className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {unit.lessons.map((lesson, index) => (
                    <LessonCard key={lesson.id} lesson={lesson} userXp={xp} isFirst={index === 0} />
                ))}
            </motion.div>
        </div>
    );
};
