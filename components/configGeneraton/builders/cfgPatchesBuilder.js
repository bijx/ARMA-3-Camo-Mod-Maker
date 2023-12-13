
module.exports = function cfgPatchesBuilder(className, addons) {
  const addonMappings = {
    baseUniform: 'A3_Characters_F',
    indepUniform: 'A3_Characters_F_Beta',
    indepOfficerUniform: 'A3_Characters_F_Beta',
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