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
  };


  return `
class CfgVehicles
{
    ${addons.map(addon => addonsMappings[addon]).join('\n')}

};`
}