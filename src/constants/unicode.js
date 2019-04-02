/**
 * The unicode character for a non-breaking space. When splitting lines, text
 * renderering systems will try to avoid breaking the line on these characters
 * and favour traditional spaces instead. These characters are very useful
 * when displaying strings with several logical parts, such as an address.
 *
 * @type {string}
 */
export const NBSP = "\u00A0";
