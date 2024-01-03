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
    civCoveralls: `
    class ${className}_CivCoveralls: Uniform_Base 
    { 
        scope = 2;
        author = "${author}";
        displayName = "${className} Coveralls";
        picture = "${className}\\UI\\icon.paa";
        model = "\\A3\\characters_f\\Common\\coveralls.p3d"; 
        class ItemInfo : UniformItem { 
            uniformClass = "${className}_CivCoveralls"; 
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
    `,
    helmetBlufor: `
    class HeadgearItem;
    class H_HelmetB;
    class ${className}_HelmetBlufor: H_HelmetB
	{
		author="${author}";
		scope=2;
		displayName="${className} Combat Helmet";
		model="\\A3\\Characters_F\\BLUFOR\\headgear_b_helmet_plain.p3d";
		picture="${className}\\UI\\icon.paa";
		hiddenSelections[]=
		{
			"camo"
		};
		hiddenSelectionsTextures[]=
		{
			"${className}\\Data\\helmet_blufor_co.paa"
		};
		class ItemInfo: HeadgearItem
		{
			mass=30;
			uniformModel="\\A3\\Characters_F\\BLUFOR\\headgear_b_helmet_plain.p3d";
			hiddenSelections[]=
			{
				"camo"
			};
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
      class VestItem;
      class Vest_Camo_Base: ItemCore
      {
          class ItemInfo;
      };
  
      ${addons.map(addon => addonsMappings[addon]).join('\n')}
  };`
}