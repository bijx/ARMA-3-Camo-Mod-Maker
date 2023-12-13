const Jimp = require('jimp');
const path = require('path');
const tileTexture = require('./util/tileTexture');

/**
 * Blends images to create a gane texture.
 * @param {string} base - The path to the base image.
 * @param {string} texture - The path to the texture image.
 * @param {string} normal - The path to the normal map image.
 * @param {string} outputImagePath - The path to save the output image.
 * @param {Object} options - Additional options for blending.
 * @param {boolean} options.blendNormal - Whether to blend the normal map with the texture using overlay mode. Default is false.
 * @returns {Promise<void>} - A promise that resolves when the output image is created successfully.
 */
async function blendImagesBase(base, texture, normal, outputImagePath, options = {}) {
  const { blendNormal = false } = options;

  // Read the normal map and tile the texture
  const normalMap = await Jimp.read(normal);
  const tiledTexture = await tileTexture(texture);

  // Composite the tiled texture onto the normal map with the selected blend mode
  const blendedNormal = await normalMap.composite(tiledTexture, 0, 0, {
    mode: blendNormal ? Jimp.BLEND_OVERLAY : Jimp.BLEND_SOURCE_OVER,
    opacitySource: 1,
  });

  // Apply a brightness adjustment
  blendedNormal.brightness(0.05);

  // Read the base image and composite it on top
  const baseImage = await Jimp.read(base);
  const finalImage = await baseImage.composite(blendedNormal, 0, 0, {
    mode: Jimp.BLEND_DESTINATION_OVER,
    opacityDest: 1,
    opacitySource: 1,
  });


  // Write the final image to the output
  await finalImage.writeAsync(outputImagePath);
  console.log('Output image created successfully!');
}

module.exports = blendImagesBase;
