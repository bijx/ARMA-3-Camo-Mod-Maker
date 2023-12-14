![Image description](https://i.imgur.com/Mv6sMr3.png)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fbijx%2FARMA-3-Camo-Mod-Maker%2Fmaster%2Fpackage.json%3Ftoken%3DGHSAT0AAAAAACJNQ37N5WGYEWKQL4JVNHUKZL2VZGA&query=%24.version&label=version&color=green)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)

# ARMA 3 Camo Mod Maker

A standalone application that allows you to create a uniform addon for ARMA 3 based on a custom texture file.

## Installation

**Supported OS:** Currently, only Windows OS is supported. Future updates may include support for MacOS and Linux.

**Prerequisites:** 
- Ensure [Arma 3 Tools](https://store.steampowered.com/app/233800/Arma_3_Tools/) is installed on your machine.

**Steps:**
1. Download the latest version from the [Releases Page](https://github.com/bijx/ARMA-3-Camo-Mod-Maker/releases). Extract the ZIP file to a preferred location on your machine.
1. In order for the application to properly convert images to .paa textures, you will need to have [Arma 3 Tools](https://store.steampowered.com/app/233800/Arma_3_Tools/) installed on your machine.
   - Go to `C:\Program Files\Steam\steamapps\common` or the directory where your `steamapps` are located.
   - Open the **Arma 3 Tools** directory and locate the `TexView2` folder.
   - Copy `Pal2PacE.exe` from the `TexView2` folder and paste it into the `vendor` folder of the Camo Mod Maker app (`\CamoModMaker-win32-x64\resources\app\vendor`). Use the `place_Pal2PacE.exe_here` file as a guide for the correct location.
1. Launch the application by running `CamoModMaker.exe` from the root folder (`CamoModMaker-win32-x64`).

## Usage

### Generating the Mod
1. Input a name for your mod in the `Mod Name` field.
1. Fill in your username in the `Author Name` field for in-game credit.
1. Use the `Choose File` button to select a texture file. Optimal textures are square, at least 1024x1024px, and preferably tileable.
   - Find and download free-to-use textures from my [Camouflage Blueprint Maker](https://bijx.github.io/Camouflage-Blueprint-Generator/) project!
1. Choose the addons to include in your mod. The `Base Uniform` is always included; additional equipment options are available.
1. Optional: The `Blend Uniform with Normal` feature combines your texture with the base normal map for added detail such as pocket outlines and fabric wrinkles. Experiment to see which setting suits your needs.
1. Click "Create Mod" and wait for the confirmation message. Processing time varies based on the number of selected addons. Encounter any issues? Report them [here](https://github.com/bijx/ARMA-3-Camo-Mod-Maker/issues).

### Packaging the Mod

Follow these steps to package your mod:

1. **Locate the Created Mod:**
   - After creation, your mod will be a ZIP file in the `\CamoModMaker-win32-x64\resources\app\` directory.
     ![Zip File Location](https://imgur.com/jAKjbes.png)

2. **Prepare the Mod Folders:**
   - Move the ZIP file to an empty folder on your machine and extract it. You will get two folders named after your class, one of which is prefixed with an `@` symbol.
     ![Two Generated Mod Folders](https://imgur.com/mWDqHku.png)

3. **Set Up the Addon Builder:**
   - Open **Arma 3 Tools** and start the **Addon Builder**.
   - In `Addon Source Directory`, enter the path to the folder without the `@` symbol.
   - In `Destination Directory or Filename`, enter the path to the `Addons` folder inside the folder with the `@` symbol.
     - Example: If your mod is named `EpicUSMod`, set up the Addon Builder as shown:
       ![Addons Folder](https://imgur.com/0BgDWDF.png)

4. **Build the Mod:**
   - Click the `Pack` button in the Addon Builder and wait for the confirmation of a successful build.
     ![Build Success](https://imgur.com/7G3QUIy.png)

5. **Load the Mod in Arma 3:**
   - Drag the entire folder with the `@` prefix into the Arma 3 Launcher mod menu to load your mod.
     ![Drag mod folder into launcher](https://imgur.com/E7Syx0J.png)


## Planned Features
- [ ] Ability to change base uniform color from black.
- [ ] Ability to create custom camo vehicles and weapons.
- [ ] New equipment styles
  - [x] Independent Uniform
  - [x] Assault Pack
  - [x] Carrier Rig & Carrier Special Rig
  - [x] Combat Helmet
  - [ ] MX Rifle
- [x] Add program logo to output icon
- [ ] Implement Hellcat Helicopter
- [x] Add status to progress bar
- [ ] Use Gruppe-Adler image to paa script instead of Pac2PalE executable.
- [ ] Implement custom PBO packager (possibly Gruppe-Adler PBO script).

## Contributions

Your contributions are highly valued in this project! As a community-driven, open-source initiative, our goal is to simplify mod making and empower everyone to express their creativity. Here’s how you can contribute:

- **Code Contributions:** 
  - If you have code enhancements or fixes, please submit a pull request with a clear explanation of your changes.

- **Issue Reporting:**
  - Encountered bugs or errors? Open an issue on Github with detailed information to help us understand and address the problem.

- **Suggestions and Feedback:**
  - Have ideas for improvements or noticed redundant code? Share your thoughts by creating an issue, or join the conversation on our [development Discord server](https://discord.gg/zVQVKJM4dk) for more direct interaction and discussions.

## Developer Notes
Each addon that can be included in the final mod has a specific internal name to identify it in the code.

| Internal Name   | Game Equivalent                                   |
|-----------------|---------------------------------------------------|
| `baseUniform`   | `b_soldier_01` - BLUFOR Combat Fatigues (MTP)      |
| `indepUniform`  | `ia_soldier_01` - INDEP Combat Fatigues (AAF)       |
| `assaultPack`   | `backpack_compact` - Assault Pack | 
| `carrierRigSpecial` | `equip_b_carrier_spec_rig` - Carrier Rig Special |
| `carrierRig` | `equip_b_vest02` - Standard Carrier Rig |
| `helmetBlufor` | `headgear_b_helmet_plain` - Combat Helmet |

## License

This project is licensed under the Apache License 2.0. This license allows for the freedom to use the software for any purpose, to distribute it, to modify it, and to distribute modified versions of the software under the terms of the license.

Key provisions of this license include:

- **Redistribution:** You may reproduce and distribute copies of the work or derivative works thereof in any medium, with or without modifications, and in Source or Object form, provided you meet the following conditions:
  - You must give any other recipients of the work or derivative works a copy of this license.

For the full terms and conditions, please see the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).


## Special Thanks
Thanks to anyone who has contributed domain knowledge, testing efforts, or libraries/tools that made this project possible!
- Bohemia Interactive for Arma 3 Tools / Samples
- IndeedPete's Texture Templates
- Manofsteal2001 & A Aron for initial testing and feedback.

![](https://imgur.com/G2d2oFp.png)
