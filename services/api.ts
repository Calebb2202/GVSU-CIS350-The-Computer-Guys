
import { Lesson, AnswerPayload, CheckResult, Unit, LessonItem } from '../types';
import { PYTHON_LESSON_1, PYTHON_LESSON_2, PYTHON_LESSON_3, PYTHON_BASICS_UNIT, MOCK_LEADERBOARD } from '../constants';
import { db } from './firebase';
import { doc, getDoc, collection, getDocs, query, where, updateDoc, increment, arrayUnion } from 'firebase/firestore';
// Static JSON fallback: when Firestore is inaccessible due to security rules during
// development, you can paste your Firestore lesson export into
// `artifacts/firestore_lessons.json` and the app will load lessons from there.
import staticLessons from '../artifacts/firestore_lessons.json';

// in-memory fallback for local/dev
const lessonsFallback: Record<string, Lesson> = {
  'python-basics-1': PYTHON_LESSON_1,
  'python-basics-2': PYTHON_LESSON_2,
  'python-basics-3': PYTHON_LESSON_3,
};

const unitsFallback: Record<string, Unit> = {
  'python-basics': PYTHON_BASICS_UNIT,
};

function mapBeltToTrack(belt: string | undefined): 'beginner' | 'refresh' | 'interview' {
  if (!belt) return 'beginner';
  const b = belt.toLowerCase();
  if (b === 'white' || b === 'yellow' || b === 'green') return 'beginner';
  if (b === 'blue' || b === 'brown') return 'refresh';
  return 'interview';
}

function parseFirestoreLesson(id: string, data: any): Lesson {
  const items: LessonItem[] = [];

  // top-level content -> first concept card
  if (data.content) {
    items.push({
      id: `concept-0`,
      type: 'concept',
      prompt: data.title || 'Introduction',
      content: data.content,
      difficulty: 1,
    });
  }

  const questions = Array.isArray(data.questions) ? data.questions : [];
  questions.forEach((q: any, idx: number) => {
    const qtype = (q.type || '').toLowerCase();
    let itemType: LessonItem['type'] = 'mcq';
    if (qtype === 'fill-in-blank' || qtype === 'fill') itemType = 'fill';
    if (qtype === 'debug') itemType = 'debug';
    if (qtype === 'concept') itemType = 'concept';

    const item: LessonItem = {
      id: `q-${idx + 1}`,
      type: itemType,
      prompt: q.prompt || q.question || `Question ${idx + 1}`,
      code: q.code,
      choices: Array.isArray(q.options) ? q.options : undefined,
      correct: q.answer,
      explanation: q.explanation,
      difficulty: q.difficulty || 2,
    };

    items.push(item);
  });

  return {
    id,
    title: data.title || id,
    track: mapBeltToTrack(data.belt),
    items,
  };
}

export const getUnit = async (id: string): Promise<Unit> => {
  // try Firestore first
  try {
    const snap = await getDoc(doc(db, 'units', id));
    if (snap.exists()) {
      const data = snap.data();
      // assume data.lessons is already in the LessonSummary shape stored in Firestore
      return { id, title: data.title || id, description: data.description || '', lessons: data.lessons || [] } as Unit;
    }
  } catch (err) {
    console.warn('Failed to fetch unit from Firestore, falling back to local unit:', err);
  }

  // fallback
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (unitsFallback[id]) resolve(unitsFallback[id]);
      else reject(new Error('Unit not found'));
    }, 300);
  });
};

export const getLesson = async (id: string): Promise<Lesson> => {
  // try firestore doc with that id
  try {
    const snap = await getDoc(doc(db, 'lessons', id));
    if (snap.exists()) {
      console.log(`Loaded lesson from Firestore (by id): ${id}`);
      return parseFirestoreLesson(id, snap.data());
    }

    // If direct doc lookup failed, try to be helpful: if the id contains a number,
    // try querying Firestore for a lesson with that `lessonNum` field (many of our
    // Firestore docs use lessonNum). This allows links that use local mock ids
    // (e.g. `python-basics-1`) to still match Firestore docs that use a different
    // doc id but have `lessonNum: 1`.
    const numMatch = id.match(/(\d+)/);
    if (numMatch) {
      const lessonNum = Number(numMatch[0]);
      try {
        const q = query(collection(db, 'lessons'), where('lessonNum', '==', lessonNum));
        const res = await getDocs(q);
        if (!res.empty) {
          const first = res.docs[0];
          console.log(`Loaded lesson from Firestore (by lessonNum=${lessonNum}): ${first.id}`);
          return parseFirestoreLesson(first.id, first.data());
        }
      } catch (err) {
        console.warn('Failed to query lessons by lessonNum:', err);
      }
    }
  } catch (err) {
    console.warn('Failed to fetch lesson from Firestore, falling back to local lesson:', err);
  }

  // fallback to in-memory lessons for local/dev
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lessonsFallback[id]) resolve(lessonsFallback[id]);
      else reject(new Error('Lesson not found'));
    }, 500);
  });
};

