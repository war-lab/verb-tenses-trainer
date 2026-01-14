import { TrainingProgress } from "./types";

const KEY = "vt.training.progress.v1";

export function loadProgress(): TrainingProgress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return createEmptyProgress();

    const parsed = JSON.parse(raw);
    if (parsed.version !== 1) {
      // Migration logic could go here
      return createEmptyProgress();
    }
    return parsed;
  } catch (e) {
    console.error("Failed to load training progress", e);
    return createEmptyProgress();
  }
}

export function saveProgress(progress: TrainingProgress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save training progress", e);
  }
}

function createEmptyProgress(): TrainingProgress {
  return {
    version: 1,
    states: {}
  };
}
