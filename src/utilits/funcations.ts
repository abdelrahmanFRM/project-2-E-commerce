/**
 * Description placeholder
 *
 * @export
 * @param {string} txt the input text need to slice it
 * @param {number} [max=90] the number i used to describe the length of text i need to cut after him
 * * @returns {string} the final text after slice it
 */
export function txtSlicer(txt: string, max: number = 30) {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
}

/**
 *
 * @param {string} x - The numeric string to be formatted.
 * @returns {string} A formatted version of the input numeric string with commas as thousand separators.
 *
 */
export function numberWithCommas(x: string): string {
  return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
