
/**
 * Builds the CfgPatches class for the mod.
 * @param {string} className - The name of the mod's class.
 * @param {string[]} addons - An array of addon names.
 * @returns {string} - The generated CfgPatches class as a string.
 */
module.exports = function cfgPatchesBuilder(className, addons) {
  const addonMappings = {
    baseUniform: 'A3_Characters_F',
    indepUniform: 'A3_Characters_F_Beta',
    assaultPack: 'A3_Characters_F',
    carrierRigSpecial: 'A3_Characters_F',
    carrierRig: 'A3_Characters_F',
    helmetBlufor: 'A3_Characters_F',
  };

  const requiredAddonsArray = Array.from(new Set(addons.map(addon => addonMappings[addon]).filter(Boolean)));
  const requiredAddons = `"${requiredAddonsArray.join('", "')}"`;

  return `
class CfgPatches 
{ 
    class ${className}
    { 
        units[] = {"${className}";};
        weapons[] = {}; 
        requiredVersion = 0.1; 
        requiredAddons[] = {${requiredAddons}}; 
    }; 
};`;

}