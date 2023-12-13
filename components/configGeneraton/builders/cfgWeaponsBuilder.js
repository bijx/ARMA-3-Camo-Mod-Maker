/**
 * Generates the cfgWeapons code block for a given className and addons.
 *
 * @param {string} className - The name of the class.
 * @param {string[]} addons - An array of addon names.
 * @returns {string} The generated cfgWeapons code block.
 */
module.exports = function cfgWeaponsBuilder(className, addons) {

  const addonsMappings = {
    baseUniform: `
    class ${className}_CamoBase: Uniform_Base 
    { 
        scope = 2;
        displayName = "${className} Base Uniform";
        picture = "${className}\\UI\\icon.paa";
        model = "\\A3\\characters_f\\BLUFOR\\b_soldier_01.p3d"; 
        class ItemInfo : UniformItem { 
            uniformClass = "${className}_UniformBase"; 
            containerClass = "Supply50";
            mass = 50;
        }; 
    };
    `,
    indepUniform: `
    class ${className}_CamoIndep: Uniform_Base 
    { 
        scope = 2;
        displayName = "${className} Indep Uniform";
        picture = "${className}\\UI\\icon.paa";
        model = "\\A3\\characters_f_beta\\INDEP\\ia_soldier_01.p3d"; 
        class ItemInfo : UniformItem { 
            uniformClass = "${className}_UniformIndep"; 
            containerClass = "Supply50";
            mass = 50;
        }; 
    };
    `,
  };

  

  return `
  class cfgWeapons 
  { 
      class ItemCore; 
      class UniformItem; 
      class Uniform_Base: ItemCore 
      { 
          class ItemInfo; 
      }; 
  
      ${addons.map(addon => addonsMappings[addon]).join('\n')}
  };`
}