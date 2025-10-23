
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getLesson, checkAnswer } from '../services/api';
import { getHint } from '../services/geminiService';
import { useLessonStore, useProgressStore } from '../store/stores';
import { LessonItem } from '../types';
import { CheckCircleIcon, XCircleIcon, LightbulbIcon, BookOpenIcon } from './Icons';

// --- Sub-components defined outside the main component ---

const ProgressBar = ({ current, total }: { current: number, total: number }) => {
    const progress = total > 0 ? (current / total) * 100 : 0;
    return (
        <div className="w-full bg-slate-700 rounded-full h-4">
            <motion.div
                className="bg-emerald-500 h-4 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
};

const ConceptCard = ({ item, onContinue }: { item: LessonItem, onContinue: () => void }) => {
    return (
        <div className="text-left bg-slate-800 p-6 sm:p-8 rounded-lg max-w-3xl mx-auto animate-fade-in">
             <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="w-6 h-6 text-sky-400" />
                <h3 className="text-2xl font-bold text-emerald-400">{item.prompt}</h3>
            </div>
            <div className="prose prose-invert max-w-none text-slate-300 space-y-4">
                {item.content?.split('\n').map((paragraph, i) => <p key={i}>{paragraph}</p>)}
                {item.code && (
                     <div className="bg-slate-900/70 p-4 rounded-md my-4">
                        <pre><code className="language-python text-slate-300 whitespace-pre-wrap">{item.code}</code></pre>
                    </div>
                )}
            </div>
            <button onClick={onContinue} className="mt-8 w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-500 transition-colors">
                Got it, Continue!
            </button>
        </div>
    );
};

const MultipleChoice = ({ item, onSubmit, disabled }: { item: LessonItem, onSubmit: (value: string) => void, disabled: boolean }) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedValue) {
            onSubmit(selectedValue);
            setSelectedValue(null);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-3">
                {item.choices?.map((choice, index) => (
                    <label key={index} className={`block p-4 rounded-lg border-2 transition-all cursor-pointer ${selectedValue === choice ? 'bg-sky-500/20 border-sky-500' : 'bg-slate-800 border-slate-700 hover:border-slate-500'}`}>
                        <input
                            type="radio"
                            name={item.id}
                            value={choice}
                            checked={selectedValue === choice}
                            onChange={(e) => setSelectedValue(e.target.value)}
                            className="hidden"
                            disabled={disabled}
                        />
                        <span className="font-mono text-slate-200">{choice}</span>
                    </label>
                ))}
            </div>
            <button type="submit" disabled={!selectedValue || disabled} className="mt-6 w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                Check
            </button>
        </form>
    );
};

const FillBlank = ({ item, onSubmit, disabled }: { item: LessonItem, onSubmit: (value: string) => void, disabled: boolean }) => {
    const [value, setValue] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSubmit(value);
            setValue('');
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            {item.code && (
                <div className="bg-slate-900/70 p-4 rounded-md mb-4 text-left">
                    <pre><code className="language-python text-slate-300">{item.code.replace('____', ' '.repeat(4))}</code></pre>
                </div>
            )}
            <input 
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your answer here"
                disabled={disabled}
                className="w-full font-mono bg-slate-800 border-2 border-slate-700 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-200"
            />
             <button type="submit" disabled={!value.trim() || disabled} className="mt-6 w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors">
                Check
            </button>
        </form>
    );
}

// --- Main Lesson Page Component ---

