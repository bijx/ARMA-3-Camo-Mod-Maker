/**
 * Generates the cfgWeapons code block for a given className and addons.
 *
 * @param {string} className - The name of the class.
 * @param {string[]} addons - An array of addon names.
 * @returns {string} The generated cfgWeapons code block.
 */
module.exports = function cfgWeaponsBuilder(className, author, addons) {

  const addonsMappings = {
    baseUniform: `
    class ${className}_CamoBase: Uniform_Base 
    { 
        scope = 2;
        author = "${author}";
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
        author = "${author}";
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
    carrierRigSpecial: `
    class ${className}_CarrierRig_Special: Vest_Camo_Base
	{
		author="${author}";
		scope=2;
		displayName="${className} Special Carrier Rig";
		picture="${className}\\UI\\icon.paa";
		model="\\A3\\Characters_F\\BLUFOR\\equip_b_carrier_spec_rig.p3d";
		hiddenSelections[]=
		{
			"camo"
		};
		hiddenSelectionsTextures[]=
		{
			"${className}\\Data\\carrier_rig_special_co.paa"
		};
		class ItemInfo: ItemInfo
		{
			uniformModel="\\A3\\Characters_F\\BLUFOR\\equip_b_carrier_spec_rig.p3d";
			hiddenSelections[]=
			{
				"camo"
			};
			containerClass="Supply100";
			mass=120;
		};
	};    
    `,
    carrierRig: `
	class ${className}_CarrierRig: Vest_Camo_Base
	{
		author="${author}";
		scope=2;
		displayName="${className} Carrier Rig";
		picture="${className}\\UI\\icon.paa";
		model="\\A3\\Characters_F\\BLUFOR\\equip_b_vest02.p3d";
		hiddenSelections[]=
		{
			"camo"
		};
		hiddenSelectionsTextures[]=
		{
			"${className}\\Data\\carrier_rig_co.paa"
		};
		class ItemInfo: ItemInfo
		{
			uniformModel="\\A3\\Characters_F\\BLUFOR\\equip_b_vest02.p3d";
			hiddenSelections[]=
			{
				"camo"
			};
			containerClass="Supply140";
			mass=80;
		};
	};
    `
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
      class VestItem;
      class Vest_Camo_Base: ItemCore
      {
          class ItemInfo;
      };
  
      ${addons.map(addon => addonsMappings[addon]).join('\n')}
  };`
}