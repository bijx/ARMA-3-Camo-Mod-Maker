const Jimp = require('jimp');

/**
 * Resizes an image to 256x256 pixels and saves it as an icon.
 * @param {string} imageFilePath - The file path of the input image.
 * @param {string} outputFilePath - The file path to save the output icon.
 * @returns {Promise<void>} - A promise that resolves when the icon is created successfully or rejects with an error.
 */
module.exports = async function makeIcon(imageFilePath, outputFilePath) {
  try {
    const image = await Jimp.read(imageFilePath);
    image.resize(256, 256).write(outputFilePath);
    console.log('Icon created successfully!');
  } catch (error) {
    console.error('Error creating icon:', error);
  }
};