export const LessonPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { lesson, currentItemIndex, completedItemIds, loadLesson, answerCurrent, markCurrentAsComplete, nextItem, reset } = useLessonStore();
    const { addXP, updateStreak } = useProgressStore();
    
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hint, setHint] = useState<string | null>(null);
    const [isHintLoading, setIsHintLoading] = useState(false);

    useEffect(() => {
        const initLesson = async () => {
            if (id) {
                try {
                    const lessonData = await getLesson(id);
                    loadLesson(lessonData);
                } catch (error) {
                    console.error("Failed to load lesson:", error);
                    navigate('/dashboard');
                } finally {
                    setIsLoading(false);
                }
            }
        };
        initLesson();
        return () => reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, loadLesson, navigate, reset]);

    const currentItem = lesson?.items[currentItemIndex];
    const lessonComplete = lesson && completedItemIds.size === lesson.items.length;

    const handleGetHint = async () => {
        if (!currentItem) return;
        setIsHintLoading(true);
        setHint(null);
        try {
            const generatedHint = await getHint(currentItem.prompt, currentItem.code);
            setHint(generatedHint);
        } catch (error) {
            setHint("Could not fetch hint.");
        } finally {
            setIsHintLoading(false);
        }
    }

    const handleSubmit = useCallback(async (value: string) => {
        if (!id || !currentItem) return;
        
        setIsSubmitting(true);
        setHint(null);
        const result = await checkAnswer({ lessonId: id, itemId: currentItem.id, value });
        setIsSubmitting(false);

        answerCurrent(result.correct);
        setFeedback(result.feedback);

        if (result.correct) {
            setStatus('correct');
            addXP(result.xpDelta);
            updateStreak();
        } else {
            setStatus('incorrect');
        }

    }, [id, currentItem, answerCurrent, addXP, updateStreak]);
    
    const handleConceptContinue = () => {
        markCurrentAsComplete();
        nextItem();
    }

    const handleContinue = () => {
        setStatus('idle');
        setFeedback('');
        setHint(null);
        if(lessonComplete) {
            navigate('/unit/python-basics');
        } else {
            nextItem();
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><div className="text-xl">Loading Lesson...</div></div>;
    }

    if (!lesson || !currentItem) {
        return <div className="flex justify-center items-center h-screen"><div className="text-xl text-red-500">Lesson not found.</div></div>;
    }

    if(lessonComplete) {
        return (
            <div className="flex flex-col justify-center items-center h-screen text-center p-4">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <CheckCircleIcon className="w-24 h-24 text-emerald-500 mx-auto" />
                    <h1 className="text-4xl font-bold mt-4">Lesson Complete!</h1>
                    <p className="text-slate-400 mt-2">You've mastered {lesson.title}. Great job!</p>
                    <button onClick={() => navigate('/unit/python-basics')} className="mt-8 bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-emerald-500 transition-colors">
                        Back to Unit
                    </button>
                </motion.div>
            </div>
        )
    }
    
    const QuestionComponent = currentItem.type === 'mcq' || currentItem.type === 'debug' ? MultipleChoice : FillBlank;
    
    return (
        <div className="flex flex-col h-screen max-h-screen">
            <div className="container mx-auto px-4 py-4 flex-shrink-0">
                <ProgressBar current={completedItemIds.size} total={lesson.items.length} />
            </div>
            <div className="flex-grow flex items-center justify-center p-4">
                 <AnimatePresence mode="wait">
                    <motion.div
                        key={currentItem.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {currentItem.type === 'concept' ? (
                            <ConceptCard item={currentItem} onContinue={handleConceptContinue} />
                        ) : (
                            <div className="w-full max-w-2xl mx-auto">
                                <h2 className="text-2xl font-bold text-center mb-2">{currentItem.prompt}</h2>
                                {currentItem.code && currentItem.type !== 'fill' && (
                                    <div className="bg-slate-900/70 p-4 rounded-md my-4 text-left">
                                        <pre><code className="language-python text-slate-300">{currentItem.code}</code></pre>
                                    </div>
                                )}

                                <div className="mt-6">
                                    <QuestionComponent item={currentItem} onSubmit={handleSubmit} disabled={isSubmitting || status !== 'idle'}/>
                                </div>
                                
                                <div className="text-center mt-4">
                                    <button onClick={handleGetHint} disabled={isHintLoading || status !== 'idle'} className="flex items-center gap-2 mx-auto text-sm text-sky-400 hover:text-sky-300 disabled:text-slate-500 transition-colors">
                                        <LightbulbIcon className="w-4 h-4" />
                                        {isHintLoading ? 'Getting hint...' : 'Get a hint from AI'}
                                    </button>
                                    {hint && <p className="text-slate-400 text-sm mt-2">{hint}</p>}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AnimatePresence>
            {status !== 'idle' && (
                <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`fixed bottom-0 left-0 right-0 p-4 border-t-4 ${status === 'correct' ? 'bg-emerald-900/90 border-emerald-500' : 'bg-red-900/90 border-red-500'}`}
                >
                    <div className="container mx-auto flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            {status === 'correct' ? <CheckCircleIcon className="w-8 h-8 text-emerald-500" /> : <XCircleIcon className="w-8 h-8 text-red-500" />}
                            <div>
                                <h3 className="font-bold text-lg">{status === 'correct' ? 'Correct!' : 'Incorrect'}</h3>
                                <p className="text-sm">{feedback}</p>
                            </div>
                        </div>
                        <button onClick={handleContinue} className={`font-bold py-2 px-8 rounded-lg transition-colors ${status === 'correct' ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-red-500 hover:bg-red-400'}`}>
                            Continue
                        </button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </div>
    );
};
