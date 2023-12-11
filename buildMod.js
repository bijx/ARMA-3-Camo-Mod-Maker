const fs = require('fs');
const archiver = require('archiver');
const generateConfig = require('./components/configGeneraton/generateConfig');

// Image conversion and manipulation
const createLayeredTexture = require('./components/textureGeneration/createLayeredTexture');
const convertToPaa = require('./components/imageProcessing/convertToPaa');
const makeIcon = require('./components/textureGeneration/makeIcon');
const classNameify = require('./utils/classNameify');
const processImages = require('./components/imageProcessing/processImages');
const generateModManifest = require('./components/configGeneraton/generateModManifest');

const baseImagePath = './assets/baseTextures/base.png'; // Path to the base image
const textureImagePath = './texture/texture.png'; // Path to the texture image
const normalImagePath = './assets/baseTextures/normals.png'; // Path to the normal map image

const outputPath = './assets/output'; // Path to output folder

async function main(className, author, options = {}, onProgress) {
  // Create the layered texture and icon
  onProgress(10);
  await Promise.all([
    createLayeredTexture(baseImagePath, textureImagePath, normalImagePath, `${outputPath}/uniform_co.png`, {blendedNormal: options?.blendNormal ?? false}),
    makeIcon(textureImagePath, `${outputPath}/icon.png`),
  ]);
  onProgress(65);

  // Convert images to .paa files (using Pal2PacE)
  await processImages(outputPath);
  onProgress(100);
  
  // Generate config.cpp content and mod manifest
  const configContent = generateConfig(className, author);
  const modManifest = generateModManifest(className, author);
  
  // Create a zip file
  const classifyName = classNameify(className);
  const mainFolder = `${classifyName}_Mod`;
  const output = fs.createWriteStream(`${mainFolder}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', function() {
      console.log(`Archive created: ${archive.pointer()} total bytes`);
  });

  archive.on('error', function(err) {
      throw err;
  });

  // Stream config.cpp content
  archive.append(configContent, { name: `${classifyName}/config.cpp` });
  
  // Create folder structure before building addon
  archive.append(fs.createReadStream(`${outputPath}/uniform_co.paa`), { name: `${classifyName}/Data/uniform_co.paa` });
  archive.append(fs.createReadStream(`${outputPath}/icon.paa`), { name: `${classifyName}/UI/icon.paa` });
  archive.append(fs.createReadStream(`./assets/baseTextures/custom_camo.rvmat`), { name: `${classifyName}/Data/custom_camo.rvmat` });
  
  // Create post-build addon file structure
  archive.append(modManifest, { name: `@${classifyName}/mod.cpp` });
  archive.append(fs.createReadStream(`${outputPath}/icon.paa`), { name: `@${classifyName}/icon.paa` });
  archive.directory('./assets/emptyDir', `@${classifyName}/Addons`);  

  // Finalize the archive
  archive.pipe(output);
  archive.finalize();

}

module.exports = main;