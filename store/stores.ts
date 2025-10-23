
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
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      streakDays: 0,
      lastCompletedDate: null,
      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),
      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const lastDate = get().lastCompletedDate;
        if (today === lastDate) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastDate === yesterdayStr) {
          set(state => ({ streakDays: state.streakDays + 1, lastCompletedDate: today }));
        } else {
          set({ streakDays: 1, lastCompletedDate: today });
        }
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
  loadLesson: (lesson: Lesson) => void;
  answerCurrent: (correct: boolean) => void;
  markCurrentAsComplete: () => void;
  nextItem: () => void;
  reset: () => void;
}

export const useLessonStore = create<LessonState>((set, get) => ({
  lesson: null,
  completedItemIds: new Set(),
  currentItemIndex: 0,
  attemptsForCurrent: 0,
  difficulty: 1,
  
  loadLesson: (lesson) => {
    const firstItem = lesson.items.find(item => item.difficulty === 1) || lesson.items[0];
    const firstItemIndex = lesson.items.indexOf(firstItem);
    set({ 
      lesson, 
      currentItemIndex: firstItemIndex, 
      difficulty: 1, 
      completedItemIds: new Set(),
      attemptsForCurrent: 0,
    });
  },

  answerCurrent: (correct) => {
    const { attemptsForCurrent, difficulty, lesson, currentItemIndex } = get();
    set({ attemptsForCurrent: attemptsForCurrent + 1 });

    if (correct && attemptsForCurrent === 0) {
      set({ difficulty: Math.min(difficulty + 1, 5) });
    } else if (!correct && attemptsForCurrent >= 1) {
      set({ difficulty: Math.max(difficulty - 1, 1) });
    }
    
    const currentItem = lesson?.items[currentItemIndex];
    if (currentItem) {
        set(state => ({ completedItemIds: new Set(state.completedItemIds).add(currentItem.id) }));
    }
  },
  
  markCurrentAsComplete: () => {
    const { lesson, currentItemIndex } = get();
    const currentItem = lesson?.items[currentItemIndex];
    if (currentItem) {
        set(state => ({ completedItemIds: new Set(state.completedItemIds).add(currentItem.id) }));
    }
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

  reset: () => set({ lesson: null, completedItemIds: new Set(), currentItemIndex: 0, attemptsForCurrent: 0, difficulty: 1 }),
}));
