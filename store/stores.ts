
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile, Lesson, LessonItem } from '../types';

// User Store
interface UserState {
  user: Profile | null;
  signIn: (email: string) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      signIn: (email) => set({
        user: {
          userId: 'mock-user-123',
          email: email,
          displayName: email.split('@')[0],
          xp: 0, // Start new users with 0 XP
          streakDays: 0,
          badges: [],
        },
      }),
      signOut: () => set({ user: null }),
    }),
    { name: 'syntax-sensei-user' }
  )
);

// Progress Store
interface ProgressState {
  xp: number;
  streakDays: number;
  lastCompletedDate: string | null;
  completedLessons: string[]; 
  belt: string;
  xpByDay: Record<string, number>;
  addXP: (amount: number) => void;
  setStreak: (days: number, lastDate: string) => void;
  addCompletedLesson: (lessonId: string) => void; 
  setBelt: (belt: string) => void;
  loadProgress: (data: Partial<ProgressState>) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streakDays: 0,
      lastCompletedDate: null,
      completedLessons: [],
      belt: 'white',
  xpByDay: {},
      
      addXP: (amount) => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const prev = state.xpByDay || {};
        const todayPrev = prev[today] || 0;
        return { xp: state.xp + amount, xpByDay: { ...prev, [today]: todayPrev + amount } };
      }),
      
      setStreak: (days, lastDate) => {
        set({ streakDays: days, lastCompletedDate: lastDate });
      },
      
      addCompletedLesson: (lessonId) => {
        set((state) => ({
          completedLessons: [...state.completedLessons, lessonId]
        }));
      },
      
      setBelt: (belt) => set({ belt }),

      loadProgress: (data) => {
        set((state) => ({ ...state, ...data }));
      },
    }),
    { name: 'syntax-sensei-progress' }
  )
);

// Lesson Store
interface LessonState {
  lesson: Lesson | null;
  completedItemIds: Set<string>;
  currentItemIndex: number;
  attemptsForCurrent: number;
  difficulty: number; // 1 to 5
  responses: Record<string, { correct: boolean; attempts: number; lastSubmitted?: string }>;
  loadLesson: (lesson: Lesson) => void;
  answerCurrent: (correct: boolean, submitted?: string) => void;
  markCurrentAsComplete: () => void;
  nextItem: () => void;
  retryItems: (ids: string[]) => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lesson: null,
  completedItemIds: new Set(),
  currentItemIndex: 0,
  attemptsForCurrent: 0,
  difficulty: 1,
  responses: {},
  
  loadLesson: (lesson) => {
    const firstItem = lesson.items.find(item => item.difficulty === 1) || lesson.items[0];
    const firstItemIndex = lesson.items.indexOf(firstItem);
    set({ 
      lesson, 
      currentItemIndex: firstItemIndex, 
      difficulty: 1, 
      completedItemIds: new Set(),
      attemptsForCurrent: 0,
      responses: {},
    });
  },
  answerCurrent: (correct, submitted) => {
    const { attemptsForCurrent, difficulty, lesson, currentItemIndex, responses } = get();
    set({ attemptsForCurrent: attemptsForCurrent + 1 });

    if (correct && attemptsForCurrent === 0) {
      set({ difficulty: Math.min(difficulty + 1, 5) });
    } else if (!correct && attemptsForCurrent >= 1) {
      set({ difficulty: Math.max(difficulty - 1, 1) });
    }

    const currentItem = lesson?.items[currentItemIndex];
    if (currentItem) {
      const prev = responses[currentItem.id];
      const nextAttempts = (prev?.attempts || 0) + 1;
      set(state => ({ responses: { ...state.responses, [currentItem.id]: { correct, attempts: nextAttempts, lastSubmitted: submitted } } }));
    }

    // NOTE: do NOT mark the current item as completed here. We want to show
    // correctness feedback to the user first; the item will be marked completed
    // when the user clicks Continue (see LessonPage.handleContinue).
  },
  
  markCurrentAsComplete: () => {
    const { lesson, currentItemIndex } = get();
    const currentItem = lesson?.items[currentItemIndex];
    if (currentItem) {
        set(state => ({ completedItemIds: new Set(state.completedItemIds).add(currentItem.id) }));
    }
  },

  retryItems: (ids: string[]) => {
    const { lesson } = get();
    if (!lesson) return;
    set(state => {
      const nextCompleted = new Set(state.completedItemIds);
      const nextResponses = { ...state.responses };
      ids.forEach(id => {
        nextCompleted.delete(id);
        if (id in nextResponses) delete nextResponses[id];
      });

      let nextIndex = state.currentItemIndex;
      if (ids.length > 0) {
        const firstId = ids[0];
        const idx = lesson.items.findIndex(i => i.id === firstId);
        if (idx >= 0) nextIndex = idx;
      }

      return { completedItemIds: nextCompleted, responses: nextResponses, currentItemIndex: nextIndex, attemptsForCurrent: 0 };
    });
  },

  nextItem: () => {
    const { lesson, completedItemIds, difficulty } = get();
    if (!lesson) return;
    
    let availableItems = lesson.items.filter(item => !completedItemIds.has(item.id));

    if(availableItems.length === 0) {
        // Lesson complete, handle this case in the component
        return;
    }

    // Try to find an item with matching difficulty
    let nextItems = availableItems.filter(item => item.difficulty === difficulty);
    if (nextItems.length === 0) {
      // Fallback: find the closest difficulty
      nextItems = availableItems.sort((a, b) => Math.abs(a.difficulty - difficulty) - Math.abs(b.difficulty - difficulty));
    }
    
    if (nextItems.length > 0) {
        const nextItem = nextItems[0];
        const nextIndex = lesson.items.findIndex(item => item.id === nextItem.id);
        set({ currentItemIndex: nextIndex, attemptsForCurrent: 0 });
    } else {
        // Should not happen if availableItems is not empty
        console.error("Could not find a next item.");
    }
  },

  reset: () => set({ lesson: null, completedItemIds: new Set(), currentItemIndex: 0, attemptsForCurrent: 0, difficulty: 1, responses: {} }),
}));