export const checkAnswer = async (payload: AnswerPayload): Promise<CheckResult> => {
  // ensure we can get the lesson (from Firestore or fallback)
  const lesson = await getLesson(payload.lessonId);
  const item = lesson.items.find((i) => i.id === payload.itemId || i.id === payload.itemId.replace(/^q-/, 'q-'));
  if (!item || !item.correct) throw new Error('Item not found or is not a quiz question.');

  const submittedValue = payload.value.trim().toLowerCase();
  const correctVal = item.correct;
  const isCorrect = Array.isArray(correctVal)
    ? correctVal.map((c) => `${c}`.toLowerCase()).includes(submittedValue)
    : `${correctVal}`.toLowerCase() === submittedValue;

  return {
    correct: isCorrect,
    correctAnswer: item.correct as string | string[],
    feedback: isCorrect ? 'Great job!' : item.explanation || "That's not quite right.",
    xpDelta: isCorrect ? 10 : 0,
  };
};

export const getLeaderboard = async (): Promise<Array<{ rank: number; user: string; xp: number }>> => {
  // For now return mock leaderboard; can be replaced with Firestore collection read later
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_LEADERBOARD);
    }, 800);
  });
};

/**
 * Fetch all lessons from Firestore (or fallback) and return as Lesson[]
 */
