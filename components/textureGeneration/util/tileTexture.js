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

module.exports = tileTexture;