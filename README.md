# ARMA 3 Camo Mod Maker

A standalone application that allows you to create a uniform addon for ARMA 3 based on a custom texture file.

## Installation

## Quickstart

## Planned Features
- [ ] Ability to change base uniform color from black.
- [ ] Ability to create custom camo vehicles and weapons.
- [ ] New equipment styles
  - [x] Independent Uniform
  - [x] Assault Pack
- [x] Add program logo to output icon
- [ ] Implement Hellcat Helicopter
- [x] Add status to progress bar
- [ ] Use Gruppe-Adler image to paa script instead of Pac2PalE executable.
- [ ] Implement custom PBO packager (possibly Gruppe-Adler PBO script).

## Developer Notes
Each addon that can be included in the final mod has a specific internal name to identify it in the code.

| Internal Name   | Game Equivalent                                   |
|-----------------|---------------------------------------------------|
| `baseUniform`   | `b_soldier_01` - BLUFOR Combat Fatigues (MTP)      |
| `indepUniform`  | `ia_soldier_01` - INDEP Combat Fatigues (AAF)       |
| `assaultPack`   | `backpack_compact` - Assault Pack | 
| `carrierRigSpecial` | `equip_b_carrier_spec_rig` - Carrier Rig Special |