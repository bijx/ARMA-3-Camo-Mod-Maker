const Jimp = require('jimp');

/**
 * Tiles the given texture to create a layered texture.
 * @param {string} texture - The path to the texture image.
 * @returns {Promise<Jimp>} - A promise that resolves to the layered texture image.
 */
async function tileTexture(texture) {
  const t = await Jimp.read(texture);
  const resizedTexture = await t.resize(1024, 1024);
  let image = new Jimp(2048, 2048);
  image.composite(resizedTexture, 0, 0)
       .composite(resizedTexture, 1024, 0)
       .composite(resizedTexture, 0, 1024)
       .composite(resizedTexture, 1024, 1024);
  return image;
}

/**
 * Blends images together and creates a new output image.
 * @param {string} base - The path to the base image.
 * @param {string} texture - The path to the texture image.
 * @param {string} normal - The path to the normal map image.
 * @param {string} outputImagePath - The path to save the output image.
 * @param {Object} options - Additional options for blending.
 * @param {boolean} options.blendNormal - Whether to blend the normal map using overlay mode.
 * @returns {Promise<void>} - A promise that resolves when the output image is created successfully.
 */
async function blendImages(base, texture, normal, outputImagePath, options = {}) {
  const { blendNormal } = options;

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

module.exports = blendImages;
