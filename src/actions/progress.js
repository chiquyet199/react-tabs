import {UPDATE_PROGRESS, CLEAR_PROGRESS} from "./types";

export const updateProgress = progress => ({
  type: UPDATE_PROGRESS,
  progress,
});

export const clearProgress = () => ({
  type: CLEAR_PROGRESS,
});
