const classNameify = require('../../utils/classNameify');

function generateConfig(classNameRaw, author) {
  const className = classNameify(classNameRaw);
  return `
class CfgPatches 
{ 
    class ${className} 
    { 
        units[] = {"${className}";};
        weapons[] = {}; 
        requiredVersion = 0.1; 
        requiredAddons[] = {"A3_Characters_F"}; 
    }; 
};

class CfgVehicles
{
    class B_Soldier_F;

    class ${className}_Uniform: B_soldier_F {
        author = "${author}";
        vehicleClass = "${className}";
        scope = 1;
        displayName = "Custom Unit";
        identityTypes[] = {"Head_NATO", "G_NATO_default"};
        genericNames = "NATOMen";
        model = "\\A3\\characters_f\\BLUFOR\\b_soldier_01.p3d"; //Default NATO
        uniformClass = "${className}_Camo";
        hiddenSelections[] = {"Camo","Insignia"};
        hiddenSelectionsTextures[] = {"${className}\\Data\\uniform_co.paa"};
        hiddenSelectionsMaterials[] = {"${className}\\Data\\custom_camo.rvmat"};
        weapons[] = {"arifle_SPAR_01_blk_ACO_Pointer_F","Throw","Put"};
        respawnWeapons[] = {"arifle_TRG20_ACO_Flash_F","Throw","Put"};
        magazines[] = {"HandGrenade","HandGrenade","SmokeShell","SmokeShellGreen","Chemlight_green","Chemlight_green"};
        respawnMagazines[] = {"HandGrenade","HandGrenade","SmokeShell","SmokeShellGreen","Chemlight_green","Chemlight_green"};
        linkedItems[] = {"DEA_Helmet2","Custom_Vest1","ItemMap","ItemCompass","ItemWatch","ItemRadio"};
        respawnLinkedItems[] = {"DEA_Helmet2","Custom_Vest1","ItemMap","ItemCompass","ItemWatch","ItemRadio"};
    };

};

class cfgWeapons 
{ 
    class ItemCore; 
    class UniformItem; 
    class Uniform_Base: ItemCore 
    { 
        class ItemInfo; 
    }; 

    class ${className}_Camo: Uniform_Base 
    { 
        scope = 2;
        displayName = "${className} Uniform";
        picture = "${className}\\UI\\icon.paa";
        model = "\\A3\\characters_f\\BLUFOR\\b_soldier_01.p3d"; 
        class ItemInfo : UniformItem { 
            uniformClass = "${className}_Uniform"; 
            containerClass = "Supply50";
            mass = 50;
        }; 
    }; 
};
`;
}

module.exports = generateConfig;