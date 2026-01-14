import { TrainingQuestion, TrainingProgress, QuestionState, Grade } from "./types";

export function getNextQuestion(
  questions: TrainingQuestion[],
  progress: TrainingProgress
): TrainingQuestion | null {
  if (questions.length === 0) return null;

  const now = Date.now();

  // 1. Collect all due items
  const dueItems = questions.filter(q => {
    const state = progress.states[q.id];
    // If never played, it's effectively "due now" (or priority queue)
    if (!state) return false;
    return state.dueAt <= now;
  });

  if (dueItems.length > 0) {
    // Sort by due date (most overdue first)
    dueItems.sort((a, b) => {
      const stateA = progress.states[a.id];
      const stateB = progress.states[b.id];
      return stateA.dueAt - stateB.dueAt;
    });
    return dueItems[0];
  }

  // 2. New items
  const newItems = questions.filter(q => !progress.states[q.id]);
  if (newItems.length > 0) {
    // Return random new item to keep it fresh
    const idx = Math.floor(Math.random() * newItems.length);
    return newItems[idx];
  }

  // 3. Early Review (nothing due, nothing new)
  // Pick the one with closest due date
  const playedItems = questions.filter(q => progress.states[q.id]);
  playedItems.sort((a, b) => {
    const stateA = progress.states[a.id];
    const stateB = progress.states[b.id];
    return stateA.dueAt - stateB.dueAt;
  });

  return playedItems[0] || questions[0];
}

export function updateState(
  currentState: QuestionState | undefined,
  questionId: string,
  grade: Grade
): QuestionState {
  const now = Date.now();

  if (!currentState) {
    // First time
    return {
      id: questionId,
      streak: grade === "correct" ? 1 : 0,
      lastResult: grade,
      lastPlayedAt: now,
      dueAt: calculateNextInterval(grade, 0) + now,
    };
  }

  let newStreak = currentState.streak;
  if (grade === "correct") {
    newStreak += 1;
  } else if (grade === "wrong") {
    newStreak = 0;
  }
  // acceptable maintains streak or slight penalty? Let's keep it but separate logic if needed.
  // For now, acceptable doesn't reset streak but doesn't increase it significantly?
  // Let's treats acceptable as "streak kept but interval shorter".

  return {
    ...currentState,
    streak: newStreak,
    lastResult: grade,
    lastPlayedAt: now,
    dueAt: calculateNextInterval(grade, newStreak) + now,
  };
}

function calculateNextInterval(grade: Grade, streak: number): number {
  // Refined SRS for Micro-learning
  // Wrong: 1 min
  // Acceptable: 3 min (Short)
  // Correct:
  //   Streak 1: 10 min (Short Review to confirm understanding)
  //   Streak 2: 4 hours (Spacing start)
  //   Streak 3: 1 day
  //   ...

  if (grade === "wrong") return 1 * 60 * 1000;
  if (grade === "acceptable") return 3 * 60 * 1000;

  // Correct
  if (streak === 1) return 10 * 60 * 1000; // 10 min

  // From Streak 2: Base 4 hours * 4^(streak-2)
  // S2: 4h
  // S3: 16h
  // S4: 64h (2.5d)
  const base = 4 * 60 * 60 * 1000; // 4 hours
  return base * Math.pow(4, streak - 2);
}
