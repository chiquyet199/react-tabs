import {UPDATE_PROGRESS, CLEAR_PROGRESS} from "./types";
import {updateProgress, clearProgress} from "./progress";

describe("action progress", () => {
  it("update progress", () => {
    const progress = 30;
    const expectedAction = {
      type: UPDATE_PROGRESS,
      progress,
    };
    expect(updateProgress(progress)).toEqual(expectedAction);
  });

  it("clear progress", () => {
    const expectedAction = {
      type: CLEAR_PROGRESS,
    };
    expect(clearProgress()).toEqual(expectedAction);
  });
});
