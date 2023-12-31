/**
 * Generates a mod manifest with the given class name and author.
 * @param {string} classNameRaw - The raw class name.
 * @param {string} author - The author of the mod.
 * @returns {string} The generated mod manifest.
 */
function generateModManifest(classNameRaw, author) {
  return `
name = "${classNameRaw}";
description = "A custom camo mod that adds a new uniform.";
tooltip = "${classNameRaw}";
tooltipOwned = "${classNameRaw} Owned";
overview = "A custom camo mod that adds a new uniform.";
overviewPicture = "icon.paa";
author = "${author}";
overviewText = "A custom camo mod that adds a new uniform.";
overviewFootnote = "";
logo = "icon.paa";
logoOver = "icon.paa";
`;
}

module.exports = generateModManifest;