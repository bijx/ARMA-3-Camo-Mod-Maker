const classNameify = require('../../utils/classNameify');
const cfgPatchesBuilder = require('./builders/cfgPatchesBuilder');
const cfgVehiclesBuilder = require('./builders/cfgVehiclesBuilder');
const cfgWeaponsBuilder = require('./builders/cfgWeaponsBuilder');
const headerBuilder = require('./builders/headerBuilder');

/**
 * Generates a configuration file for a mod.
 * @param {string} classNameRaw - The raw class name.
 * @param {string} author - The author of the mod.
 * @param {Array<string>} [addons=[]] - The list of addons included in the mod.
 * @returns {string} - The generated configuration file.
 * @throws {Error} - If no addons are included.
 */
function generateConfig(classNameRaw, author, addons = []) {
  if (!addons) {
      throw new Error('You must have at least one addon included.');
  }
  const className = classNameify(classNameRaw);

  return `
${headerBuilder()}
${cfgPatchesBuilder(className, addons)}
${cfgVehiclesBuilder(className, author, addons)}
${cfgWeaponsBuilder(className, author, addons)}


`;
}

module.exports = generateConfig;