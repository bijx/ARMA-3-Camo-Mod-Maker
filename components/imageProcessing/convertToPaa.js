const toPAC = require('img2pac');

/**
 * DEPRECATED: Use processImages instead.
 * Converts an image file to PAA format using img2pac library.
 * @param {string} inputPath - The path of the input image file.
 * @param {string} outputPath - The path where the converted PAA file will be saved.
 * @returns {Promise<void>} - A promise that resolves when the conversion is complete.
 */
async function convertToPaa(inputPath, outputPath) {
  await toPAC(inputPath, outputPath);
}

module.exports = convertToPaa;