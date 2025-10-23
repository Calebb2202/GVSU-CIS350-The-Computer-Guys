
import { Lesson, AnswerPayload, CheckResult, Unit } from '../types';
import { PYTHON_LESSON_1, PYTHON_LESSON_2, PYTHON_LESSON_3, PYTHON_BASICS_UNIT, MOCK_LEADERBOARD } from '../constants';

const lessons: Record<string, Lesson> = {
  'python-basics-1': PYTHON_LESSON_1,
  'python-basics-2': PYTHON_LESSON_2,
  'python-basics-3': PYTHON_LESSON_3,
};

const units: Record<string, Unit> = {
    'python-basics': PYTHON_BASICS_UNIT,
}

export const getUnit = (id: string): Promise<Unit> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (units[id]) {
                resolve(units[id]);
            } else {
                reject(new Error('Unit not found'));
            }
        }, 300);
    });
}

export const getLesson = (id: string): Promise<Lesson> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (lessons[id]) {
        resolve(lessons[id]);
      } else {
        reject(new Error('Lesson not found'));
      }
    }, 500);
  });
};

export const checkAnswer = (payload: AnswerPayload): Promise<CheckResult> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const lesson = lessons[payload.lessonId];
      if (!lesson) {
        return reject(new Error('Lesson not found'));
      }
      const item = lesson.items.find((i) => i.id === payload.itemId);
      if (!item || !item.correct) {
        return reject(new Error('Item not found or is not a quiz question.'));
      }

      const submittedValue = payload.value.trim().toLowerCase();
      const isCorrect = Array.isArray(item.correct)
        ? item.correct.map(c => c.toLowerCase()).includes(submittedValue)
        : item.correct.toLowerCase() === submittedValue;

      resolve({
        correct: isCorrect,
        correctAnswer: item.correct,
        feedback: isCorrect ? 'Great job!' : item.explanation || "That's not quite right.",
        xpDelta: isCorrect ? 10 : 0,
      });
    }, 300);
  });
};

export const getLeaderboard = (): Promise<Array<{ rank: number; user: string; xp: number }>> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(MOCK_LEADERBOARD);
        }, 800);
    });
};
