const classNameify = require('../../utils/classNameify');
const cfgPatchesBuilder = require('./builders/cfgPatchesBuilder');
const cfgVehiclesBuilder = require('./builders/cfgVehiclesBuilder');
const cfgWeaponsBuilder = require('./builders/cfgWeaponsBuilder');
const headerBuilder = require('./builders/headerBuilder');

function generateConfig(classNameRaw, author, addons = []) {
  if (!addons) {
      throw new Error('You must have at least one addon included.');
  }
  const className = classNameify(classNameRaw);

  return `
${headerBuilder()}
${cfgPatchesBuilder(className, addons)}
${cfgVehiclesBuilder(className, author, addons)}
${cfgWeaponsBuilder(className, addons)}


`;
}

module.exports = generateConfig;