export const getAllLessons = async (): Promise<Lesson[]> => {
  const triedCollections = ['lessons', 'Lessons', 'lesson'];
  for (const col of triedCollections) {
    try {
      const snaps = await getDocs(collection(db, col));
      const out: Lesson[] = [];
      snaps.forEach((d) => {
        try {
          out.push(parseFirestoreLesson(d.id, d.data()));
        } catch (err) {
          console.warn('Failed to parse lesson doc', d.id, err);
        }
      });

      if (out.length > 0) {
        console.log(`Loaded ${out.length} lessons from Firestore collection '${col}'`);
        return out;
      } else {
        console.warn(`No lessons found in Firestore collection '${col}'. Trying next collection name.`);
      }
    } catch (err) {
      console.warn(`Failed to fetch lessons from Firestore collection '${col}':`, err);
    }
  }

  // Try static JSON fallback (helpful for local testing when Firestore rules block reads)
  try {
    const staticDocs: any[] = Array.isArray(staticLessons) ? (staticLessons as any[]) : [];
    if (staticDocs.length > 0) {
      const parsed: Lesson[] = staticDocs
        .map((d) => {
          try {
            // allow either shape: { id: 'lesson-1-white', ...fields } or full doc object
            if (d && d.id) return parseFirestoreLesson(d.id, d);
            // fallback if someone exported with `doc` wrapper
            if (d && d.doc && d.doc.id) return parseFirestoreLesson(d.doc.id, d.doc);
          } catch (err) {
            console.warn('Failed to parse static lesson entry', d, err);
          }
          return null;
        })
        .filter(Boolean) as Lesson[];

      if (parsed.length > 0) {
        console.log(`Loaded ${parsed.length} lessons from static JSON fallback`);
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to load static fallback lessons:', err);
  }

  // fallback to in-memory lessons
  return Object.values(lessonsFallback);
};

/**
 * Group lessons by belt (data.belt) and sort within each group by lessonNum (if present)
 */
export const groupLessonsByBelt = (lessons: Lesson[]) => {
  const groups: Record<string, Lesson[]> = {};

  const extractLessonNum = (lesson: Lesson) => {
    // parse the first number in the id, e.g. lesson-10-orange -> 10
    const match = lesson.id.match(/(\d+)/);
    return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
  };

  const extractBeltFromId = (lesson: Lesson) => {
    // try to parse pattern like 'lesson-10-orange' -> 'orange'
    const match = lesson.id.match(/-(?:\d+)-([a-zA-Z]+)/);
    if (match) return match[1].toLowerCase();
    // fallback: try to use a 'belt' or original track if present
    const maybeBelt = (lesson as any).belt || (lesson as any).track;
    return typeof maybeBelt === 'string' ? maybeBelt.toLowerCase() : 'uncategorized';
  };

  lessons.forEach((l) => {
    const key = extractBeltFromId(l);
    if (!groups[key]) groups[key] = [];
    groups[key].push(l);
  });

  // sort each group by numeric lesson number then by id
  Object.keys(groups).forEach((k) => {
    groups[k].sort((a, b) => {
      const na = extractLessonNum(a);
      const nb = extractLessonNum(b);
      if (na !== nb) return na - nb;
      return a.id.localeCompare(b.id);
    });
  });

  return groups;
};

/**
 * Allows a user to skip a lesson, granting them the full XP for it
 * and marking it as completed in their profile.
 * @param userId - The user's Firebase auth ID
 * @param lessonId - The ID of the lesson to skip
 * @returns The amount of XP awarded
 */
// --- NEW BELT PROMOTION LOGIC ---

// This helper function checks if a user should be promoted
const checkAndPromoteBelt = async (userId: string, userDocData: any, allLessons: Lesson[]) => {
    const currentBelt = userDocData.belt || 'white';
    const completedLessons = userDocData.completedLessons || [];

    const groups = groupLessonsByBelt(allLessons);
    
    // Create a stable belt order based on the sorting in groupLessonsByBelt
    const beltKeys = Object.keys(groups).sort((a, b) => {
        const firstNum = (arr: Lesson[] = []) => {
            // Use the lessonNum property if it exists, otherwise parse the ID
            const l = arr[0];
            if (!l) return Number.MAX_SAFE_INTEGER;
            // @ts-ignore
            if (l.lessonNum) return l.lessonNum; 
            const match = l.id.match(/(\d+)/);
            return match ? Number(match[0]) : Number.MAX_SAFE_INTEGER;
        };
        return firstNum(groups[a]) - firstNum(groups[b]);
    });

    const currentBeltLessons = groups[currentBelt] || [];
    // Check if all lessons for the *current* belt are now completed
    const allInBeltCompleted = currentBeltLessons.every(lesson => completedLessons.includes(lesson.id));

    if (allInBeltCompleted && currentBeltLessons.length > 0) {
        const currentBeltIndex = beltKeys.indexOf(currentBelt);
        // Check if there is a next belt to promote to
        if (currentBeltIndex > -1 && currentBeltIndex + 1 < beltKeys.length) {
            const nextBelt = beltKeys[currentBeltIndex + 1];
            const userRef = doc(db, 'users', userId);
            return nextBelt; // Return the new belt
        }
    }
    return null; // No promotion
};

// This is the new result type we'll return
export interface CompletionResult {
    xpAwarded: number;
    newBelt: string | null;
    streakDays: number;
    lastCompletedDate: string;
}

// Completing lesson logic
const completeLesson = async (userId: string, lessonId: string, xpToAward: number): Promise<CompletionResult> => {
    if (!userId) throw new Error("User not authenticated");

    const userRef = doc(db, 'users', userId);
    
    try {
        // 1. Get the user's CURRENT state first
        const userDocSnap = await getDoc(userRef);
        if (!userDocSnap.exists()) throw new Error("User document not found.");
        
        const userData = userDocSnap.data();

        // 2. Calculate new streak (logic moved from stores.ts)
        const today = new Date().toISOString().split('T')[0];
        const lastDate = userData.lastCompletedDate;
        let newStreakDays = userData.streakDays || 0;

        if (today !== lastDate) { // Only run if it's a new day
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];

            if (lastDate === yesterdayStr) {
                newStreakDays += 1; // Consecutive day
            } else {
                newStreakDays = 1; // Reset streak
            }
        }
        // If it's the same day, newStreakDays remains unchanged

        // 3. Prepare data for belt check (using new completed lesson)
        const updatedUserDataForCheck = {
            ...userData,
            completedLessons: [...(userData.completedLessons || []), lessonId],
            belt: userData.belt || 'white',
        };

        // 4. Check for a belt promotion (this function no longer writes to DB)
        const allLessons = await getAllLessons();
        const newBelt = await checkAndPromoteBelt(userId, updatedUserDataForCheck, allLessons);

        // 5. Create a single update object for Firebase
        const updates: any = {
            xp: increment(xpToAward),
            completedLessons: arrayUnion(lessonId),
            streakDays: newStreakDays,
            lastCompletedDate: today, // Always set to today
        };

        if (newBelt) {
            updates.belt = newBelt; // Add belt promotion to the same update
        }

        // 6. Perform the single database update
        await updateDoc(userRef, updates);
        
        // 7. Return all new state info to the client
        return { 
            xpAwarded: xpToAward, 
            newBelt, 
            streakDays: newStreakDays, 
            lastCompletedDate: today 
        };

    } catch (error) {
        console.error("Failed to complete lesson, update streak, and check promotion:", error);
        throw new Error("Could not save progress to database.");
    }
};

/**
 * NEW function for saving results from a completed lesson
 */
export const saveLessonResults = async (
    userId: string, 
    lessonId: string, 
    responses: Record<string, { correct: boolean; attempts: number }>
): Promise<CompletionResult> => {
    
    // 1. Calculate XP: 10 XP for each *correct* item
    const correctCount = Object.values(responses).filter(r => r.correct).length;
    const xpToAward = correctCount * 10;
    
    // 2. Call the central completion function
    return await completeLesson(userId, lessonId, xpToAward);
};

/**
 * MODIFIED function for skipping a lesson
 */
export const skipLesson = async (userId: string, lessonId: string): Promise<CompletionResult> => {
  let lesson: Lesson;
  try {
    // 1. Get the lesson data to calculate XP
    lesson = await getLesson(lessonId);
  } catch (error) {
    console.error("Failed to get lesson for skipping:", error);
    throw new Error("Lesson not found");
  }
  
  // 2. Calculate XP: 10 XP for every non-concept item
  const questionItems = lesson.items.filter(item => item.type !== 'concept');
  const xpToAward = questionItems.length * 10;

  if (!userId) {
    console.error("User is not authenticated, cannot skip lesson.");
    throw new Error("User not authenticated");
  }

  try {
    // 3. Use the new central function
    return await completeLesson(userId, lessonId, xpToAward);

  } catch (error) {
    console.error("Failed to update user profile in Firestore:", error);
    throw new Error("Could not save progress to database.");
  }
};

