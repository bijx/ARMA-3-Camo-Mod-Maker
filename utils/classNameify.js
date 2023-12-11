
/**
 * Converts a string to CapitalCamelCase by removing non-alphanumeric characters, leading numbers, and spaces.
 * 
 * @param {string} str - The input string to be converted.
 * @returns {string} - The converted string in CapitalCamelCase format.
 */
module.exports = function classNameify(str) {
  // Remove non-alphanumeric characters
  let alphanumericStr = str.replace(/[^a-zA-Z0-9]/g, '');

  // Remove leading numbers
  alphanumericStr = alphanumericStr.replace(/^\d+/, '');

  // Remove spaces
  alphanumericStr = alphanumericStr.replace(/\s+/g, '');

  // Convert to CapitalCamelCase
  let camelCaseStr = alphanumericStr.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toUpperCase() : word.toUpperCase().charAt(0) + word.slice(1);
  });

  return camelCaseStr;
};
