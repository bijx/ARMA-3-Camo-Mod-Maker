const Jimp = require('jimp');
const path = require('path');
const logoFilePath = path.join(__dirname, '..', '..', 'logo.png');

/**
 * Resizes an image to 256x256 pixels after applying a logo on top, and saves it as an icon.
 * @param {string} imageFilePath - The file path of the input image.
 * @param {string} outputFilePath - The file path to save the output icon.
 * @returns {Promise<void>} - A promise that resolves when the icon is created successfully or rejects with an error.
 */
module.exports = async function makeIcon(imageFilePath, outputFilePath) {
  try {
    const image = await Jimp.read(imageFilePath);
    const logo = await Jimp.read(logoFilePath);

    // Resize the logo to 50% of the image size
    logo.resize(image.bitmap.width / 2, Jimp.AUTO);

    // Calculate the position to center the logo on the image
    const x = image.bitmap.width / 2 - logo.bitmap.width / 2;
    const y = image.bitmap.height / 2 - logo.bitmap.height / 2;

    // Composite the logo onto the image and then resize the image
    image.composite(logo, x, y).resize(256, 256).write(outputFilePath);
    
    console.log('Icon created successfully!');
  } catch (error) {
    console.error('Error creating icon:', error);
  }
};
