const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const generateConfig = require('./components/configGeneraton/modConfigFactory');

// Image conversion and manipulation
const createBaseUniform = require('./components/textureGeneration/createBaseUniform');
const makeIcon = require('./components/textureGeneration/makeIcon');
const classNameify = require('./utils/classNameify');
const processImages = require('./components/imageProcessing/processImages');
const generateModManifest = require('./components/configGeneraton/generateModManifest');

// Correctly set the base paths using __dirname
const assetsBasePath = path.join(__dirname, 'assets', 'baseTextures');
const textureDirPath = path.join(__dirname, 'texture');
const outputPath = path.join(__dirname, 'assets', 'output');

// Use the base path to construct the full path to the texture
const texture = path.join(textureDirPath, 'texture.png');

async function main(className, author, options = {}, onProgress) {
  onProgress({ value: 10, message: 'Generating game texture files and config...' });

  const addonFunctions = {
    baseUniform: () => createBaseUniform(
      path.join(assetsBasePath, 'baseUniform', 'base.png'),
      texture,
      path.join(assetsBasePath, 'baseUniform', 'normals.png'),
      path.join(outputPath, 'uniform_base_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
    indepUniform: () => createBaseUniform(
      path.join(assetsBasePath, 'indepUniform', 'indepUniformBase.png'),
      texture,
      path.join(assetsBasePath, 'indepUniform', 'indepUniformNormals.png'),
      path.join(outputPath, 'uniform_indep_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
    assaultPack: () => createBaseUniform(
      path.join(assetsBasePath, 'assaultPack', 'assaultPackBase.png'),
      texture,
      path.join(assetsBasePath, 'assaultPack', 'assaultPackNormals.png'),
      path.join(outputPath, 'assault_pack_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
    carrierRigSpecial: () => createBaseUniform(
      path.join(assetsBasePath, 'carrierRigSpecial', 'carrierVestSpecialBase.png'),
      texture,
      path.join(assetsBasePath, 'carrierRigSpecial', 'carrierVestSpecialNormals.png'),
      path.join(outputPath, 'carrier_rig_special_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
    carrierRig: () => createBaseUniform(
      path.join(assetsBasePath, 'carrierRig', 'carrierRigBase.png'),
      texture,
      path.join(assetsBasePath, 'carrierRig', 'carrierRigNormals.png'),
      path.join(outputPath, 'carrier_rig_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
    helmetBlufor: () => createBaseUniform(
      path.join(assetsBasePath, 'helmetBlufor', 'helmetBluforBase.png'),
      texture,
      path.join(assetsBasePath, 'helmetBlufor', 'helmetBluforNormals.png'),
      path.join(outputPath, 'helmet_blufor_co.png'),
      { blendNormal: options?.blendedNormals ?? false }
    ),
  };

  const promises = options?.addons
    .filter(addon => addonFunctions[addon])
    .map(addon => addonFunctions[addon]());

  // Always add the makeIcon function to the promises
  promises.push(makeIcon(texture, path.join(outputPath, 'icon.png')));

  await Promise.all(promises);
  onProgress({ value: 65, message: 'Converting textures to PAA using Pal2PacE...' });

  // Convert images to .paa files (using Pal2PacE)
  await processImages(outputPath);
  onProgress({ value: 100, message: 'Building addon archive file...' });

  // Generate config.cpp content and mod manifest
  const configContent = generateConfig(className, author, options?.addons ?? []);
  const modManifest = generateModManifest(className, author);

  // Create a zip file
  const classifyName = classNameify(className);
  const mainFolder = `${classifyName}_Mod`;
  const output = fs.createWriteStream(path.join(__dirname, `${mainFolder}.zip`));
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', function () {
    console.log(`Archive created: ${archive.pointer()} total bytes`);
  });

  archive.on('error', function (err) {
    throw err;
  });

  // Stream config.cpp content
  archive.append(configContent, { name: `${classifyName}/config.cpp` });

  // Create folder structure before building addon
  archive.append(fs.createReadStream(path.join(outputPath, 'icon.paa')), { name: `${classifyName}/UI/icon.paa` });
  if(options?.addons?.includes('baseUniform')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'uniform_base_co.paa')), { name: `${classifyName}/Data/uniform_base_co.paa` });
    archive.append(fs.createReadStream(path.join(assetsBasePath, 'baseUniform', 'custom_camo_base.rvmat')), { name: `${classifyName}/Data/custom_camo_base.rvmat` });
  }
  if(options?.addons?.includes('indepUniform')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'uniform_indep_co.paa')), { name: `${classifyName}/Data/uniform_indep_co.paa` });
    archive.append(fs.createReadStream(path.join(assetsBasePath, 'indepUniform', 'indepUniform.rvmat')), { name: `${classifyName}/Data/indepUniform.rvmat` });  
  }
  if(options?.addons?.includes('assaultPack')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'assault_pack_co.paa')), { name: `${classifyName}/Data/assault_pack_co.paa` });
  }
  if(options?.addons?.includes('carrierRigSpecial')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'carrier_rig_special_co.paa')), { name: `${classifyName}/Data/carrier_rig_special_co.paa` });
  }
  if(options?.addons?.includes('carrierRig')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'carrier_rig_co.paa')), { name: `${classifyName}/Data/carrier_rig_co.paa` });
  }
  if(options?.addons?.includes('helmetBlufor')) {
    archive.append(fs.createReadStream(path.join(outputPath, 'helmet_blufor_co.paa')), { name: `${classifyName}/Data/helmet_blufor_co.paa` });
  }

  // Create post-build addon file structure
  archive.append(modManifest, { name: `@${classifyName}/mod.cpp` });
  archive.append(fs.createReadStream(path.join(outputPath, 'icon.paa')), { name: `@${classifyName}/icon.paa` });
  archive.directory(path.join(__dirname, 'assets', 'emptyDir'), `@${classifyName}/Addons`);

  // Finalize the archive
  archive.pipe(output);
  archive.finalize();
}

module.exports = main;
