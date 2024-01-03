/**
 * Generates the configuration for the vehicles in the mod.
 *
 * @param {string} className - The class name of the vehicles.
 * @param {string} author - The author of the mod.
 * @param {string[]} addons - The addons to include in the configuration.
 * @returns {string} - The generated configuration for the vehicles.
 */
module.exports = function cfgVehiclesBuilder(className, author, addons) {

  const addonsMappings = {
    baseUniform: `
    class B_Soldier_F;

    class ${className}_UniformBase: B_soldier_F {
        author = "${author}";
        vehicleClass = "${className}";
        scope = 1;
        displayName = "${className} Unit Base";
        identityTypes[] = {"Head_NATO", "G_NATO_default"};
        genericNames = "NATOMen";
        model = "\\A3\\characters_f\\BLUFOR\\b_soldier_01.p3d";
        uniformClass = "${className}_CamoBase";
        hiddenSelections[] = {"Camo","Insignia"};
        hiddenSelectionsTextures[] = {"${className}\\Data\\uniform_base_co.paa"};
        hiddenSelectionsMaterials[] = {"${className}\\Data\\custom_camo_base.rvmat"};
    };
`,
    indepUniform: `
    class I_Soldier_F;

    class ${className}_UniformIndep: I_soldier_F {
        author = "${author}";
        vehicleClass = "${className}";
        scope = 1;
        displayName = "${className} Unit Indep";
        identityTypes[] = {"Head_NATO", "G_NATO_default"};
        genericNames = "NATOMen";
        model = "\\A3\\characters_f_beta\\INDEP\\ia_soldier_01.p3d";
        uniformClass = "${className}_CamoIndep";
        hiddenSelections[] = {"Camo","Insignia"};
        hiddenSelectionsTextures[] = {"${className}\\Data\\uniform_indep_co.paa"};
        hiddenSelectionsMaterials[] = {"${className}\\Data\\indepUniform.rvmat"};
    };
`,
    civCoveralls: `
    class C_man_w_worker_F;

    class ${className}_CivCoveralls: C_man_w_worker_F {
        author = "${author}";
        vehicleClass = "${className}";
        scope = 1;
        displayName = "${className} Unit Base";
        identityTypes[] = {"Head_NATO", "G_NATO_default"};
        genericNames = "NATOMen";
        model = "\\A3\\characters_f\\Common\\coveralls.p3d";
        uniformClass = "${className}_CivCoveralls";
        hiddenSelections[] = {"Camo","Insignia"};
        hiddenSelectionsTextures[] = {"${className}\\Data\\civ_coveralls_co.paa"};
    };
`,
    assaultPack: `
    class Bag_Base;
    class B_AssaultPack_Base;
	class ${className}_AssaultPack: B_AssaultPack_Base
	{
		scope=2;
		author="${author}";
		model="\A3\\weapons_f\\Ammoboxes\\bags\\Backpack_Compact";
		displayName="${className} Assault Pack";
		picture="${className}\\UI\\icon.paa";
		hiddenSelections[]=
		{
			"Camo"
		};
		hiddenSelectionsTextures[]=
		{
			"${className}\\Data\\assault_pack_co.paa"
		};
	};
`,
  };


  return `
class CfgVehicles
{
    ${addons.map(addon => addonsMappings[addon]).join('\n')}

};`
}