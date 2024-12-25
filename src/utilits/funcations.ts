/**
 * Description placeholder
 *
 * @export
 * @param {string} txt the input text need to slice it
 * @param {number} [max=90] the number i used to describe the length of text i need to cut after him
 * * @returns {string} the final text after slice it
 */
export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
}
