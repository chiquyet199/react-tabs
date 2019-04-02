// THIS CODE IS COPIED FROM OLD "canopy-legacy" REPO
// Definition of common errors.
const NO_TRACE = "NO_TRACE";
const NO_TRACE_VALUE = -998;
const UNDEFINED_SCORE = "UNDEFINED_SCORE";
export const SCORE_MAX_VALUE = 999;
// Definition for the scores.
// Based on https://www.experian.co.uk/consumer/experian-credit-score.html
export const SCORES = {
  VERY_POOR: "VERY_POOR",
  POOR: "POOR",
  FAIR: "FAIR",
  GOOD: "GOOD",
  EXCELLENT: "EXCELLENT",
};

// Definition of the scores level within their ranges.
export const SCORE_RANGES = {
  [SCORES.VERY_POOR]: {from: 0, to: 560},
  [SCORES.POOR]: {from: 561, to: 720},
  [SCORES.FAIR]: {from: 721, to: 880},
  [SCORES.GOOD]: {from: 881, to: 960},
  [SCORES.EXCELLENT]: {from: 961, to: SCORE_MAX_VALUE},
};

// Values that are consider trusty.
const TRUSTY_SCORE_RANGE = [
  SCORES.POOR,
  SCORES.FAIR,
  SCORES.GOOD,
  SCORES.EXCELLENT,
];

/**
 * Get the score range based on the score literal.
 * @param  {String} score
 * @return {Object}
 */
export const getScoreRanges = score => SCORE_RANGES[score];

/**
 * A score shouldn't go beyond 999, which is the maximum at 'excellent' score level.
 * If the score goes beyond 999, just return 999.
 * @param  {Number} score
 * @return {Number}
 */
const normalizeScore = score =>
  Math.min(score, getScoreRanges(SCORES.EXCELLENT).to);

/**
 * Helper function to check if a score appears under a certain category.
 * @param  {Number} score
 * @param  {Object} range
 * @return {Boolean}
 */
const scoreIsInRange = (score, range) =>
  score >= range.from && score <= range.to;

/**
 * Check if the score is valued as 'no trace'.
 * @param  {Number}  score
 * @return {Boolean}
 */
const isNoTrace = score => score === NO_TRACE_VALUE;

/**
 * Check if the score is cataloged as 'very poor'.
 * @param  {Number}  score
 * @return {Boolean}
 */
const isVeryPoor = score =>
  scoreIsInRange(score, getScoreRanges(SCORES.VERY_POOR));

/**
 * Check if the score is cataloged as 'poor'.
 * @param  {Number}  score
 * @return {Boolean}
 */
const isPoor = score => scoreIsInRange(score, getScoreRanges(SCORES.POOR));

/**
 * Check if the score is cataloged as 'fair'.
 * @param  {Number}  score
 * @return {Boolean}
 */
const isFair = score => scoreIsInRange(score, getScoreRanges(SCORES.FAIR));

/**
 * Check if the score is cataloged as 'good'.
 * @param  {Number}  score
 * @return {Boolean}
 */
const isGood = score => scoreIsInRange(score, getScoreRanges(SCORES.GOOD));

/**
 * Check if the score is cataloged as 'excellent'
 * @param  {Number}  score
 * @return {Boolean}
 */
const isExcellent = score =>
  scoreIsInRange(score, getScoreRanges(SCORES.EXCELLENT));

/**
 * Get the score level (like 'VERY_POOR', 'POOR', etc.) for the score.
 * It will also check for possible errors like 'NO_TRACE'.
 *
 * @param  {Number} score
 * @return {String}
 */
export const getScoreLevel = score => {
  // Normalize the score, making it go as much as 999.
  const normalizedScore = normalizeScore(score);

  if (isNoTrace(normalizeScore)) {
    return NO_TRACE;
  }

  if (isVeryPoor(normalizedScore)) {
    return SCORES.VERY_POOR;
  }

  if (isPoor(normalizedScore)) {
    return SCORES.POOR;
  }

  if (isFair(normalizedScore)) {
    return SCORES.FAIR;
  }

  if (isGood(normalizedScore)) {
    return SCORES.GOOD;
  }

  if (isExcellent(normalizedScore)) {
    return SCORES.EXCELLENT;
  }

  return UNDEFINED_SCORE;
};

/**
 * Check if the score is consider as trusty.
 * @param  {Number}  score
 * @return {Boolean}
 */
export const isTrustyScore = score =>
  TRUSTY_SCORE_RANGE.includes(getScoreLevel(score));
